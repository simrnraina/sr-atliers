import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { toast } from "sonner";
import type { Product, WishlistItem } from "../types";

interface WishlistContextValue {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggle: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.product.id === product.id)) return prev;
      return [...prev, { product }];
    });
    toast.success(`${product.name} saved to wishlist`);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const toggle = useCallback(
    (product: Product) => {
      const wishlisted = items.some((i) => i.product.id === product.id);
      if (wishlisted) {
        removeItem(product.id);
        toast("Removed from wishlist");
      } else {
        addItem(product);
      }
    },
    [items, addItem, removeItem],
  );

  const isWishlisted = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items],
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggle,
        isWishlisted,
        count: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
