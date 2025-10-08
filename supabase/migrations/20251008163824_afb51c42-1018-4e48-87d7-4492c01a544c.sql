-- Create storage bucket for health documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'health-documents',
  'health-documents',
  false,
  20971520, -- 20MB limit
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/jpg']
);

-- RLS policies for health-documents bucket
CREATE POLICY "Allow authenticated users to upload health documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'health-documents');

CREATE POLICY "Allow authenticated users to view health documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'health-documents');

CREATE POLICY "Allow authenticated users to delete their uploads"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'health-documents');