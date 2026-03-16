-- Allow authenticated users to update access_requests
CREATE POLICY "Authenticated users can update requests"
ON public.access_requests
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);