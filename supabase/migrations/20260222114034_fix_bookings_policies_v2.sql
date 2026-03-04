/*
  # Fix Bookings RLS Policies v2

  ## Overview
  Fixes RLS policies to avoid querying auth.users table directly.
  Uses profiles table for email lookups instead.

  ## Changes
  
  ### Modified Policies
  - Drop and recreate policies that query auth.users
  - Use profiles table for email matching
  - Maintains security while fixing permission errors

  ## Security
  - Maintains proper access control
  - Prevents unauthorized access to bookings
  - Uses auth.uid() and profiles table for safe authentication
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can update own bookings" ON bookings;

-- Create new SELECT policy
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (
    auth.uid() = user_id 
    OR 
    (
      auth.uid() IS NOT NULL 
      AND email IN (
        SELECT email FROM profiles WHERE id = auth.uid()
      )
    )
  );

-- Create new UPDATE policy
CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR 
    (
      user_id IS NULL 
      AND email IN (
        SELECT email FROM profiles WHERE id = auth.uid()
      )
    )
  )
  WITH CHECK (
    auth.uid() = user_id 
    OR 
    (
      user_id IS NULL 
      AND email IN (
        SELECT email FROM profiles WHERE id = auth.uid()
      )
    )
  );
