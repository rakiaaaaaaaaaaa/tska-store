export type Badge = 'NEW' | 'HOT' | 'SALE' | null;

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  emoji: string;
  description: string;
  badge: Badge;
  inStock: boolean;
  stock: number;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  slug: string;
}

export interface InstagramPost {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
}

export interface CheckoutAddress {
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  customer: CheckoutAddress;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
}
