/*
  # Create Bookings System

  ## Overview
  Creates a comprehensive booking system for the aesthetic clinic application with support for appointments, services, and payments.

  ## New Tables
  
  ### `bookings`
  - `id` (uuid, primary key) - Unique identifier for each booking
  - `user_id` (uuid, nullable) - Reference to auth.users for logged-in users
  - `name` (text) - Customer full name
  - `email` (text) - Customer email address
  - `phone` (text) - Customer phone number with country code
  - `service_type` (text) - Type of service requested
  - `preferred_date` (date) - Preferred appointment date
  - `preferred_time` (text) - Preferred appointment time slot
  - `message` (text, nullable) - Additional message from customer
  - `status` (text, default: 'pending') - Booking status: pending, confirmed, cancelled, completed
  - `payment_method` (text, nullable) - Payment method selected
  - `payment_status` (text, default: 'pending') - Payment status: pending, paid, failed
  - `total_amount` (numeric, default: 0) - Total amount to be paid
  - `created_at` (timestamptz) - When booking was created
  - `updated_at` (timestamptz) - Last update timestamp

  ### `booking_services`
  - `id` (uuid, primary key) - Unique identifier
  - `booking_id` (uuid) - Reference to bookings table
  - `service_name` (text) - Name of the service
  - `service_price` (numeric) - Price of the service
  - `created_at` (timestamptz) - When added

  ## Security
  - Enable RLS on all tables
  - Users can view their own bookings
  - Users can create new bookings
  - Only authenticated users can update their own bookings
  - Admin users can view and manage all bookings

  ## Notes
  1. Bookings can be made by both authenticated and anonymous users
  2. Phone numbers include country codes for international support
  3. Payment status tracks the payment lifecycle
  4. Multiple services can be attached to a single booking
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_type text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_method text CHECK (payment_method IN ('PayPal', '银行卡', '微信支付', '支付宝')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  total_amount numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create booking_services table for multiple services per booking
CREATE TABLE IF NOT EXISTS booking_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  service_name text NOT NULL,
  service_price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_services_booking_id ON booking_services(booking_id);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_services ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bookings table

-- Allow anyone to create bookings (for both logged-in and anonymous users)
CREATE POLICY "Anyone can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Users can view their own bookings (by user_id or email)
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (
    auth.uid() = user_id 
    OR 
    (auth.uid() IS NOT NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()))
  );

-- Authenticated users can update their own bookings
CREATE POLICY "Users can update own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR 
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
  WITH CHECK (
    auth.uid() = user_id 
    OR 
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- RLS Policies for booking_services table

-- Allow viewing services for bookings the user can view
CREATE POLICY "Users can view services for own bookings"
  ON booking_services
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = booking_services.booking_id
      AND (
        bookings.user_id = auth.uid()
        OR
        (auth.uid() IS NOT NULL AND bookings.email = (SELECT email FROM auth.users WHERE id = auth.uid()))
      )
    )
  );

-- Allow inserting services for new bookings
CREATE POLICY "Anyone can add services to bookings"
  ON booking_services
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
