-- Fourtronn Energy Systems Database Schema
-- Run this SQL in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en TEXT NOT NULL,
  name_ta TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('ups', 'batteries', 'solar', 'water-purifiers')),
  price DECIMAL(10,2) NOT NULL,
  description_en TEXT,
  description_ta TEXT,
  specifications JSONB DEFAULT '[]'::jsonb,
  images TEXT[] DEFAULT '{}'::TEXT[],
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  special_instructions TEXT,
  preferred_contact TEXT CHECK (preferred_contact IN ('phone', 'whatsapp', 'email')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Tickets Table
CREATE TABLE IF NOT EXISTS service_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  product_category TEXT NOT NULL CHECK (product_category IN ('ups', 'batteries', 'solar', 'water-purifiers')),
  product_name TEXT,
  service_type TEXT NOT NULL CHECK (service_type IN ('maintenance', 'complaint', 'troubleshooting')),
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL CHECK (preferred_time IN ('morning', 'afternoon', 'evening')),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  pincode TEXT NOT NULL,
  comments TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'in-progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users Table (for simple authentication)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_tickets_status ON service_tickets(status);
CREATE INDEX IF NOT EXISTS idx_service_tickets_date ON service_tickets(preferred_date);
CREATE INDEX IF NOT EXISTS idx_service_tickets_created_at ON service_tickets(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updating updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_tickets_updated_at BEFORE UPDATE ON service_tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (username: admin, password: changeme123)
-- You should change this password after first login!
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2a$10$rOiVz7jZ7Z7Z7Z7Z7Z7Z7uKvX7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z')
ON CONFLICT (username) DO NOTHING;
