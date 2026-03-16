import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Lock, CheckCircle, Loader2 } from "lucide-react";

export function AccessGate({ onGranted }: { onGranted: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState("");

  const [currentIp, setCurrentIp] = useState("");

  // Fetch current IP
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then(r => r.json())
      .then(d => {
        setCurrentIp(d.ip);
        // Check localStorage for previously approved email
        const savedEmail = localStorage.getItem("dt_access_email");
        if (savedEmail) {
          checkApproval(savedEmail, d.ip);
        }
      })
      .catch(() => setCurrentIp("unknown"));
  }, []);

  const checkApproval = useCallback(async (checkEmail: string, ip?: string) => {
    const checkIp = ip || currentIp;
    const { data } = await supabase
      .from("access_requests")
      .select("status, ip_address, expires_at")
      .eq("email", checkEmail)
      .eq("status", "approved")
      .maybeSingle();

    if (data) {
      // Check IP match
      if (data.ip_address && data.ip_address !== checkIp) {
        return false;
      }
      // Check expiry
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        localStorage.removeItem("dt_access_email");
        return false;
      }
      localStorage.setItem("dt_access_email", checkEmail);
      onGranted();
      return true;
    }
    return false;
  }, [onGranted, currentIp]);

  // Poll for approval after request is sent
  useEffect(() => {
    if (status !== "sent") return;
    const interval = setInterval(async () => {
      const approved = await checkApproval(email);
      if (approved) clearInterval(interval);
    }, 5000);
    return () => clearInterval(interval);
  }, [status, email, checkApproval]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    // Check if already approved
    const alreadyApproved = await checkApproval(email);
    if (alreadyApproved) return;

    const { data: inserted, error: insertError } = await supabase
      .from("access_requests")
      .insert({ first_name: firstName, last_name: lastName, email, ip_address: currentIp })
      .select("id")
      .single();

    if (insertError) {
      setError("Qualcosa è andato storto. Riprova.");
      setStatus("idle");
      return;
    }

    // Send Telegram notification with request ID for approve link
    supabase.functions.invoke("notify-telegram", {
      body: { first_name: firstName, last_name: lastName, email, request_id: inserted.id },
    }).catch(console.error);

    setStatus("sent");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="monolith-card max-w-md w-full mx-4 p-8 relative z-10"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          <span className="label-mono">Access Restricted</span>
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Davide Tuzi — Private Briefing
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          This document contains proprietary information. Please request credentials to proceed.
        </p>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-4"
            >
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="text-lg font-semibold text-foreground mb-2">Richiesta Inviata</h2>
              <p className="text-muted-foreground text-sm mb-4">
                La tua richiesta è stata inoltrata. Quando verrà approvata, questa pagina si aggiornerà automaticamente.
              </p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>In attesa di approvazione...</span>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="label-mono block mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label className="label-mono block mb-2">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div>
                  <label className="label-mono block mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-destructive text-sm">{error}</p>}

              <Button type="submit" variant="gate" disabled={status === "loading"}>
                {status === "loading" ? "Invio..." : "Request Access"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
