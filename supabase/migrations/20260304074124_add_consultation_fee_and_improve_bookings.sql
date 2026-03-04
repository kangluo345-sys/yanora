/*
  # Add consultation_fee and improve bookings table

  1. Changes
    - Add `consultation_fee` column to store the consultation fee amount
    - Add `selected_services` JSONB column to store selected additional services
    - Add `payment_completed_at` timestamp for tracking when payment was completed
    - Add index for better query performance

  2. Notes
    - consultation_fee defaults to 500 CNY
    - selected_services stores an array of service objects with name and price
*/

-- Add consultation_fee column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'consultation_fee'
  ) THEN
    ALTER TABLE bookings ADD COLUMN consultation_fee numeric DEFAULT 500;
  END IF;
END $$;

-- Add selected_services column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'selected_services'
  ) THEN
    ALTER TABLE bookings ADD COLUMN selected_services jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Add payment_completed_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'payment_completed_at'
  ) THEN
    ALTER TABLE bookings ADD COLUMN payment_completed_at timestamptz;
  END IF;
END $$;

-- Create index for payment status queries
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);

-- Create index for booking status queries
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);