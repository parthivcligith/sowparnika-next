-- SQL-based admin setup (alternative to running Node.js script)
-- This script creates the admin profile assuming the user already exists in auth.users
-- The profile will be linked to the actual auth user via the email lookup

-- Get the actual user ID from auth.users and create/update their profile
-- This approach avoids the foreign key constraint violation by using an actual user ID
INSERT INTO public.profiles (id, email, is_admin, created_at, updated_at)
SELECT id, email, true, NOW(), NOW()
FROM auth.users
WHERE email = 'sowparnika@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  is_admin = true,
  updated_at = NOW();
