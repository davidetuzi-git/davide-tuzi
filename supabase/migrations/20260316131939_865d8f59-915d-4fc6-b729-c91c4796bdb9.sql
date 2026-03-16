ALTER TABLE public.access_requests ADD COLUMN IF NOT EXISTS ip_address text;
ALTER TABLE public.access_requests ADD COLUMN IF NOT EXISTS expires_at timestamptz;