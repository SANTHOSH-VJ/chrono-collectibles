-- ============================================
-- SEED DATA FOR CHRONO COLLECTIBLES
-- Run this after creating the main schema
-- ============================================

-- Insert sample products (migrated from mock data)
INSERT INTO products (
  name, slug, category_id, description, price, stock_quantity, 
  condition, year, country, rarity_level, certification_details, is_active
) VALUES
  (
    '1909-S VDB Lincoln Penny',
    '1909-s-vdb-lincoln-penny',
    1, -- Old Coins category
    'One of the most sought-after coins in American numismatics. The 1909-S VDB Lincoln cent was produced in limited quantities at the San Francisco Mint. Features Victor David Brenner''s initials on the reverse, which were removed after public controversy. A true cornerstone of any serious coin collection.',
    1450.00,
    2,
    'Very Good',
    1909,
    'United States',
    'Extremely Rare',
    'PCGS Certified VG-10',
    true
  ),
  (
    '1896 $5 Silver Certificate',
    '1896-5-silver-certificate',
    2, -- Paper Currency category
    'Known as the ''Educational Series,'' this stunning note features an allegorical design depicting Electricity as the dominant force in the world. Widely considered one of the most beautiful pieces of American paper currency ever produced.',
    2800.00,
    1,
    'Fine',
    1896,
    'United States',
    'Very Rare',
    'PMG Certified Fine-15',
    true
  ),
  (
    '1921 Morgan Silver Dollar',
    '1921-morgan-silver-dollar',
    1,
    'The final year of the Morgan Dollar series. Struck at the Philadelphia Mint, this coin features the iconic Lady Liberty design by George T. Morgan. An excellent example with strong luster and detail.',
    85.00,
    15,
    'Excellent',
    1921,
    'United States',
    'Common',
    null,
    true
  ),
  (
    '1923 Peace Silver Dollar',
    '1923-peace-silver-dollar',
    1,
    'Designed by Anthony de Francisci, the Peace Dollar commemorates the peace following World War I. This 1923 example shows Liberty in profile with flowing hair and a radiant crown.',
    65.00,
    20,
    'Very Good',
    1923,
    'United States',
    'Common',
    null,
    true
  ),
  (
    '1928 $100 Gold Certificate',
    '1928-100-gold-certificate',
    2,
    'A rare gold certificate featuring Benjamin Franklin. These notes were once redeemable for gold coin and represent an important era in American monetary history.',
    5200.00,
    1,
    'Very Good',
    1928,
    'United States',
    'Extremely Rare',
    'PMG Certified VG-20',
    true
  ),
  (
    '1889 British Gold Sovereign',
    '1889-british-gold-sovereign',
    1,
    'A Victorian-era gold sovereign featuring the Jubilee Head portrait of Queen Victoria. Struck at the Royal Mint in London, this coin contains 0.2354 troy ounces of pure gold.',
    620.00,
    5,
    'Excellent',
    1889,
    'United Kingdom',
    'Uncommon',
    null,
    true
  ),
  (
    '1935 $1 Silver Certificate',
    '1935-1-silver-certificate',
    2,
    'A classic blue-seal silver certificate featuring George Washington. These notes circulated widely and are a staple of American paper currency collecting.',
    25.00,
    50,
    'Good',
    1935,
    'United States',
    'Common',
    null,
    true
  ),
  (
    '1893-S Morgan Silver Dollar',
    '1893-s-morgan-silver-dollar',
    1,
    'The key date of the Morgan Dollar series with only 100,000 minted. This coin is the holy grail for Morgan Dollar collectors and commands strong premiums in any grade.',
    4800.00,
    1,
    'Good',
    1893,
    'United States',
    'Extremely Rare',
    'PCGS Certified G-6',
    true
  ),
  (
    '1864 Two Cent Piece',
    '1864-two-cent-piece',
    1,
    'The first US coin to bear the motto ''IN GOD WE TRUST.'' This Civil War-era coin features a shield design and was produced for only a short period, making it a fascinating historical artifact.',
    180.00,
    8,
    'Fine',
    1864,
    'United States',
    'Uncommon',
    null,
    true
  ),
  (
    '1917 $1 Legal Tender Note',
    '1917-1-legal-tender-note',
    2,
    'A striking red-seal note from the World War I era. Features George Washington and Columbia, the female personification of the United States. Beautiful large-size note format.',
    350.00,
    3,
    'Very Good',
    1917,
    'United States',
    'Rare',
    null,
    true
  ),
  (
    '1907 Saint-Gaudens Double Eagle',
    '1907-saint-gaudens-double-eagle',
    1,
    'Often called the most beautiful US coin ever made. Designed by Augustus Saint-Gaudens at the request of President Theodore Roosevelt, this $20 gold piece features a striding Liberty on the obverse.',
    3200.00,
    2,
    'Excellent',
    1907,
    'United States',
    'Very Rare',
    'NGC Certified MS-63',
    true
  ),
  (
    '1863 Confederate $50 Note',
    '1863-confederate-50-note',
    2,
    'A genuine Confederate States of America banknote from the Civil War era. Features Jefferson Davis and intricate engraving typical of Southern currency. A remarkable piece of American history.',
    950.00,
    2,
    'Fine',
    1863,
    'United States',
    'Rare',
    null,
    true
  );

-- Insert placeholder product images
-- Note: You'll need to upload actual images to Supabase Storage and update these URLs
INSERT INTO product_images (product_id, image_url, display_order) VALUES
  (1, '/placeholder.svg', 0),
  (2, '/placeholder.svg', 0),
  (3, '/placeholder.svg', 0),
  (4, '/placeholder.svg', 0),
  (5, '/placeholder.svg', 0),
  (6, '/placeholder.svg', 0),
  (7, '/placeholder.svg', 0),
  (8, '/placeholder.svg', 0),
  (9, '/placeholder.svg', 0),
  (10, '/placeholder.svg', 0),
  (11, '/placeholder.svg', 0),
  (12, '/placeholder.svg', 0);

-- Create a test admin user
-- Note: You'll need to create this user through Supabase Auth UI first,
-- then update their profile to admin role using their user ID

-- Example: After creating user admin@chronocollectibles.com in Supabase Auth:
-- UPDATE profiles SET role = 'admin' WHERE email = 'admin@chronocollectibles.com';

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check products
SELECT COUNT(*) as total_products FROM products;

-- Check categories
SELECT * FROM categories;

-- Check product images
SELECT COUNT(*) as total_images FROM product_images;

-- Verify RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('products', 'orders', 'profiles');
