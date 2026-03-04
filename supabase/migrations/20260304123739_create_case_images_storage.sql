/*
  # Create Storage Bucket for Case Study Images

  1. Storage Setup
    - Create a public bucket named 'case-images' for storing before/after photos
    - Enable public access for viewing images
    - Set up RLS policies for authenticated admin users to upload

  2. Security
    - Only authenticated admin users can upload images
    - Public read access for displaying images on the website
    - File size limits and type restrictions
*/

-- Create storage bucket for case study images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'case-images',
  'case-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access to case images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload case images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update case images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete case images" ON storage.objects;

-- Allow public read access to case images
CREATE POLICY "Public read access to case images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'case-images');

-- Allow authenticated admin users to upload images
CREATE POLICY "Admins can upload case images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'case-images'
    AND (
      SELECT email FROM auth.users WHERE id = auth.uid()
    ) IN (
      SELECT email FROM admins WHERE is_active = true
    )
  );

-- Allow authenticated admin users to update images
CREATE POLICY "Admins can update case images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'case-images'
    AND (
      SELECT email FROM auth.users WHERE id = auth.uid()
    ) IN (
      SELECT email FROM admins WHERE is_active = true
    )
  );

-- Allow authenticated admin users to delete images
CREATE POLICY "Admins can delete case images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'case-images'
    AND (
      SELECT email FROM auth.users WHERE id = auth.uid()
    ) IN (
      SELECT email FROM admins WHERE is_active = true
    )
  );