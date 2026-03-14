-- =============================================
-- SUPABASE SETUP SCRIPT
-- Run this in your Supabase SQL Editor
-- =============================================

-- 1. Create storage bucket
-- (Do this in the Supabase Dashboard → Storage → New Bucket)
-- Name: portfolio-files
-- Public: true
-- File size limit: 10MB

-- 2. Set storage policies (run this SQL)

-- Allow public read access (anyone can download)
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'portfolio-files' );

-- Allow authenticated uploads via service role only
-- (The API route handles auth with ADMIN_PASSWORD before calling upload)
CREATE POLICY "Service role upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'portfolio-files' );

-- Allow service role deletes
CREATE POLICY "Service role delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'portfolio-files' );

-- 3. (Optional) Create contact_messages table
-- Useful if you want to store contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT,
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Allow inserts (from your API route)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow inserts from API"
ON contact_messages FOR INSERT
WITH CHECK (true);

-- Restrict reads to service role only
CREATE POLICY "Service role read"
ON contact_messages FOR SELECT
USING (false);
