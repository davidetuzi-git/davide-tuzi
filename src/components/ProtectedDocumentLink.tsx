import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { FileText, ExternalLink, Loader2, CheckCircle, Lock } from "lucide-react";

interface ProtectedDocumentLinkProps {
  documentKey: string;
  documentUrl: string;
  label: string;
  className?: string;
}

export function ProtectedDocumentLink({ documentKey, documentUrl, label, className }: ProtectedDocumentLinkProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "pending" | "approved">("idle");
  const [requestId, setRequestId] = useState<string | null>(null);

  const email = localStorage.getItem("dt_access_email") || "";

  const checkApproval = useCallback(async (reqId: string) => {
    const { data } = await supabase
      .from("document_access_requests")
      .select("status, expires_at")
      .eq("id", reqId)
      .eq("status", "approved")
      .maybeSingle();

    if (data) {
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        return false;
      }
      setStatus("approved");
      return true;
    }
    return false;
  }, []);

  // Poll for approval
  useEffect(() => {
    if (status !== "pending" || !requestId) return;
    const interval = setInterval(async () => {
      const approved = await checkApproval(requestId);
      if (approved) clearInterval(interval);
    }, 4000);
    return () => clearInterval(interval);
  }, [status, requestId, checkApproval]);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    setShowDialog(true);
  }

  async function handleRequestAccess() {
    setStatus("loading");

    let ip = "unknown";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const d = await res.json();
      ip = d.ip;
    } catch {}

    const { data: inserted, error } = await supabase
      .from("document_access_requests")
      .insert({ email, document_key: documentKey, ip_address: ip })
      .select("id")
      .single();

    if (error) {
      setStatus("idle");
      return;
    }

    setRequestId(inserted.id);

    // Send Telegram notification
    supabase.functions.invoke("notify-telegram", {
      body: {
        first_name: "",
        last_name: "",
        email,
        request_id: inserted.id,
        type: "document",
        document_label: label,
      },
    }).catch(console.error);

    setStatus("pending");
  }

  function handleOpenDocument() {
    window.open(documentUrl, "_blank", "noopener,noreferrer");
    setShowDialog(false);
    setStatus("idle");
  }

  return (
    <>
      <a
        href={documentUrl}
        onClick={handleClick}
        className={className}
      >
        <Lock className="w-3 h-3" />
        {label}
        <ExternalLink className="w-2.5 h-2.5 opacity-50" />
      </a>

      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm"
            onClick={() => { setShowDialog(false); setStatus("idle"); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="monolith-card max-w-sm w-full mx-4 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {status === "approved" ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Accesso Approvato</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Puoi ora visualizzare il documento.
                  </p>
                  <button
                    onClick={handleOpenDocument}
                    className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground rounded-lg px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Apri Documento
                  </button>
                </div>
              ) : status === "pending" ? (
                <div className="text-center py-4">
                  <Lock className="w-8 h-8 text-primary mx-auto mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Richiesta Inviata</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    In attesa di approvazione da parte di Davide. La pagina si aggiornerà automaticamente.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>In attesa di approvazione...</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                    <span className="label-mono">Documento Protetto</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{label}</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Questo documento richiede un'autorizzazione aggiuntiva. Verrà inviata una richiesta a Davide.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleRequestAccess}
                      disabled={status === "loading"}
                      className="flex-1 inline-flex items-center justify-center gap-2 text-sm bg-primary text-primary-foreground rounded-lg px-4 py-2.5 font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Invio...</>
                      ) : (
                        "Richiedi Accesso"
                      )}
                    </button>
                    <button
                      onClick={() => { setShowDialog(false); setStatus("idle"); }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3"
                    >
                      Annulla
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
