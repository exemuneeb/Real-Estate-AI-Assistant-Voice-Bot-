DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

CREATE POLICY "Anonymous chat can insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  source = 'chatbot'
  AND (email IS NOT NULL OR phone IS NOT NULL OR name IS NOT NULL)
  AND (email IS NULL OR length(email) <= 255)
  AND (phone IS NULL OR length(phone) <= 32)
  AND (name IS NULL OR length(name) <= 120)
);