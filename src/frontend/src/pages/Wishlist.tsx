import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../lib/api";
import type { Product } from "../types";

function WishlistCard({ product, index }: { product: Product; index: number }) {
  const { removeItem } = useWishlist();
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const defaultSize = product.sizes[0] ?? "M";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group relative"
      data-ocid={`wishlist.item.${index}`}
    >
      {/* Remove button overlay */}
      <button
        type="button"
        aria-label={`Remove ${product.name} from wishlist`}
        data-ocid={`wishlist.remove_button.${index}`}
        onClick={() => removeItem(product.id)}
        className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full glassmorphism opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-destructive/20"
      >
        <X size={14} className="text-foreground/80" />
      </button>

      {/* Image */}
      <Link to="/products/$id" params={{ id: product.id }}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-4 cursor-pointer">
          <img
            src={product.images[0] ?? "/assets/images/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/8 transition-all duration-300" />

          {/* Add to Cart CTA — reveals on hover */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-all duration-300">
            <Button
              size="sm"
              data-ocid={`wishlist.add_to_cart.${index}`}
              className="w-full rounded-none rounded-b-sm text-[10px] tracking-widest uppercase bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={(e) => {
                e.preventDefault();
                addItem(product, defaultSize);
              }}
            >
              {inCart ? "Added to Bag ✓" : "Add to Bag"}
            </Button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="px-0.5">
        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="font-display text-sm uppercase tracking-wide text-foreground hover:text-accent transition-colors line-clamp-1 block"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-body text-sm text-accent font-medium">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Wishlist() {
  const { items, count } = useWishlist();

  if (count === 0) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
        data-ocid="wishlist.empty_state"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <Heart size={52} className="text-muted-foreground mb-6" />
          <h1 className="font-display text-3xl uppercase tracking-wide mb-3">
            Your Wishlist is Empty
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-8 max-w-xs leading-relaxed">
            Save the pieces you love and revisit them whenever inspiration
            strikes.
          </p>
          <Link to="/products" data-ocid="wishlist.browse_button">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs"
            >
              Browse Collection
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" data-ocid="wishlist.page">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-baseline justify-between">
            <h1 className="font-display text-3xl lg:text-4xl uppercase tracking-wide">
              Wishlist
              <span className="text-muted-foreground font-body text-base normal-case tracking-normal ml-3">
                ({count} {count === 1 ? "piece" : "pieces"})
              </span>
            </h1>
            <Link
              to="/products"
              className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Browse More
            </Link>
          </div>
          <p className="font-body text-sm text-muted-foreground mt-2">
            Your curated selection — hover to add to bag or remove.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
          data-ocid="wishlist.list"
        >
          {items.map((item, i) => (
            <WishlistCard
              key={item.product.id}
              product={item.product}
              index={i + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
