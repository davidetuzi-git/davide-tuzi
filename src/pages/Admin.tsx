import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, X, LogIn, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type AccessRequest = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  access_token: string | null;
  created_at: string;
};

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Credenziali non valide.");
      setLoading(false);
      return;
    }
    onLogin();
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="monolith-card max-w-sm w-full mx-4 p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <LogIn className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
          <span className="label-mono">Admin Access</span>
        </div>

        <h1 className="text-xl font-semibold text-foreground mb-6">
          Login Admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-mono block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-border pb-2 text-foreground focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <div>
            <label className="label-mono block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-border pb-2 text-foreground focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button type="submit" variant="gate" disabled={loading} className="w-full">
            {loading ? "..." : isSignUp ? "Registrati" : "Accedi"}
          </Button>

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-center"
          >
            {isSignUp ? "Hai già un account? Accedi" : "Prima volta? Crea account"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDashboard() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    setLoading(true);
    const { data } = await supabase
      .from("access_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setRequests(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("access_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Errore nell'aggiornamento");
      return;
    }
    toast.success(status === "approved" ? "Approvato!" : "Rifiutato");
    fetchRequests();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Richieste di Accesso</h1>
            <p className="text-muted-foreground text-sm mt-1">Approva o rifiuta le richieste</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchRequests}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Esci
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Caricamento...</p>
        ) : requests.length === 0 ? (
          <p className="text-muted-foreground">Nessuna richiesta.</p>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="monolith-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium">
                    {req.first_name} {req.last_name}
                  </p>
                  <p className="text-muted-foreground text-sm truncate">{req.email}</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {new Date(req.created_at).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {req.status === "pending" ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(req.id, "approved")}
                        className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                      >
                        <Check className="w-4 h-4 mr-1" /> Approva
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(req.id, "rejected")}
                        className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                      >
                        <X className="w-4 h-4 mr-1" /> Rifiuta
                      </Button>
                    </>
                  ) : (
                    <span
                      className={`label-mono text-xs px-3 py-1 rounded-full ${
                        req.status === "approved"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-red-400/10 text-red-400"
                      }`}
                    >
                      {req.status === "approved" ? "Approvato" : "Rifiutato"}
                    </span>
                  )}
                </div>

                {req.status === "approved" && req.access_token && (
                  <div className="sm:ml-4">
                    <p className="label-mono text-xs mb-1">Token</p>
                    <code className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded break-all">
                      {req.access_token}
                    </code>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (authenticated === null) return null;

  return authenticated ? (
    <AdminDashboard />
  ) : (
    <AdminLogin onLogin={() => setAuthenticated(true)} />
  );
}
