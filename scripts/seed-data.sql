-- Sample yacht data
INSERT INTO yachts (name, description, capacity, price_per_day, features, images, producer_id, available)
VALUES 
  (
    'Ocean Symphony', 
    'Experience ultimate luxury aboard our 140ft superyacht featuring expansive deck spaces, infinity pool, and state-of-the-art entertainment systems.',
    12,
    15000,
    ARRAY['Infinity Pool', 'Beach Club', 'Cinema Room', 'Helipad', 'Water Sports Equipment'],
    ARRAY['/public/yachts/ocean-symphony-1.jpg'],
    1,
    true
  ),
  (
    'Azure Dream',
    'Modern 100ft yacht perfect for Mediterranean cruising, featuring a spacious sundeck and sophisticated interior design.',
    8,
    8500,
    ARRAY['Jacuzzi', 'BBQ Station', 'Jet Skis', 'Wine Cellar', 'Stabilizers'],
    ARRAY['/public/yachts/azure-dream-1.jpg'],
    1,
    true
  ),
  (
    'Royal Odyssey',
    'Classic 120ft motor yacht combining timeless elegance with modern amenities and exceptional comfort.',
    10,
    12000,
    ARRAY['Master Suite', 'Beach Platform', 'Gym', 'Professional Crew', 'Gourmet Kitchen'],
    ARRAY['/public/yachts/royal-odyssey-1.jpg'],
    1,
    true
  );