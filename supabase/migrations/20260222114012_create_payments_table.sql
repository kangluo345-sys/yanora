/*
  # Create Payments Table

  ## Overview
  Creates a table to track payment transactions for bookings.

  ## Tables Created
  
  ### `payments`
  - `id` (uuid, primary key) - Unique identifier
  - `booking_id` (uuid) - Reference to bookings table
  - `user_id` (uuid, nullable) - Reference to user who made payment
  - `amount` (numeric) - Payment amount
  - `currency` (text) - Currency code (e.g., CNY, USD)
  - `payment_method` (text) - Payment method used
  - `status` (text) - Payment status (pending, completed, failed, refunded)
  - `transaction_id` (text, nullable) - External transaction ID from payment provider
  - `created_at` (timestamptz) - Payment creation time
  - `updated_at` (timestamptz) - Last update time

  ## Security
  - Enable RLS on payments table
  - Users can view their own payments
  - Users can insert their own payments
  - Users can update their own payments

  ## Notes
  - Tracks all payment transactions
  - Links to bookings for reference
  - Stores external transaction IDs for reconciliation
*/

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  amount numeric(10,2) NOT NULL,
  currency text DEFAULT 'CNY',
  payment_method text NOT NULL,
  status text DEFAULT 'pending',
  transaction_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT payments_status_check CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  CONSTRAINT payments_payment_method_check CHECK (payment_method IN ('PayPal', '银行卡', '微信支付', '支付宝'))
);

-- Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can view their own payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can view payments for bookings with their email (guest bookings)
CREATE POLICY "Users can view payments for their bookings"
  ON payments FOR SELECT
  TO authenticated
  USING (
    booking_id IN (
      SELECT id FROM bookings
      WHERE user_id = auth.uid()
      OR (user_id IS NULL AND email IN (
        SELECT email FROM profiles WHERE id = auth.uid()
      ))
    )
  );

-- Users can insert payments for their bookings
CREATE POLICY "Users can insert payments for own bookings"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() OR user_id IS NULL
  );

-- Users can update their own payments
CREATE POLICY "Users can update own payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL)
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
