/*
  # Make preferred_date optional in bookings table

  1. Changes
    - Alter preferred_date column to allow NULL values
    - This allows customers to book consultations without specifying a date
    - The clinic can arrange the consultation date later with the customer

  2. Notes
    - Both preferred_date and preferred_time are now optional
    - Customers can book immediately without scheduling constraints
*/

-- Make preferred_date nullable
ALTER TABLE bookings 
ALTER COLUMN preferred_date DROP NOT NULL;
