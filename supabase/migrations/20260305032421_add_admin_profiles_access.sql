/*
  # Add admin access to profiles

  1. Changes
    - Add RLS policy allowing admins to view all profiles
    - Add RLS policy allowing admins to delete profiles
  
  2. Security
    - Only active admins can view and manage all profiles
    - Regular users can still only view/update their own profile
*/

CREATE POLICY "Admins can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
      AND admins.is_active = true
    )
  );

CREATE POLICY "Admins can delete profiles"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.id = auth.uid()
      AND admins.is_active = true
    )
  );
