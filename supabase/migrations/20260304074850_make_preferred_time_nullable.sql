/*
  # Make preferred_time nullable in bookings table

  1. Changes
    - Alter preferred_time column to allow NULL values
    - This allows customers to book without specifying a specific time
    - The time can be confirmed later by the admin

  2. Notes
    - preferred_date is required but preferred_time is optional
*/

-- Make preferred_time nullable
ALTER TABLE bookings 
ALTER COLUMN preferred_time DROP NOT NULL;
