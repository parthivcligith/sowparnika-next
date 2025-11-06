-- Removed invalid session setting and simplified the seed script

WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'sowparnika@gmail.com' LIMIT 1
)
INSERT INTO public.properties (
  title, 
  description, 
  price, 
  location, 
  bedrooms, 
  bathrooms, 
  square_feet, 
  image_url, 
  user_id
)
SELECT
  data.title,
  data.description,
  data.price,
  data.location,
  data.bedrooms,
  data.bathrooms,
  data.square_feet,
  data.image_url,
  admin_user.id
FROM admin_user,
  (VALUES
    (
      'Luxury Apartment in Muralto',
      'Modern apartment with stunning city views, heated pool and concierge service',
      213174193,
      'Muralto, Ticino, Switzerland',
      3,
      2,
      2500,
      '/modern-apartment-interior-with-dining-area.jpg'
    ),
    (
      'Colonial Villa in Mexico City',
      'Historic Spanish colonial mansion with fountain courtyard and mature gardens',
      166676737,
      'Mexico City, Mexico',
      5,
      4,
      8000,
      '/colonial-villa-exterior-with-courtyard.jpg'
    ),
    (
      'Castle in Umbria',
      'Ancient castle with panoramic countryside views, medieval tower and vineyards',
      1272216571,
      'Umbria, Italy',
      8,
      6,
      15000,
      '/italian-castle-with-rolling-hills.jpg'
    ),
    (
      'Overwater Bungalow Resort',
      'Luxury tropical resort with private overwater bungalows and pristine beaches',
      3456734658,
      'Leeward Islands, French Polynesia',
      12,
      8,
      20000,
      '/overwater-bungalow-tropical-resort.jpg'
    ),
    (
      'Cliffside Castle',
      'Medieval castle perched on cliffs overlooking the English Channel with panoramic views',
      151096911,
      'Normandy, France',
      10,
      7,
      18000,
      '/french-castle-cliffside-normandy.jpg'
    ),
    (
      'Private Island - Maldives',
      'Exclusive private island with white sand beaches, crystal clear waters and luxury amenities',
      709073776,
      'Maldives',
      6,
      4,
      12000,
      '/private-island-aerial-maldives-turquoise.jpg'
    ),
    (
      'Modern Villa Newport Beach',
      'Contemporary architectural masterpiece with ocean views, smart home tech and infinity pool',
      371633238,
      'Newport Beach, California, USA',
      5,
      5,
      7500,
      '/modern-white-house-newport-beach-california.jpg'
    ),
    (
      'Luxury Beach Resort - Bora Bora',
      'All-inclusive beachfront resort with overwater villas and pristine white sand',
      416611477,
      'Bora Bora, French Polynesia',
      20,
      15,
      35000,
      '/overwater-bungalow-tropical-resort.jpg'
    )
  ) AS data(title, description, price, location, bedrooms, bathrooms, square_feet, image_url);
