/*
  # Fix Admin RLS Policies - Remove Infinite Recursion

  ## Changes
  1. Drop existing admin policies that cause recursion
  2. Create new policies using security definer functions
  3. Add helper function to check admin status without recursion

  ## Security
  - Use security definer function to bypass RLS during admin checks
  - Maintain strict access control for admin operations
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can view all admins" ON admins;
DROP POLICY IF EXISTS "Super admins can insert admins" ON admins;
DROP POLICY IF EXISTS "Super admins can update admins" ON admins;

-- Create helper function to check if user is admin (bypasses RLS)
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE id = user_id
    AND is_active = true
  );
END;
$$;

-- Create helper function to check if user is super admin (bypasses RLS)
CREATE OR REPLACE FUNCTION is_super_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE id = user_id
    AND role = 'super_admin'
    AND is_active = true
  );
END;
$$;

-- New admin policies using helper functions
CREATE POLICY "Admins can view all admins"
  ON admins FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Super admins can insert admins"
  ON admins FOR INSERT
  TO authenticated
  WITH CHECK (is_super_admin(auth.uid()));

CREATE POLICY "Super admins can update admins"
  ON admins FOR UPDATE
  TO authenticated
  USING (is_super_admin(auth.uid()))
  WITH CHECK (is_super_admin(auth.uid()));