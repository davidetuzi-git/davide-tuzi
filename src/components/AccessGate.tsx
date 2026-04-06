import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, Loader2, CheckCircle, Clock } from "lucide-react";
import { z } from "zod";

// ─── CONFIGURAZIONE ──────────────────────────────────
// Dopo aver deployato il Google Apps Script, incolla qui l'URL
const GAS_URL = "INCOLLA_QUI_URL_GOOGLE_APPS_SCRIPT";
// ─────────────────────────────────────────────────────

const formSchema = z.object({
  first_name: z.string().trim().min(1, "Inserisci il nome").max(100),
  last_name: z.string().trim().min(1, "Inserisci il cognome").max(100),
  email: z.string().trim().email("Email non valida").max(255),
});

type Step = "form" | "waiting" | "approved";

export function AccessGate({ onGranted }: { onGranted: () => void }) {
  const [step, setStep] = useState<Step>("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check localStorage for existing approved session
  useEffect(() => {
    const savedId = localStorage.getItem("dt_access_request_id");
    if (!savedId) return;

    fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify({ action: "check", request_id: savedId }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "approved") {
          onGranted();
        } else {
          localStorage.removeItem("dt_access_request_id");
        }
      })
      .catch(() => {
        // If GAS is unreachable, keep saved access
      });
  }, [onGranted]);

  // Poll for approval
  const startPolling = useCallback(
    (id: string) => {
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(GAS_URL, {
            method: "POST",
            body: JSON.stringify({ action: "check", request_id: id }),
          });
          const data = await res.json();

          if (data.status === "approved") {
            if (pollRef.current) clearInterval(pollRef.current);
            setStep("approved");
            localStorage.setItem("dt_access_request_id", id);
            setTimeout(() => onGranted(), 1500);
          }
        } catch {
          // Retry on next interval
        }
      }, 4000);
    },
    [onGranted]
  );

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const parsed = formSchema.safeParse({
      first_name: firstName,
      last_name: lastName,
      email,
    });

    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    setSubmitting(true);

    try {
      // Get IP
      let ip = "";
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        ip = ipData.ip;
      } catch {
        // IP detection failed
      }

      const res = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "request",
          first_name: parsed.data.first_name,
          last_name: parsed.data.last_name,
          email: parsed.data.email,
          ip,
        }),
      });

      const data = await res.json();

      if (!data.success || !data.request_id) {
        throw new Error(data.error || "Errore durante l'invio");
      }

      setStep("waiting");
      startPolling(data.request_id);
    } catch (err: any) {
      setError(err.message || "Errore durante l'invio. Riprova.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />

      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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
            <p className="text-muted-foreground text-sm mb-2">
              This document contains proprietary information. Please identify yourself to request access.
            </p>
            <p className="text-primary font-medium text-sm mb-8 italic">
              Who wants to know more about me? 😏
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label-mono block mb-2">Nome</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Il tuo nome"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="label-mono block mb-2">Cognome</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Il tuo cognome"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="label-mono block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="La tua email"
                  required
                  disabled={submitting}
                />
              </div>

              {error && <p className="text-destructive text-sm">{error}</p>}

              <Button type="submit" variant="gate" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  "Richiedi Accesso"
                )}
              </Button>
            </form>
          </motion.div>
        )}

        {step === "waiting" && (
          <motion.div
            key="waiting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="monolith-card max-w-md w-full mx-4 p-8 relative z-10 text-center"
          >
            <Clock className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Richiesta Inviata
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              La tua richiesta è stata inviata a Davide. Riceverai l'accesso non appena verrà approvata.
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>In attesa di approvazione...</span>
            </div>
          </motion.div>
        )}

        {step === "approved" && (
          <motion.div
            key="approved"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="monolith-card max-w-md w-full mx-4 p-8 relative z-10 text-center"
          >
            <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Accesso Approvato
            </h2>
            <p className="text-muted-foreground text-sm">
              Benvenuto! Accesso in corso...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
