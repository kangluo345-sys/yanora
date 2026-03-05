/*
  # Create automatic profile creation trigger

  1. Changes
    - Add trigger to automatically create profile when user signs up
    - Profile will be created with user's email from auth.users
  
  2. Notes
    - This ensures every registered user automatically gets a profile
    - Simplifies the registration process
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
