// API utility: wraps backend actor calls with proper error handling
// The backend.d.ts is minimal, so most data is served from sampleData
// This file provides the abstraction layer for future backend integration

import type { CartItem, Order, Product, ShippingAddress } from "../types";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function calcCartTotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
}

export function calcCartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function generateOrderId(): string {
  return `SRA-${Date.now().toString(36).toUpperCase()}`;
}

export function createMockOrder(
  items: CartItem[],
  address: ShippingAddress,
): Order {
  return {
    id: generateOrderId(),
    items,
    total: calcCartTotal(items),
    status: "pending",
    createdAt: Date.now(),
    address,
  };
}

export function getRelatedProducts(
  product: Product,
  allProducts: Product[],
): Product[] {
  return allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
}
