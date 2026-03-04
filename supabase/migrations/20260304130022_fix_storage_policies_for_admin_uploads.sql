/*
  # Fix Storage Policies for Admin Uploads

  1. Changes
    - Drop all existing case-images policies
    - Create simplified INSERT policy using direct ID comparison
    - Recreate UPDATE and DELETE policies with corrected logic
    - Keep SELECT policy for public access

  2. Security
    - Only authenticated admins can upload, update, and delete
    - Public can view case images
    - Uses admin ID instead of email for better reliability
*/

-- Drop existing policies for case-images
DROP POLICY IF EXISTS "Admins can upload case images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update case images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete case images" ON storage.objects;

-- Create new INSERT policy - simplified version
CREATE POLICY "Admins can upload case images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'case-images' 
    AND EXISTS (
      SELECT 1 
      FROM admins 
      WHERE admins.id = auth.uid() 
      AND admins.is_active = true
    )
  );

-- Create UPDATE policy
CREATE POLICY "Admins can update case images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'case-images'
    AND EXISTS (
      SELECT 1 
      FROM admins 
      WHERE admins.id = auth.uid() 
      AND admins.is_active = true
    )
  );

-- Create DELETE policy
CREATE POLICY "Admins can delete case images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'case-images'
    AND EXISTS (
      SELECT 1 
      FROM admins 
      WHERE admins.id = auth.uid() 
      AND admins.is_active = true
    )
  );