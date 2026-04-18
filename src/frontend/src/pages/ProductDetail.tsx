import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useProductById } from "../hooks/useProducts";
import { formatPrice, getRelatedProducts } from "../lib/api";
import { sampleProducts } from "../lib/sampleData";
import type { Size } from "../types";

const FEATURES_BY_CATEGORY: Record<string, string[]> = {
  dresses: [
    "100% premium natural fabric",
    "Bias-cut silhouette for flattering drape",
    "Adjustable spaghetti straps",
    "Lined interior for comfortable wear",
  ],
  blazers: [
    "Italian-sourced fabrication",
    "Structured shoulders with soft pad",
    "Two front patch pockets",
    "Single centre-back vent",
  ],
  bags: [
    "Full-grain Italian leather exterior",
    "Gold-tone hardware throughout",
    "Interior zip and slip pockets",
    "Dust bag included",
  ],
  tops: [
    "Breathable natural fibre construction",
    "Relaxed, oversized silhouette",
    "Reinforced seams for longevity",
    "Machine washable at 30°C",
  ],
  bottoms: [
    "High-rise waistband with interior stay",
    "Fluid wide-leg silhouette",
    "Side invisible zip closure",
    "Fully lined for modesty",
  ],
  accessories: [
    "Artisan hand-finished construction",
    "Hypoallergenic metal fittings",
    "Comes in branded SR Atliers box",
    "Gift wrapping available",
  ],
};

