// Type definitions for Fourtronn Energy Systems

export interface Product {
  id: string;
  name_en: string;
  name_ta: string;
  category: ProductCategory;
  price: number;
  description_en: string;
  description_ta: string;
  specifications: Specification[];
  images: string[];
  inStock: boolean;
  featured: boolean;
  createdAt: string;
}

export interface Specification {
  key_en: string;
  key_ta: string;
  value_en: string;
  value_ta: string;
}

export type ProductCategory = 'ups' | 'batteries' | 'solar' | 'water-purifiers';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  specialInstructions?: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Category {
  id: ProductCategory;
  name_en: string;
  name_ta: string;
  icon: string;
  description_en: string;
  description_ta: string;
}
