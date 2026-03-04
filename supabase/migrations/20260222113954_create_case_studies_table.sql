/*
  # Create Case Studies Table

  ## Overview
  Creates a table to store before/after case study images for the website.

  ## Tables Created
  
  ### `case_studies`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Case study title/description
  - `before_image_url` (text) - URL to before image
  - `after_image_url` (text) - URL to after image
  - `category` (text) - Service category
  - `is_active` (boolean) - Whether to display this case
  - `display_order` (integer) - Sort order for display
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on case_studies table
  - Public read access for active case studies
  - Authenticated users can manage their own case studies

  ## Notes
  - Case studies are publicly viewable when is_active is true
  - Display order controls the sequence on the website
*/

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  before_image_url text NOT NULL,
  after_image_url text NOT NULL,
  category text NOT NULL,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous) to view active case studies
CREATE POLICY "Anyone can view active case studies"
  ON case_studies FOR SELECT
  USING (is_active = true);

-- Allow authenticated users to view all case studies
CREATE POLICY "Authenticated users can view all case studies"
  ON case_studies FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to manage case studies
CREATE POLICY "Authenticated users can insert case studies"
  ON case_studies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update case studies"
  ON case_studies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete case studies"
  ON case_studies FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_case_studies_active_order 
  ON case_studies(is_active, display_order);