export default function ProductDetail() {
  const { id } = useParams({ from: "/products/$id" });
  const { data: product, isLoading } = useProductById(id);
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [addedBounce, setAddedBounce] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-3">
            <div className="aspect-[3/4] bg-muted rounded-sm animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="w-16 h-20 bg-muted rounded-sm animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="space-y-5 pt-4">
            <div className="h-8 bg-muted rounded w-2/3 animate-pulse" />
            <div className="h-6 bg-muted rounded w-1/3 animate-pulse" />
            <div className="h-4 bg-muted rounded w-full animate-pulse" />
            <div className="h-4 bg-muted rounded w-4/5 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 text-center">
        <h1 className="font-display text-3xl uppercase mb-4">
          Product Not Found
        </h1>
        <Link to="/products">
          <Button variant="outline">Back to Collection</Button>
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const related = getRelatedProducts(product, sampleProducts);
  const features =
    FEATURES_BY_CATEGORY[product.category] ?? FEATURES_BY_CATEGORY.tops;

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize ?? ("M" as Size), quantity);
    setAddedBounce(true);
    setTimeout(() => setAddedBounce(false), 600);
  };

  const handleBuyNow = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize ?? ("M" as Size), quantity);
    // Navigate to cart using TanStack Router
    navigate({ to: "/cart" });
  };

  const prevImage = () =>
    setActiveImage(
      (i) => (i - 1 + product.images.length) % product.images.length,
    );
  const nextImage = () =>
    setActiveImage((i) => (i + 1) % product.images.length);

  return (
    <div data-ocid="product-detail.page">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 mb-8 text-xs font-body text-muted-foreground"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link
            to="/products"
            className="hover:text-foreground transition-colors"
          >
            Collection
          </Link>
          <span aria-hidden>/</span>
          <span className="text-foreground truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={
                    product.images[activeImage] ??
                    "/assets/images/placeholder.svg"
                  }
                  alt={`${product.name} — view ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>

              {/* Arrow nav (shown when multiple images) */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    data-ocid="product-detail.image.prev"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-sm bg-card/80 backdrop-blur-sm border border-border/40 text-foreground opacity-0 group-hover:opacity-100 transition-smooth hover:border-foreground"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    data-ocid="product-detail.image.next"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-sm bg-card/80 backdrop-blur-sm border border-border/40 text-foreground opacity-0 group-hover:opacity-100 transition-smooth hover:border-foreground"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Badges overlay */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isNew && (
                  <Badge className="bg-accent text-accent-foreground border-transparent text-[10px] uppercase tracking-wider">
                    New
                  </Badge>
                )}
                {product.isBestSeller && (
                  <Badge
                    variant="outline"
                    className="bg-card/80 backdrop-blur-sm text-accent border-accent/40 text-[10px] uppercase tracking-wider"
                  >
                    Best Seller
                  </Badge>
                )}
                {product.stock <= 5 && product.stock > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-card/80 backdrop-blur-sm text-destructive border-destructive/40 text-[10px] uppercase tracking-wider"
                  >
                    Only {product.stock} left
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    data-ocid={`product-detail.thumbnail.${i + 1}`}
                    aria-label={`View image ${i + 1}`}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-20 overflow-hidden rounded-sm transition-smooth flex-shrink-0 ${
                      activeImage === i
                        ? "ring-1 ring-accent opacity-100"
                        : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      aria-hidden
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Name */}
            <h1 className="font-display text-3xl lg:text-4xl uppercase tracking-wide mb-3">
              {product.name}
            </h1>

            {/* Price */}
            <div
              className="flex items-baseline gap-3 mb-5"
              data-ocid="product-detail.price"
            >
              <span className="font-body text-2xl text-accent font-medium">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="font-body text-base text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <Badge className="bg-accent/15 text-accent border-transparent text-[10px] uppercase tracking-wider">
                  Sale
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="font-body text-xs tracking-widest uppercase text-foreground mb-3 flex items-center gap-2">
                  Size
                  {sizeError && (
                    <span
                      className="text-destructive normal-case tracking-normal font-normal"
                      data-ocid="product-detail.size.field_error"
                    >
                      — Please select a size
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      data-ocid={`product-detail.size.${size}`}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`w-12 h-12 flex items-center justify-center font-body text-xs tracking-wider rounded-sm border transition-smooth ${
                        selectedSize === size
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mb-7">
              <p className="font-body text-xs tracking-widest uppercase text-foreground mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-0 border border-border rounded-sm w-fit">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  data-ocid="product-detail.qty.minus"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-foreground disabled:text-muted-foreground hover:bg-muted/60 transition-smooth border-r border-border"
                >
                  <Minus size={14} />
                </button>
                <span
                  className="w-12 text-center font-body text-sm"
                  data-ocid="product-detail.qty.display"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  data-ocid="product-detail.qty.plus"
                  onClick={() =>
                    setQuantity((q) => Math.min(q + 1, product.stock))
                  }
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 flex items-center justify-center text-foreground disabled:text-muted-foreground hover:bg-muted/60 transition-smooth border-l border-border"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <motion.div
                animate={
                  addedBounce ? { scale: [1, 0.96, 1.02, 1] } : { scale: 1 }
                }
                transition={{ duration: 0.4 }}
                className="flex-1"
              >
                <Button
                  size="lg"
                  data-ocid="product-detail.add_button"
                  onClick={handleAddToCart}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body text-xs tracking-widest uppercase"
                >
                  {inCart ? (
                    <>
                      <Check size={14} />
                      Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} />
                      Add to Bag
                    </>
                  )}
                </Button>
              </motion.div>

              <Button
                size="lg"
                variant="outline"
                data-ocid="product-detail.buy_now_button"
                onClick={handleBuyNow}
                className="flex-1 font-body text-xs tracking-widest uppercase border-foreground/40 hover:border-foreground hover:bg-foreground hover:text-background transition-smooth"
              >
                <Zap size={14} />
                Buy Now
              </Button>

              <button
                type="button"
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Save to wishlist"
                }
                data-ocid="product-detail.wishlist_button"
                onClick={() => toggle(product)}
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-sm border border-border hover:border-accent transition-smooth"
              >
                <Heart
                  size={18}
                  className={
                    wishlisted
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }
                />
              </button>
            </div>

            {/* Key Features */}
            <div className="border-t border-border/50 pt-6 mb-6">
              <p className="font-body text-xs tracking-widest uppercase text-foreground mb-4">
                Key Features
              </p>
              <ul className="space-y-2">
                {features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="font-body text-sm text-muted-foreground leading-relaxed">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-border/50 pt-5">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="capitalize font-body text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-24 pt-16 border-t border-border/50"
          >
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">
                  You May Also Like
                </p>
                <h2 className="font-display text-2xl uppercase tracking-wide">
                  Related Pieces
                </h2>
              </div>
              <Link
                to="/products"
                className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-accent flex items-center gap-1 transition-colors"
              >
                View All
                <ArrowLeft size={12} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  data-ocid={`product-detail.related.item.${i + 1}`}
                >
                  <ProductCard product={p} index={i + 1} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
