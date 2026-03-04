/*
  # Add Consultation Fee Column to Bookings

  ## Overview
  Adds a consultation_fee column to track consultation fees for bookings.

  ## Changes
  
  ### Modified Tables
  - `bookings`
    - Added `consultation_fee` (numeric) - Consultation fee amount, defaults to 0

  ## Notes
  - Consultation fee is separate from service prices
  - Defaults to 0 for bookings without consultation fees
*/

-- Add consultation_fee column to bookings table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'bookings' AND column_name = 'consultation_fee'
  ) THEN
    ALTER TABLE bookings ADD COLUMN consultation_fee numeric(10,2) DEFAULT 0;
  END IF;
END $$;
