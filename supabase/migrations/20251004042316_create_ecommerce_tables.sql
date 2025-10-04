/*
  # E-commerce Tables - Products, Cart, and Orders
  
  ## Overview
  Complete e-commerce schema for product management, shopping cart functionality,
  and order processing for Prasad and Sons shop.

  ## New Tables
  
  ### categories
  - `id` (uuid, PK) - Category ID
  - `name` (text) - Category name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `parent_id` (uuid, FK self-reference) - Parent category for hierarchy
  - `image_url` (text) - Category image
  - `is_active` (boolean) - Category visibility
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### products
  - `id` (uuid, PK) - Product ID
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Product description
  - `price` (numeric) - Current selling price
  - `compare_at_price` (numeric) - Original/compare price (for discounts)
  - `sku` (text, unique) - Stock keeping unit
  - `stock_quantity` (integer) - Available stock
  - `category_id` (uuid, FK to categories) - Product category
  - `images` (jsonb) - Array of image URLs
  - `specifications` (jsonb) - Product specs as key-value pairs
  - `is_featured` (boolean) - Featured product flag
  - `is_active` (boolean) - Product visibility flag
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### addresses
  - `id` (uuid, PK) - Address ID
  - `user_id` (uuid, FK to profiles) - Owner of address
  - `label` (text) - Address label (e.g., 'Home', 'Office')
  - `full_name` (text) - Recipient name
  - `phone` (text) - Contact phone
  - `street` (text) - Street address
  - `city` (text) - City name
  - `state` (text) - State/province
  - `postal_code` (text) - Postal/ZIP code
  - `country` (text) - Country name
  - `is_default` (boolean) - Default shipping address flag
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### cart_items
  - `id` (uuid, PK) - Cart item ID
  - `user_id` (uuid, FK to profiles) - Cart owner
  - `product_id` (uuid, FK to products) - Product in cart
  - `quantity` (integer) - Item quantity
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### orders
  - `id` (uuid, PK) - Order ID
  - `user_id` (uuid, FK to profiles) - Customer
  - `order_number` (text, unique) - Human-readable order number
  - `status` (text) - Order status
  - `subtotal` (numeric) - Items subtotal
  - `tax` (numeric) - Tax amount
  - `shipping_cost` (numeric) - Shipping fee
  - `total` (numeric) - Total amount
  - `shipping_address_id` (uuid, FK to addresses) - Delivery address
  - `shipping_address_snapshot` (jsonb) - Address at order time
  - `payment_method` (text) - Payment method used
  - `payment_status` (text) - Payment status
  - `notes` (text) - Order notes
  - `created_at` (timestamptz) - Order creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### order_items
  - `id` (uuid, PK) - Order item ID
  - `order_id` (uuid, FK to orders) - Parent order
  - `product_id` (uuid, FK to products) - Product ordered
  - `product_snapshot` (jsonb) - Product details at order time
  - `quantity` (integer) - Item quantity
  - `price_at_purchase` (numeric) - Price at time of order
  - `subtotal` (numeric) - Line item total

  ## Security
  - RLS enabled on all tables
  - Users can only access their own cart and orders
  - Public read access for active products and categories
  - Admins have full management permissions

  ## Performance
  - Indexes on frequently queried columns
  - Full-text search on product names and descriptions
  - Optimized for product catalog browsing
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Admins can view all categories"
  ON categories FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  compare_at_price numeric(10, 2) CHECK (compare_at_price >= 0),
  sku text UNIQUE NOT NULL,
  stock_quantity integer NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  images jsonb DEFAULT '[]'::jsonb,
  specifications jsonb DEFAULT '{}'::jsonb,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Admins can view all products"
  ON products FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  label text NOT NULL DEFAULT 'Home',
  full_name text NOT NULL,
  phone text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'India',
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses"
  ON addresses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON addresses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON addresses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  order_number text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric(10, 2) NOT NULL CHECK (subtotal >= 0),
  tax numeric(10, 2) NOT NULL DEFAULT 0 CHECK (tax >= 0),
  shipping_cost numeric(10, 2) NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
  total numeric(10, 2) NOT NULL CHECK (total >= 0),
  shipping_address_id uuid REFERENCES addresses(id) ON DELETE SET NULL,
  shipping_address_snapshot jsonb NOT NULL,
  payment_method text NOT NULL DEFAULT 'pending',
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  product_snapshot jsonb NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price_at_purchase numeric(10, 2) NOT NULL CHECK (price_at_purchase >= 0),
  subtotal numeric(10, 2) NOT NULL CHECK (subtotal >= 0)
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert order items for own orders"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_quantity);
CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON products USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_description_trgm ON products USING gin(description gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_addresses_is_default ON addresses(is_default);

CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Create triggers for updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_categories_updated_at'
  ) THEN
    CREATE TRIGGER update_categories_updated_at 
      BEFORE UPDATE ON categories
      FOR EACH ROW 
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_products_updated_at'
  ) THEN
    CREATE TRIGGER update_products_updated_at 
      BEFORE UPDATE ON products
      FOR EACH ROW 
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_addresses_updated_at'
  ) THEN
    CREATE TRIGGER update_addresses_updated_at 
      BEFORE UPDATE ON addresses
      FOR EACH ROW 
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_cart_items_updated_at'
  ) THEN
    CREATE TRIGGER update_cart_items_updated_at 
      BEFORE UPDATE ON cart_items
      FOR EACH ROW 
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_orders_updated_at'
  ) THEN
    CREATE TRIGGER update_orders_updated_at 
      BEFORE UPDATE ON orders
      FOR EACH ROW 
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  new_order_number text;
  order_count integer;
BEGIN
  SELECT COUNT(*) INTO order_count FROM orders WHERE created_at::date = CURRENT_DATE;
  new_order_number := 'PS-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD((order_count + 1)::text, 4, '0');
  RETURN new_order_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check and decrease stock
CREATE OR REPLACE FUNCTION check_and_decrease_stock(
  p_product_id uuid,
  p_quantity integer
)
RETURNS boolean AS $$
DECLARE
  current_stock integer;
BEGIN
  SELECT stock_quantity INTO current_stock
  FROM products
  WHERE id = p_product_id
  FOR UPDATE;
  
  IF current_stock >= p_quantity THEN
    UPDATE products
    SET stock_quantity = stock_quantity - p_quantity
    WHERE id = p_product_id;
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert sample categories
INSERT INTO categories (name, slug, description, is_active) VALUES
  ('Electronics', 'electronics', 'Electronic devices and accessories', true),
  ('Clothing', 'clothing', 'Apparel and fashion items', true),
  ('Home & Kitchen', 'home-kitchen', 'Home appliances and kitchenware', true),
  ('Books', 'books', 'Books and publications', true),
  ('Sports & Outdoors', 'sports-outdoors', 'Sports equipment and outdoor gear', true)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, description, price, compare_at_price, sku, stock_quantity, category_id, images, specifications, is_featured, is_active)
SELECT 
  'Wireless Bluetooth Headphones',
  'wireless-bluetooth-headphones',
  'High-quality wireless headphones with noise cancellation and 30-hour battery life',
  2999.00,
  3999.00,
  'WBH-001',
  50,
  (SELECT id FROM categories WHERE slug = 'electronics' LIMIT 1),
  '["https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"]'::jsonb,
  '{"Battery Life": "30 hours", "Connectivity": "Bluetooth 5.0", "Noise Cancellation": "Active"}'::jsonb,
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE sku = 'WBH-001');

INSERT INTO products (name, slug, description, price, compare_at_price, sku, stock_quantity, category_id, images, is_featured, is_active)
SELECT 
  'Cotton T-Shirt',
  'cotton-t-shirt',
  'Comfortable 100% cotton t-shirt available in multiple colors',
  499.00,
  NULL,
  'CTS-001',
  100,
  (SELECT id FROM categories WHERE slug = 'clothing' LIMIT 1),
  '["https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg"]'::jsonb,
  false,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE sku = 'CTS-001');

INSERT INTO products (name, slug, description, price, sku, stock_quantity, category_id, images, is_featured, is_active)
SELECT 
  'Stainless Steel Water Bottle',
  'stainless-steel-water-bottle',
  'Insulated water bottle keeps drinks cold for 24 hours',
  799.00,
  'SSWB-001',
  75,
  (SELECT id FROM categories WHERE slug = 'home-kitchen' LIMIT 1),
  '["https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg"]'::jsonb,
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM products WHERE sku = 'SSWB-001');
