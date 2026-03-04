/*
  # Add Display Fields to Case Studies Table

  1. Changes
    - Add description field for case study details
    - Add duration field for recovery time information
    - Add features field as JSON array for key improvements list

  2. Notes
    - All fields are optional to maintain backward compatibility
    - Features stored as JSONB for flexible querying
*/

-- Add description field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'description'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN description text DEFAULT '';
  END IF;
END $$;

-- Add duration field
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'duration'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN duration text DEFAULT '';
  END IF;
END $$;

-- Add features field as JSONB array
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_studies' AND column_name = 'features'
  ) THEN
    ALTER TABLE case_studies ADD COLUMN features jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;