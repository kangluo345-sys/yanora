/*
  # Fix Case Images Upload Policy

  1. Changes
    - Drop existing INSERT policy that may be causing issues
    - Create new simplified INSERT policy for authenticated admins
    - Ensure proper permission checking for uploads

  2. Security
    - Only authenticated users who are active admins can upload
    - Uploads restricted to case-images bucket only
*/

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Admins can upload case images" ON storage.objects;

-- Create new INSERT policy with proper WITH CHECK clause
CREATE POLICY "Admins can upload case images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'case-images' AND
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      AND admins.is_active = true
    )
  );