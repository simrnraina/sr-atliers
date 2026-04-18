import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/api";

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 15;

export default function Cart() {
  const { items, removeItem, updateQuantity, total, count } = useCart();
  const navigate = useNavigate();

  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = total + shipping;

  if (count === 0) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
        data-ocid="cart.empty_state"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <ShoppingBag size={52} className="text-muted-foreground mb-6" />
          <h1 className="font-display text-3xl uppercase tracking-wide mb-3">
            Your Bag is Empty
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-8 max-w-xs leading-relaxed">
            Discover our curated collections and add pieces that speak to you.
          </p>
          <Link to="/products" data-ocid="cart.browse_products_link">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs"
            >
              Shop the Collection
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" data-ocid="cart.page">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-baseline justify-between mb-10"
        >
          <h1 className="font-display text-3xl lg:text-4xl uppercase tracking-wide">
            Shopping Bag
            <span className="text-muted-foreground font-body text-base normal-case tracking-normal ml-3">
              ({count} {count === 1 ? "item" : "items"})
            </span>
          </h1>
          <Link
            to="/products"
            data-ocid="cart.continue_shopping_button"
            className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline"
          >
            Continue Shopping
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-0">
            {items.map((item, i) => (
              <motion.div
                key={`${item.product.id}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex gap-5 py-7 border-b border-border/50 first:border-t first:border-t-border/50"
                data-ocid={`cart.item.${i + 1}`}
              >
                {/* Product image */}
                <Link
                  to="/products/$id"
                  params={{ id: item.product.id }}
                  className="flex-shrink-0"
                >
                  <div className="w-24 h-32 rounded-sm overflow-hidden bg-muted transition-smooth hover:opacity-90">
                    <img
                      src={
                        item.product.images[0] ??
                        "/assets/images/placeholder.svg"
                      }
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Product info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        to="/products/$id"
                        params={{ id: item.product.id }}
                        className="font-display text-sm uppercase tracking-wide text-foreground hover:text-accent transition-colors line-clamp-1 block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        Size: {item.selectedSize}
                      </p>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">
                        Unit: {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <p className="font-body text-sm text-accent font-medium flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity adjuster */}
                    <div className="flex items-center border border-border rounded-sm overflow-hidden">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        data-ocid={`cart.decrease.${i + 1}`}
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity - 1,
                          )
                        }
                        className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        className="font-body text-sm w-8 text-center select-none"
                        aria-label={`Quantity: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        data-ocid={`cart.increase.${i + 1}`}
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity + 1,
                          )
                        }
                        className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      aria-label={`Remove ${item.product.name}`}
                      data-ocid={`cart.delete_button.${i + 1}`}
                      onClick={() =>
                        removeItem(item.product.id, item.selectedSize)
                      }
                      className="flex items-center gap-1.5 font-body text-xs text-muted-foreground hover:text-destructive transition-colors group/remove"
                    >
                      <Trash2
                        size={13}
                        className="group-hover/remove:scale-110 transition-transform"
                      />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border/50 rounded-sm p-6 sticky top-28"
            >
              <h2 className="font-display text-base uppercase tracking-wide mb-6">
                Order Summary
              </h2>

              {/* Line items */}
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex justify-between text-xs font-body"
                  >
                    <span className="text-muted-foreground truncate max-w-[150px]">
                      {item.product.name}
                      {item.quantity > 1 && (
                        <span className="ml-1">×{item.quantity}</span>
                      )}
                    </span>
                    <span className="flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="bg-border/50 mb-5" />

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">
                    Shipping
                    {total < FREE_SHIPPING_THRESHOLD && (
                      <span className="block text-xs text-muted-foreground/70 mt-0.5">
                        Free over {formatPrice(FREE_SHIPPING_THRESHOLD)}
                      </span>
                    )}
                  </span>
                  {shipping === 0 ? (
                    <span className="text-accent text-sm">Complimentary</span>
                  ) : (
                    <span>{formatPrice(shipping)}</span>
                  )}
                </div>
              </div>

              <Separator className="bg-border/50 mb-5" />

              <div className="flex justify-between font-body text-base mb-7">
                <span className="font-medium uppercase tracking-wide text-sm">
                  Total
                </span>
                <span className="text-accent font-semibold text-lg">
                  {formatPrice(grandTotal)}
                </span>
              </div>

              {total < FREE_SHIPPING_THRESHOLD && (
                <p className="font-body text-xs text-muted-foreground bg-muted/40 rounded-sm px-3 py-2 mb-5 text-center">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - total)} more for
                  free shipping
                </p>
              )}

              <Button
                size="lg"
                data-ocid="cart.checkout_button"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs"
                onClick={() => navigate({ to: "/checkout" })}
              >
                Proceed to Checkout
              </Button>

              <Link to="/products">
                <Button
                  variant="ghost"
                  size="sm"
                  data-ocid="cart.shop_more_button"
                  className="w-full mt-3 text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest"
                >
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
