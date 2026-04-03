import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

// Stessa configurazione di AccessGate
const PASSWORD_SET_DATE = "2025-07-14";
const EXPIRY_DAYS = 30;
const ADMIN_QUESTION = "Qual è il nome del tuo terzo gatto?";
const ADMIN_ANSWER = "Sofficino";

function daysUntilExpiry(): number {
  const setDate = new Date(PASSWORD_SET_DATE);
  const expiryDate = new Date(setDate.getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffDays = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

function isPasswordExpired(): boolean {
  const setDate = new Date(PASSWORD_SET_DATE);
  const now = new Date();
  const diffMs = now.getTime() - setDate.getTime();
  return diffMs / (1000 * 60 * 60 * 24) > EXPIRY_DAYS;
}

export default function Admin() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [pinError, setPinError] = useState("");

  const expired = isPasswordExpired();
  const remaining = daysUntilExpiry();

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setAuthenticated(true);
    } else {
      setPinError("PIN errato.");
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="monolith-card max-w-sm w-full mx-4 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            <span className="label-mono">Admin</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-6">Accesso Admin</h1>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="label-mono block mb-2">PIN Admin</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-transparent border-b border-border pb-2 text-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Inserisci PIN"
                required
              />
            </div>
            {pinError && <p className="text-destructive text-sm">{pinError}</p>}
            <Button type="submit" variant="gate" className="w-full">
              Accedi
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
          <h1 className="text-2xl font-semibold text-foreground">Stato Password</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="monolith-card p-6 mb-6"
        >
          <div className="flex items-start gap-4">
            {expired ? (
              <AlertTriangle className="w-8 h-8 text-destructive shrink-0" strokeWidth={1.5} />
            ) : remaining <= 7 ? (
              <AlertTriangle className="w-8 h-8 text-yellow-500 shrink-0" strokeWidth={1.5} />
            ) : (
              <CheckCircle className="w-8 h-8 text-green-500 shrink-0" strokeWidth={1.5} />
            )}

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                {expired
                  ? "⚠️ Password Scaduta!"
                  : remaining <= 7
                    ? "⏳ Password in scadenza"
                    : "✅ Password Attiva"}
              </h2>

              {expired ? (
                <p className="text-muted-foreground text-sm">
                  La password è scaduta. I visitatori non possono più accedere al sito.
                  Devi aggiornare la password nel codice sorgente.
                </p>
              ) : (
                <p className="text-muted-foreground text-sm">
                  La password scadrà tra <strong className="text-foreground">{remaining} giorni</strong>.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="monolith-card p-6"
        >
          <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Come cambiare la password
          </h3>

          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              <span>Apri il file <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">src/components/AccessGate.tsx</code></span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              <span>Modifica <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">ACCESS_PASSWORD</code> con la nuova password</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              <span>Aggiorna <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">PASSWORD_SET_DATE</code> con la data odierna (formato YYYY-MM-DD)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">4.</span>
              <span>Fai push su GitHub — il deploy è automatico</span>
            </li>
          </ol>

          <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
            <p className="text-xs text-muted-foreground font-mono">
              {`// AccessGate.tsx — righe da modificare:`}<br />
              {`const ACCESS_PASSWORD = "NuovaPassword";`}<br />
              {`const PASSWORD_SET_DATE = "${new Date().toISOString().split('T')[0]}";`}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
