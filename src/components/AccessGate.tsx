import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Lock, CheckCircle } from "lucide-react";

export function AccessGate({ onGranted }: { onGranted: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "checking">("idle");
  const [tokenInput, setTokenInput] = useState("");
  const [error, setError] = useState("");

  // Check localStorage for existing approved token
  useState(() => {
    const saved = localStorage.getItem("dt_access_token");
    if (saved) {
      checkToken(saved);
    }
  });

  async function checkToken(token: string) {
    setStatus("checking");
    const { data } = await supabase
      .from("access_requests")
      .select("status")
      .eq("access_token", token)
      .single();

    if (data?.status === "approved") {
      localStorage.setItem("dt_access_token", token);
      onGranted();
    } else {
      setError("Access not yet approved. Please wait for confirmation.");
      setStatus("idle");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const { error: insertError } = await supabase
      .from("access_requests")
      .insert({ first_name: firstName, last_name: lastName, email });

    if (insertError) {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
      return;
    }

    setStatus("sent");
  }

  async function handleTokenCheck(e: React.FormEvent) {
    e.preventDefault();
    await checkToken(tokenInput);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background blur effect */}
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
              <h2 className="text-lg font-semibold text-foreground mb-2">Request Logged</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Your request has been submitted. You will receive access once approved.
              </p>

              <div className="border-t border-border pt-6 mt-6">
                <p className="label-mono mb-4">Already have an access token?</p>
                <form onSubmit={handleTokenCheck} className="space-y-4">
                  <input
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Paste your access token"
                    className="w-full bg-transparent border-b border-border pb-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                  <Button variant="outline" type="submit" className="w-full">
                    Verify Token
                  </Button>
                </form>
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

              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}

              <Button
                type="submit"
                variant="gate"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting..." : "Request Access"}
              </Button>

              <div className="border-t border-border pt-4">
                <p className="label-mono mb-3">Already have an access token?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="Paste token"
                    className="flex-1 bg-transparent border-b border-border pb-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => tokenInput && checkToken(tokenInput)}
                  >
                    Verify
                  </Button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
