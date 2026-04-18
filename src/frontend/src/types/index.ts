export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  images: string[];
  description: string;
  sizes: Size[];
  stock: number;
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
}

export type ProductCategory =
  | "new-arrivals"
  | "dresses"
  | "blazers"
  | "accessories"
  | "bags"
  | "tops"
  | "bottoms";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: Size;
}

export interface WishlistItem {
  product: Product;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  address: ShippingAddress;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
}
