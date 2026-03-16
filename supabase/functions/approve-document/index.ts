import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("<h1>❌ ID mancante</h1>", {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24h

  const { data, error } = await supabase
    .from("document_access_requests")
    .update({ status: "approved", expires_at: expiresAt })
    .eq("id", id)
    .select("email, document_key")
    .single();

  if (error) {
    return new Response(`<h1>❌ Errore</h1><p>${error.message}</p>`, {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new Response(
    `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Documento Approvato</title>
<style>body{font-family:system-ui;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0a0a0a;color:#fff}
.card{text-align:center;padding:2rem;max-width:400px}
.check{font-size:3rem;margin-bottom:1rem}
.email{color:#888;font-size:.9rem}</style></head>
<body><div class="card">
<div class="check">✅</div>
<h1>Accesso Documento Approvato</h1>
<p class="email">${data.email}</p>
<p style="color:#888;margin-top:1rem;font-size:.85rem">Accesso valido per 24 ore.</p>
</div></body></html>`,
    {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
});
