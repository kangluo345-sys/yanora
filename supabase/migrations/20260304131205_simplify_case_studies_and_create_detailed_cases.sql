/*
  # Simplify Case Studies and Create Detailed Cases System

  1. Changes to case_studies table
    - Remove category, title, title_en, description, description_en columns
    - Keep only before_image_url, after_image_url, display_order, created_at
    - This becomes "simple cases" for before/after comparisons only

  2. New detailed_cases table
    - id (uuid, primary key)
    - title (text) - Chinese title
    - title_en (text) - English title
    - description (text) - Chinese description
    - description_en (text) - English description
    - before_image_url (text) - before image
    - after_image_url (text) - after image
    - category (text) - main category for cases page
    - show_in_facial (boolean) - show in facial contour page
    - show_in_dental (boolean) - show in dental page
    - show_in_injection (boolean) - show in injection lifting page
    - show_in_body (boolean) - show in body sculpting page
    - show_in_hair (boolean) - show in hair transplant page
    - display_order (integer) - sort order
    - is_published (boolean) - published status
    - created_at (timestamptz)
    - updated_at (timestamptz)

  3. Security
    - Enable RLS on both tables
    - Public can view published cases
    - Only admins can manage cases
*/

-- Simplify case_studies table (drop columns we don't need)
ALTER TABLE case_studies 
  DROP COLUMN IF EXISTS category,
  DROP COLUMN IF EXISTS title,
  DROP COLUMN IF EXISTS title_en,
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS description_en;

-- Create detailed_cases table
CREATE TABLE IF NOT EXISTS detailed_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_en text NOT NULL,
  description text NOT NULL,
  description_en text NOT NULL,
  before_image_url text NOT NULL,
  after_image_url text NOT NULL,
  category text NOT NULL,
  show_in_facial boolean DEFAULT false,
  show_in_dental boolean DEFAULT false,
  show_in_injection boolean DEFAULT false,
  show_in_body boolean DEFAULT false,
  show_in_hair boolean DEFAULT false,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on detailed_cases
ALTER TABLE detailed_cases ENABLE ROW LEVEL SECURITY;

-- Public can view published detailed cases
CREATE POLICY "Public can view published detailed cases"
  ON detailed_cases
  FOR SELECT
  TO public
  USING (is_published = true);

-- Admins can view all detailed cases
CREATE POLICY "Admins can view all detailed cases"
  ON detailed_cases
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM admins 
      WHERE admins.id = auth.uid() 
      AND admins.is_active = true
    )
  );

-- Admins can insert detailed cases
CREATE POLICY "Admins can insert detailed cases"
  ON detailed_cases
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM admins 
      WHERE admins.id = auth.uid() 
      AND admins.is_active = true
    )
  );

-- Admins can update detailed cases
CREATE POLICY "Admins can update detailed cases"
  ON detailed_cases
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM admins 
      WHERE admins.id = auth.uid() 
      AND admins.is_active = true
    )
  );

-- Admins can delete detailed cases
CREATE POLICY "Admins can delete detailed cases"
  ON detailed_cases
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM admins 
      WHERE admins.id = auth.uid() 
      AND admins.is_active = true
    )
  );

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_detailed_cases_category ON detailed_cases(category);
CREATE INDEX IF NOT EXISTS idx_detailed_cases_published ON detailed_cases(is_published);
CREATE INDEX IF NOT EXISTS idx_detailed_cases_facial ON detailed_cases(show_in_facial) WHERE show_in_facial = true;
CREATE INDEX IF NOT EXISTS idx_detailed_cases_dental ON detailed_cases(show_in_dental) WHERE show_in_dental = true;
CREATE INDEX IF NOT EXISTS idx_detailed_cases_injection ON detailed_cases(show_in_injection) WHERE show_in_injection = true;
CREATE INDEX IF NOT EXISTS idx_detailed_cases_body ON detailed_cases(show_in_body) WHERE show_in_body = true;
CREATE INDEX IF NOT EXISTS idx_detailed_cases_hair ON detailed_cases(show_in_hair) WHERE show_in_hair = true;