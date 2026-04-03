import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const ACCESS_PASSWORD = "ShowM€";

export function AccessGate({ onGranted }: { onGranted: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("dt_access_granted");
    if (saved === "true") {
      onGranted();
    }
  }, [onGranted]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

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
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button type="submit" variant="gate">
            Request Access
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
