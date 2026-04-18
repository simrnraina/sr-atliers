import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../lib/api";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 1 }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const defaultSize = product.sizes[0] ?? "M";

  return (
    <div className="group relative" data-ocid={`product.item.${index}`}>
      {/* Image container */}
      <Link to="/products/$id" params={{ id: product.id }}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-4 cursor-pointer">
          <img
            src={product.images[0] ?? "/assets/images/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge className="bg-accent text-accent-foreground border-transparent text-[10px] uppercase tracking-wider">
                New
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge
                variant="outline"
                className="text-accent border-accent/40 text-[10px] uppercase tracking-wider"
              >
                Best Seller
              </Badge>
            )}
            {product.originalPrice && (
              <Badge
                variant="destructive"
                className="text-[10px] uppercase tracking-wider"
              >
                Sale
              </Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            type="button"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            data-ocid={`product.wishlist.${index}`}
            onClick={(e) => {
              e.preventDefault();
              toggle(product);
            }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full glassmorphism transition-smooth hover:scale-110"
          >
            <Heart
              size={15}
              className={cn(
                wishlisted
                  ? "fill-accent text-accent"
                  : "text-foreground/70 hover:text-accent",
              )}
            />
          </button>

          {/* Quick add to cart — appears on hover */}
          {product.sizes.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-all duration-300">
              <Button
                variant="default"
                size="sm"
                data-ocid={`product.add_button.${index}`}
                className="w-full rounded-none rounded-b-sm text-xs tracking-widest uppercase bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product, defaultSize);
                }}
              >
                {inCart ? (
                  <>
                    <ShoppingBag size={12} /> In Bag
                  </>
                ) : (
                  "Quick Add"
                )}
              </Button>
            </div>
          )}
        </div>
      </Link>

      {/* Product info */}
      <div className="px-0.5">
        <Link
          to="/products/$id"
          params={{ id: product.id }}
          data-ocid={`product.link.${index}`}
          className="block"
        >
          <h3 className="font-display text-sm tracking-wide text-foreground uppercase hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="font-body text-sm text-accent font-medium"
            data-ocid={`product.price.${index}`}
          >
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
