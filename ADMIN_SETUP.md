# Admin User Setup Guide

You have two options to set up the admin user:

## Option 1: Using Node.js Script (Recommended)

\`\`\`bash
# Make sure environment variables are set
SUPABASE_URL=your_url SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/setup-admin.js
\`\`\`

**Credentials after setup:**
- Email: `sowparnika@gmail.com`
- Password: `Sajeevan@sowparnika2025`

## Option 2: Manual Setup via Supabase Dashboard

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User" and create:
   - Email: `sowparnika@gmail.com`
   - Password: `Sajeevan@sowparnika2025`
   - Check "Auto confirm user"
3. Click "Create User"
4. Go to SQL Editor and run:
   \`\`\`sql
   UPDATE profiles SET is_admin = true WHERE email = 'sowparnika@gmail.com';
   \`\`\`

## Option 3: Quick Setup (Development Only)

If you just want to test with dummy data without proper auth:

1. Run the seed script in Supabase SQL Editor:
   \`\`\`
   scripts/004_fix_seed_data.sql
   \`\`\`
2. Visit `/admin/login` and use the credentials above

## Testing the Login

After setup:

1. **Test Admin Login:** Visit `/admin/login`
   - Use the credentials above
   - Should redirect to `/admin/dashboard`

2. **Test Regular Auth:** Visit `/auth/login`
   - Use the same credentials
   - Should authenticate via Supabase and redirect to `/dashboard`

## Seeding Dummy Properties

After admin user is created, run:
\`\`\`sql
-- Via Supabase SQL Editor
scripts/004_fix_seed_data.sql
\`\`\`

This will create 12 luxury property listings for demonstration.
