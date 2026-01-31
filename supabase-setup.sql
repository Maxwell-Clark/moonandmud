-- Supabase Setup for Moon & Mud Pottery Admin Portal
-- Run this in the Supabase SQL Editor

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT DEFAULT '',
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Create index on featured for homepage query
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public can read products" ON products
  FOR SELECT USING (true);

-- Create policy for authenticated insert/update/delete (using service key bypasses RLS)
-- Note: The admin portal uses the service role key which bypasses RLS

-- Create storage bucket for product images
-- Note: This needs to be done through the Supabase Dashboard:
-- 1. Go to Storage in the sidebar
-- 2. Create a new bucket called "product-images"
-- 3. Set it to Public
-- 4. The bucket policy should allow public read access

-- Optional: Insert sample data (the existing static products)
-- Uncomment and run this section if you want to migrate existing products

/*
INSERT INTO products (id, name, slug, price, category, description, images, featured, in_stock)
VALUES
  ('mug-001', 'Crescent Moon Mug', 'crescent-moon-mug', 38.00, 'mugs', 'A beautifully crafted mug featuring a delicate crescent moon design. The warm honey glaze catches the light, making your morning coffee feel like a ritual. Holds 12oz comfortably. Dishwasher and microwave safe.', ARRAY['/images/products/mug-001.jpg'], true, true),
  ('mug-002', 'Speckled Earth Mug', 'speckled-earth-mug', 34.00, 'mugs', 'Inspired by rich soil after rain, this mug features a gorgeous speckled brown glaze. The comfortable handle and 14oz capacity make it perfect for those who love a generous cup of tea or coffee.', ARRAY['/images/products/mug-002.jpg'], false, true),
  ('mug-003', 'Honey Drip Mug', 'honey-drip-mug', 42.00, 'mugs', 'Watch the warm honey-colored glaze drip down the sides of this artisan mug. Each piece is unique with its own drip pattern. A true conversation starter for your kitchen.', ARRAY['/images/products/mug-003.jpg'], true, true),
  ('bowl-001', 'Moonlit Serving Bowl', 'moonlit-serving-bowl', 65.00, 'bowls', 'A stunning large serving bowl with a creamy white interior and earth-toned exterior. Perfect for salads, pasta, or as a centerpiece. 10 inches in diameter.', ARRAY['/images/products/bowl-001.jpg'], true, true),
  ('bowl-002', 'Nesting Bowl Set', 'nesting-bowl-set', 85.00, 'bowls', 'A set of three nesting bowls in graduating sizes. Each bowl features our signature honey glaze with subtle variations. Perfect for prep work or serving.', ARRAY['/images/products/bowl-002.jpg'], false, true),
  ('bowl-003', 'Ramen Bowl', 'ramen-bowl', 48.00, 'bowls', 'Deep and generous, this ramen bowl is perfect for noodles, pho, or hearty soups. The wide rim allows for easy handling and the earth-tone glaze adds warmth to every meal.', ARRAY['/images/products/bowl-003.jpg'], false, true),
  ('vase-001', 'Lunar Bud Vase', 'lunar-bud-vase', 32.00, 'vases', 'A petite bud vase perfect for a single stem or small bouquet. The pale moon-white glaze with subtle grey undertones complements any flower arrangement.', ARRAY['/images/products/vase-001.jpg'], false, true),
  ('vase-002', 'Terra Tall Vase', 'terra-tall-vase', 78.00, 'vases', 'An elegant tall vase with a rich terracotta-inspired glaze. Standing at 12 inches, it is perfect for long-stemmed flowers or dried arrangements.', ARRAY['/images/products/vase-002.jpg'], true, true),
  ('vase-003', 'Organic Form Vase', 'organic-form-vase', 95.00, 'vases', 'An artistic vase with an intentionally imperfect, organic form. Each piece is entirely unique, celebrating the handmade nature of pottery.', ARRAY['/images/products/vase-003.jpg'], false, false),
  ('plate-001', 'Dinner Plate - Honey', 'dinner-plate-honey', 36.00, 'plates', 'A 10.5 inch dinner plate with our signature honey glaze. The slightly raised rim keeps sauces contained while the warm color makes every meal feel special.', ARRAY['/images/products/plate-001.jpg'], false, true),
  ('plate-002', 'Dinner Plate - Moon', 'dinner-plate-moon', 36.00, 'plates', 'A 10.5 inch dinner plate in our creamy moon-white glaze. Elegant and versatile, it pairs beautifully with any table setting.', ARRAY['/images/products/plate-002.jpg'], false, true),
  ('plate-003', 'Appetizer Plate Set', 'appetizer-plate-set', 52.00, 'plates', 'A set of four 6-inch appetizer plates, perfect for small bites, desserts, or bread service. Mixed glazes in honey and moon-white.', ARRAY['/images/products/plate-003.jpg'], false, true),
  ('planter-001', 'Moon Phase Planter', 'moon-phase-planter', 55.00, 'planters', 'A medium-sized planter featuring hand-carved moon phases around the exterior. Includes drainage hole and matching saucer. Perfect for small houseplants.', ARRAY['/images/products/planter-001.jpg'], true, true),
  ('planter-002', 'Hanging Planter', 'hanging-planter', 68.00, 'planters', 'A beautiful hanging planter with macramé-style rope hanger included. The earthy brown glaze and 6-inch pot size make it ideal for trailing plants.', ARRAY['/images/products/planter-002.jpg'], false, true),
  ('planter-003', 'Succulent Trio Set', 'succulent-trio-set', 45.00, 'planters', 'Three tiny planters perfect for succulents or air plants. Each measures 3 inches and comes with a small drainage hole. A lovely gift set.', ARRAY['/images/products/planter-003.jpg'], false, true),
  ('decor-001', 'Incense Holder', 'incense-holder', 24.00, 'decorative', 'A simple, elegant incense holder with a moon-shaped catch tray. The smooth honey glaze is easy to clean and looks beautiful on any altar or shelf.', ARRAY['/images/products/decor-001.jpg'], false, true),
  ('decor-002', 'Ring Dish', 'ring-dish', 22.00, 'decorative', 'A small dish perfect for rings, earrings, or other small treasures. Features a crescent moon impression in the center and a pale moon-white glaze.', ARRAY['/images/products/decor-002.jpg'], false, true),
  ('decor-003', 'Soap Dish', 'soap-dish', 28.00, 'decorative', 'An elevated soap dish with drainage ridges to keep your soap dry. The warm earth tones bring a spa-like feel to your bathroom.', ARRAY['/images/products/decor-003.jpg'], false, true);
*/
