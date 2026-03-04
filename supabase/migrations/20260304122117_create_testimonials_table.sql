/*
  # Create testimonials table

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier for each testimonial
      - `image1_url` (text) - URL for the first image
      - `image2_url` (text) - URL for the second image
      - `image3_url` (text) - URL for the third image
      - `message` (text) - The testimonial message content
      - `customer_name` (text) - Name of the customer
      - `display_order` (integer) - Order in which testimonials should be displayed
      - `is_active` (boolean) - Whether the testimonial is active and should be shown
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update

  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for public read access to active testimonials
    - Add policy for authenticated admins to manage all testimonials
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image1_url text NOT NULL DEFAULT '',
  image2_url text NOT NULL DEFAULT '',
  image3_url text NOT NULL DEFAULT '',
  message text NOT NULL,
  customer_name text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active testimonials"
  ON testimonials
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can view all testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can delete testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);