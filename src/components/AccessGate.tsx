import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, Loader2, CheckCircle, Clock, LogIn, UserPlus } from "lucide-react";
import { z } from "zod";

// ─── CONFIGURATION ──────────────────────────────────
// After deploying the Google Apps Script, paste the URL here
const GAS_URL = "https://script.google.com/macros/s/AKfycbx7swnb-iFH4TtvI69hrU3XO2tLkZbXHjMzkDNlhuD8oW7s_GSOqxsTrjOEWnkOd3iEng/exec";
// ─────────────────────────────────────────────────────

// VIP emails that skip approval entirely
const VIP_EMAILS = ["davide.tuzi@gmail.com"];

const formSchema = z.object({
  first_name: z.string().trim().min(1, "Please enter your first name").max(100),
  last_name: z.string().trim().min(1, "Please enter your last name").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
});

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255),
});

type Mode = "request" | "login";
type Step = "form" | "waiting" | "approved";

export function AccessGate({ onGranted }: { onGranted: () => void }) {
  const [mode, setMode] = useState<Mode>("request");
  const [step, setStep] = useState<Step>("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
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
    (id: string, emailToCheck: string) => {
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(GAS_URL, {
            method: "POST",
            body: JSON.stringify({
              action: "check",
              request_id: id,
              email: emailToCheck,
              ip: userIp,
            }),
          });
          const data = await res.json();

          // Strict: backend must confirm approved AND email+ip match this exact row
          if (data.status === "approved" && data.verified === true) {
            if (pollRef.current) clearInterval(pollRef.current);
            // Approval is enough: email + IP grants 30-day access
            setStep("approved");
            localStorage.setItem("dt_access_request_id", id);
            setTimeout(() => onGranted(), 1500);
          }
        } catch {
          // Retry on next interval
        }
      }, 4000);
    },
    [onGranted, userIp]
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
      // No auto-polling: user must come back via Login after Telegram approval
    } catch (err: any) {
      setError(err.message || "Error submitting request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Login with email (returning users, same IP, within 30 days)
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");

    const parsed = loginSchema.safeParse({ email: loginEmail });
    if (!parsed.success) {
      setLoginError(parsed.error.errors[0].message);
      return;
    }

    setLoggingIn(true);
    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "login_with_email",
          email: parsed.data.email,
          ip: userIp,
        }),
      });
      const data = await res.json();

      if (data.success && data.request_id) {
        localStorage.setItem("dt_access_request_id", data.request_id);
        setStep("approved");
        setTimeout(() => onGranted(), 1200);
      } else if (data.error === "IP mismatch") {
        setLoginError("This email was approved from a different network. Please request access again from this device.");
      } else if (data.error === "Expired") {
        setLoginError("Your access has expired. Please submit a new request.");
      } else if (data.error === "Not approved" || data.error === "Not found") {
        setLoginError("No approved access found for this email. Please request access first.");
      } else {
        setLoginError("Login failed. Please try again or request a new access.");
      }
    } catch {
      setLoginError("Connection error. Please try again.");
    } finally {
      setLoggingIn(false);
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

            {/* Mode toggle */}
            <div className="flex gap-2 mb-6 p-1 bg-secondary/40 rounded-md">
              <button
                type="button"
                onClick={() => { setMode("request"); setError(""); setLoginError(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium tracking-wider uppercase rounded transition-colors ${
                  mode === "request" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" strokeWidth={1.5} />
                Request Access
              </button>
              <button
                type="button"
                onClick={() => { setMode("login"); setError(""); setLoginError(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium tracking-wider uppercase rounded transition-colors ${
                  mode === "login" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" strokeWidth={1.5} />
                Login
              </button>
            </div>

            {mode === "request" ? (
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
            ) : (
            <form onSubmit={handleLogin} className="space-y-5">
              <p className="text-muted-foreground text-xs">
                Already approved? Enter the same email to enter again. Access lasts 30 days and is bound to your current network.
              </p>
              <div>
                <label className="label-mono block mb-2">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-border pb-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your approved email"
                  required
                  disabled={loggingIn}
                />
              </div>

              {loginError && <p className="text-destructive text-sm">{loginError}</p>}

              <Button type="submit" variant="gate" disabled={loggingIn || !userIp}>
                {loggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Enter"
                )}
              </Button>
            </form>
            )}
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
              Request Received
            </h2>
            <p className="text-muted-foreground text-sm mb-3">
              Davide has received your request and will review it <span className="text-foreground font-medium">within 24 hours</span>.
            </p>
            <p className="text-muted-foreground text-xs mb-6">
              You can close this page. Once approved, come back and use <span className="text-foreground font-medium">Login</span> with your email to enter — access lasts 30 days from this network.
            </p>
            <button
              type="button"
              onClick={() => { setStep("form"); setMode("login"); }}
              className="text-xs text-primary hover:underline"
            >
              ← Back to Login
            </button>
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
