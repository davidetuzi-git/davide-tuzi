import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, Loader2, CheckCircle, Clock, KeyRound } from "lucide-react";
import { z } from "zod";

// ─── CONFIGURATION ──────────────────────────────────
// After deploying the Google Apps Script, paste the URL here
const GAS_URL = "https://script.google.com/macros/s/AKfycbx7swnb-iFH4TtvI69hrU3XO2tLkZbXHjMzkDNlhuD8oW7s_GSOqxsTrjOEWnkOd3iEng/exec";
// ─────────────────────────────────────────────────────

const formSchema = z.object({
  first_name: z.string().trim().min(1, "Please enter your first name").max(100),
  last_name: z.string().trim().min(1, "Please enter your last name").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
});

type Step = "form" | "waiting" | "password" | "approved";

export function AccessGate({ onGranted }: { onGranted: () => void }) {
  const [step, setStep] = useState<Step>("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [userIp, setUserIp] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Detect IP once
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setUserIp(d.ip || ""))
      .catch(() => {});
  }, []);

  // Check localStorage for existing approved session
  useEffect(() => {
    const savedId = localStorage.getItem("dt_access_request_id");
    if (!savedId || !userIp) return;

    fetch(GAS_URL, {
      method: "POST",
      body: JSON.stringify({ action: "validate_access", request_id: savedId, ip: userIp }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          onGranted();
        } else {
          localStorage.removeItem("dt_access_request_id");
        }
      })
      .catch(() => {
        localStorage.removeItem("dt_access_request_id");
      });
  }, [onGranted, userIp]);

  // Poll for approval → then show password step
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
            setStep("password");
          }
        } catch {
          // Retry on next interval
        }
      }, 4000);
    },
    []
  );

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // Step 1: Submit form
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
      const res = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "request",
          first_name: parsed.data.first_name,
          last_name: parsed.data.last_name,
          email: parsed.data.email,
          ip: userIp,
        }),
      });

      const data = await res.json();

      if (!data.success || !data.request_id) {
        throw new Error(data.error || "Error submitting request");
      }

      setRequestId(data.request_id);
      setStep("waiting");
      startPolling(data.request_id);
    } catch (err: any) {
      setError(err.message || "Error submitting request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Step 3: Verify password + IP
  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "verify_password",
          request_id: requestId,
          password,
          ip: userIp,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStep("approved");
        localStorage.setItem("dt_access_request_id", requestId!);
        setTimeout(() => onGranted(), 1500);
      } else if (data.error === "IP mismatch") {
        setError("Access denied. This password can only be used from the original device.");
      } else if (data.error === "Wrong password") {
        setError("Wrong password. Please try again.");
      } else if (data.error === "Expired") {
        setError("Your access has expired. Please submit a new request.");
        localStorage.removeItem("dt_access_request_id");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      setError("Connection error. Please try again.");
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
        {/* ─── STEP 1: IDENTIFICATION FORM ─── */}
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
                <label className="label-mono block mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your first name"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="label-mono block mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your last name"
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
                  placeholder="Your email address"
                  required
                  disabled={submitting}
                />
              </div>

              {error && <p className="text-destructive text-sm">{error}</p>}

              <Button type="submit" variant="gate" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request Access"
                )}
              </Button>
            </form>
          </motion.div>
        )}

        {/* ─── STEP 2: WAITING FOR APPROVAL ─── */}
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
              Request Submitted
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Your request has been sent to Davide. You will gain access as soon as it is approved.
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Waiting for approval...</span>
            </div>
          </motion.div>
        )}

        {/* ─── STEP 3: PASSWORD ─── */}
        {step === "password" && (
          <motion.div
            key="password"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="monolith-card max-w-md w-full mx-4 p-8 relative z-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <KeyRound className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="label-mono">Access Approved</span>
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your request has been approved
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              Please enter the password you've been provided to continue.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div>
                <label className="label-mono block mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter password"
                  required
                  disabled={submitting}
                />
              </div>

              {error && <p className="text-destructive text-sm">{error}</p>}

              <Button type="submit" variant="gate" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Enter"
                )}
              </Button>
            </form>
          </motion.div>
        )}

        {/* ─── STEP 4: ACCESS GRANTED ─── */}
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
              Access Granted
            </h2>
            <p className="text-muted-foreground text-sm">
              Welcome! Loading content...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
