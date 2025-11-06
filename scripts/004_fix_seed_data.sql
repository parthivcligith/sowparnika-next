-- First, verify the auth.users table has the admin user
-- Note: In production, admin user should be created via Supabase Auth UI or API
-- For now, this script seeds properties with a placeholder that will be updated when admin user exists

-- Wait for admin user to be created via /auth/sign-up before running this
-- Or manually create user in Supabase Auth dashboard

-- Seed dummy properties - will auto-assign to first admin user
INSERT INTO properties (title, location, price, bedrooms, bathrooms, square_feet, description, image_url, user_id, created_at, updated_at)
SELECT
  'Apartment in Muraito, Ticino, Switzerland',
  'Muraito, Ticino, Switzerland',
  2131741.93, -- fixed numeric overflow: scaled down to fit DECIMAL(12,2)
  3,
  2,
  3500,
  'Luxury modern apartment featuring high-end finishes, floor-to-ceiling windows, premium kitchen, and panoramic views of the valley. Perfect for those seeking contemporary elegance in a serene Alpine setting.',
  '/placeholder.svg?height=400&width=600',
  au.id,
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'sowparnika@gmail.com'
LIMIT 1;

-- Repeat for other properties...
INSERT INTO properties (title, location, price, bedrooms, bathrooms, square_feet, description, image_url, user_id, created_at, updated_at)
SELECT
  'House in Mexico City, Mexico',
  'Mexico City, Mexico',
  1666767.37, -- fixed numeric overflow
  5,
  4,
  5200,
  'Stunning villa with colonial architecture, lush gardens, private courtyard, infinity pool, and spectacular city views. Features original art collection and premium outdoor entertaining spaces.',
  '/placeholder.svg?height=400&width=600',
  au.id,
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'sowparnika@gmail.com'
LIMIT 1;

INSERT INTO properties (title, location, price, bedrooms, bathrooms, square_feet, description, image_url, user_id, created_at, updated_at)
SELECT
  'Castle in Umbria, Italy',
  'Umbria, Italy',
  9999999.99, -- capped at max DECIMAL(12,2) value
  12,
  8,
  15000,
  'Historic castle with medieval charm and modern luxuries. Features Renaissance frescoes, wine cellar, spa, helipad, and stunning panoramic views of the Tuscan countryside.',
  '/placeholder.svg?height=400&width=600',
  au.id,
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'sowparnika@gmail.com'
LIMIT 1;

INSERT INTO properties (title, location, price, bedrooms, bathrooms, square_feet, description, image_url, user_id, created_at, updated_at)
SELECT
  'Villa in Bora Bora, Leeward Islands, French Polynesia',
  'Bora Bora, French Polynesia',
  9999999.99, -- capped at max DECIMAL(12,2) value
  6,
  5,
  8000,
  'Overwater bungalow villa with direct lagoon access, private beach, infinity pool overlooking coral reef, and world-class water sports amenities. Ultimate tropical luxury.',
  '/placeholder.svg?height=400&width=600',
  au.id,
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'sowparnika@gmail.com'
LIMIT 1;

INSERT INTO properties (title, location, price, bedrooms, bathrooms, square_feet, description, image_url, user_id, created_at, updated_at)
SELECT
  'Castle in Etretat, Normandy, France',
  'Etretat, Normandy, France',
  1510969.11, -- fixed numeric overflow
  10,
  7,
  12000,
  'Magnificent chateau positioned on dramatic cliffs overlooking the English Channel. Combines Gothic architecture with contemporary design, featuring cinema, library, and wine collection room.',
  '/placeholder.svg?height=400&width=600',
  au.id,
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'sowparnika@gmail.com'
LIMIT 1;

INSERT INTO properties (title, location, price, bedrooms, bathrooms, square_feet, description, image_url, user_id, created_at, updated_at)
SELECT
  'Private Island in Raa Atoll, Maldives',
  'Raa Atoll, Maldives',
  7090737.76, -- fixed numeric overflow
  8,
  6,
  20000,
  'Exclusive private island with pristine beaches, lagoon views, water villas, and comprehensive resort amenities. Ultimate privacy and tropical paradise.',
  '/placeholder.svg?height=400&width=600',
  au.id,
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'sowparnika@gmail.com'
LIMIT 1;

INSERT INTO properties (title, location, price, bedrooms, bathrooms, square_feet, description, image_url, user_id, created_at, updated_at)
SELECT
  'Villa in Maafushi, Kaafu Atoll, Maldives',
  'Kaafu Atoll, Maldives',
  4378530.56, -- fixed numeric overflow
  7,
  5,
  9500,
  'Luxury beachfront villa with infinity pool, private dock, indoor-outdoor living, and exceptional snorkeling directly from your property. Designed for ultimate relaxation.',
  '/placeholder.svg?height=400&width=600',
  au.id,
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'sowparnika@gmail.com'
LIMIT 1;

INSERT INTO properties (title, location, price, bedrooms, bathrooms, square_feet, description, image_url, user_id, created_at, updated_at)
SELECT
  'House in Newport Beach, California, United States',
  'Newport Beach, California, USA',
  3363668.72, -- fixed numeric overflow
  6,
  5,
  7500,
  'Contemporary oceanfront estate with smart home technology, wine cellar, gym, spa, and direct beach access. Premium finishes throughout with world-class views.',
  '/placeholder.svg?height=400&width=600',
  au.id,
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'sowparnika@gmail.com'
LIMIT 1;

INSERT INTO properties (title, location, price, bedrooms, bathrooms, square_feet, description, image_url, user_id, created_at, updated_at)
SELECT
  'Villa in Benahavís, Andalusia, Spain',
  'Benahavís, Andalusia, Spain',
  3716332.38, -- fixed numeric overflow
  7,
  6,
  8800,
  'Modern Mediterranean villa with panoramic views, private spa, cinema, chef kitchen, and manicured gardens. Located in prestigious Marbella Golden Mile community.',
  '/placeholder.svg?height=400&width=600',
  au.id,
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'sowparnika@gmail.com'
LIMIT 1;

INSERT INTO properties (title, location, price, bedrooms, bathrooms, square_feet, description, image_url, user_id, created_at, updated_at)
SELECT
  'Chalet in Gstaad, Vaud, Switzerland',
  'Gstaad, Switzerland',
  4166114.77, -- fixed numeric overflow
  8,
  6,
  11000,
  'Luxury alpine chalet with Swiss heritage charm and contemporary amenities. Features wellness center, theater, wine bar, and stunning mountain views.',
  '/placeholder.svg?height=400&width=600',
  au.id,
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'sowparnika@gmail.com'
LIMIT 1;

-- Update admin profile
UPDATE profiles SET is_admin = true 
WHERE email = 'sowparnika@gmail.com';
