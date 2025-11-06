# Real Estate Listings Website - Setup Guide

## Quick Start

### Step 1: Run Database Setup Scripts
Run the SQL scripts in this order in your Supabase SQL editor:

1. **scripts/001_create_schema.sql** - Creates tables (properties, favorites, profiles)
2. **scripts/002_profile_trigger.sql** - Sets up automatic profile creation
3. **scripts/004_fix_seed_data.sql** - Seeds dummy property data (if admin exists)

### Step 2: Create Admin User (Choose One Method)

#### Method A: Using Supabase Admin API (Recommended)
\`\`\`bash
# Install dependencies if needed
npm install

# Run the setup script
npx ts-node scripts/setup-admin.ts
\`\`\`

This will:
- Create admin user: `sowparnika@gmail.com`
- Password: `Sajeevan@sowparnika2025`
- Automatically set `is_admin = true` in profiles
- Ready for property creation

#### Method B: Manual Signup
1. Go to `/auth/sign-up`
2. Create account with email: `sowparnika@gmail.com`
3. Set password: `Sajeevan@sowparnika2025`
4. Manually update the profile in Supabase to set `is_admin = true`

### Step 3: Seed Dummy Data
After admin user is created:

\`\`\`bash
# In Supabase SQL Editor, run:
# scripts/004_fix_seed_data.sql
\`\`\`

Or use the Admin Dashboard:
1. Go to `/admin/login`
2. Login with credentials above
3. Click "Add Property" tab
4. Add properties manually

### Step 4: Test the Application

**Home Page (Public)**
- URL: `/`
- View featured listings, trending properties, popular searches
- Click on any property to view details
- Heart icon requires login

**Login (Regular Users)**
- URL: `/auth/login`
- Uses Supabase authentication
- Test with: `sowparnika@gmail.com` / `Sajeevan@sowparnika2025`

**Admin Panel (Property Management)**
- URL: `/admin/login`
- Uses simple localStorage authentication (no Supabase auth required)
- Credentials: `sowparnika@gmail.com` / `Sajeevan@sowparnika2025`
- Add/edit/delete properties

**User Dashboard**
- URL: `/dashboard` (after login)
- View saved favorites
- View profile

## Environment Variables

Required Supabase environment variables (should be auto-configured):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (for setup-admin.ts)
- `SUPABASE_URL`

## Troubleshooting

### Admin setup script fails
- Check if `SUPABASE_SERVICE_ROLE_KEY` is set in Vars section
- Ensure Supabase integration is connected

### Seed data script fails
- Verify admin user exists in Supabase Auth
- Check user email is exactly `sowparnika@gmail.com`
- Ensure schema tables exist (run 001_create_schema.sql first)

### Login page not working
- Clear browser localStorage: `localStorage.clear()`
- Check Supabase credentials in Vars section
- Ensure email is confirmed in Supabase Auth

### Admin dashboard won't load
- Credentials are hardcoded in localStorage
- No Supabase auth needed for admin panel
- Just use `/admin/login` with provided credentials
