import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { toast } from "sonner";
import { calcCartCount, calcCartTotal } from "../lib/api";
import type { CartItem, Product, Size } from "../types";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, size: Size, quantity?: number) => void;
  removeItem: (productId: string, size: Size) => void;
  updateQuantity: (productId: string, size: Size, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product, size: Size, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === size,
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedSize === size
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { product, quantity, selectedSize: size }];
    });
    toast.success(`${product.name} added to bag`, {
      description: `Size: ${size}`,
    });
  }, []);

  const removeItem = useCallback((productId: string, size: Size) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.selectedSize === size),
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: Size, quantity: number) => {
      if (quantity < 1) {
        setItems((prev) =>
          prev.filter(
            (i) => !(i.product.id === productId && i.selectedSize === size),
          ),
        );
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.selectedSize === size
            ? { ...i, quantity }
            : i,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const isInCart = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total: calcCartTotal(items),
        count: calcCartCount(items),
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
