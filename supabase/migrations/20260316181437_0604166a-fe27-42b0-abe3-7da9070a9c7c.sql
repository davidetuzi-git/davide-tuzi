
CREATE TABLE public.document_access_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  document_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ
);

ALTER TABLE public.document_access_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert document access requests"
ON public.document_access_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can read their own document access requests"
ON public.document_access_requests FOR SELECT
TO anon, authenticated
USING (true);
