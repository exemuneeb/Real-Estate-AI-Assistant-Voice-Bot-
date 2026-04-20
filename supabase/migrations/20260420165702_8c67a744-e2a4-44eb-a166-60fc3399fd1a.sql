CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  budget TEXT,
  style TEXT,
  occasion TEXT,
  notes TEXT,
  source TEXT DEFAULT 'chatbot',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous chat visitors) can insert a lead
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No public read; only via service role (admin export later)
CREATE POLICY "No public read"
ON public.leads
FOR SELECT
TO authenticated
USING (false);