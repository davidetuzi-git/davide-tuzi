import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, AlertTriangle } from "lucide-react";

// ─── CONFIGURAZIONE PASSWORD ─────────────────────────────────
// Cambia qui la password e aggiorna la data ogni 30 giorni.
const ACCESS_PASSWORD = "ShowM€";
const PASSWORD_SET_DATE = "2025-07-14"; // Data in cui hai impostato la password (YYYY-MM-DD)
const EXPIRY_DAYS = 30;
// ─────────────────────────────────────────────────────────────

function isPasswordExpired(): boolean {
  const setDate = new Date(PASSWORD_SET_DATE);
  const now = new Date();
  const diffMs = now.getTime() - setDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > EXPIRY_DAYS;
}

function daysUntilExpiry(): number {
  const setDate = new Date(PASSWORD_SET_DATE);
  const expiryDate = new Date(setDate.getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffDays = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function AccessGate({ onGranted }: { onGranted: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const expired = isPasswordExpired();

  useEffect(() => {
    if (expired) {
      localStorage.removeItem("dt_access_granted");
      return;
    }
    const saved = localStorage.getItem("dt_access_granted");
    if (saved === "true") {
      onGranted();
    }
  }, [onGranted, expired]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (expired) {
      setError("La password è scaduta. L'amministratore deve aggiornarla.");
      return;
    }

    if (password === ACCESS_PASSWORD) {
      localStorage.setItem("dt_access_granted", "true");
      onGranted();
    } else {
      setError("Password errata. Riprova.");
    }
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
        <p className="text-muted-foreground text-sm mb-2">
          This document contains proprietary information. Please enter the password to proceed.
        </p>
        <p className="text-primary font-medium text-sm mb-8 italic">
          Who wants to know more about me? 😏
        </p>

        {expired && (
          <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">Password Scaduta</p>
              <p className="text-xs text-destructive/70 mt-1">
                La password è scaduta. L'accesso è temporaneamente sospeso. Se sei Davide, aggiorna la password nel codice sorgente.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label-mono block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter password"
              required
              disabled={expired}
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button type="submit" variant="gate" disabled={expired}>
            Request Access
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
