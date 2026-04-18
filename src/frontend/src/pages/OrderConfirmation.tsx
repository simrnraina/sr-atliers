import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { formatPrice } from "../lib/api";
import type { CartItem } from "../types";

// Sample order items shown on confirmation (from sessionStorage fallback)
const SAMPLE_ITEMS: CartItem[] = [
  {
    product: {
      id: "p1",
      name: "Tailored Wool Blazer",
      price: 1250,
      category: "blazers",
      images: ["/assets/images/placeholder.svg"],
      description: "",
      sizes: ["S", "M", "L"],
      stock: 5,
    },
    selectedSize: "M",
    quantity: 1,
  },
];

const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 15;

function formatOrderId(raw: string | null): string {
  if (!raw) return `SRA-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return raw;
}

export default function OrderConfirmation() {
  const params = new URLSearchParams(window.location.search);
  const rawOrderId = params.get("orderId");
  const orderId = useMemo(() => formatOrderId(rawOrderId), [rawOrderId]);

  // Try to restore order info from sessionStorage (set at order creation)
  const storedOrder = (() => {
    try {
      const raw = sessionStorage.getItem("sr_last_order");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const items: CartItem[] = storedOrder?.items ?? SAMPLE_ITEMS;
  const shippingAddress = storedOrder?.address ?? null;
  const subtotal = items.reduce(
    (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const expectedDelivery = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, []);

  return (
    <div
      className="min-h-screen py-12 px-6"
      data-ocid="order-confirmation.page"
    >
      <div className="max-w-[680px] mx-auto">
        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="inline-flex"
          >
            <CheckCircle
              size={64}
              className="text-accent mx-auto mb-6"
              strokeWidth={1.5}
            />
          </motion.div>
          <h1 className="font-display text-4xl lg:text-5xl uppercase tracking-wide mb-3">
            Order Confirmed
          </h1>
          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Thank you for your purchase. Your order has been received and is
            being carefully prepared by our team.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4"
          >
            <p
              className="font-body text-xs text-muted-foreground"
              data-ocid="order-confirmation.order_id"
            >
              Order reference:{" "}
              <span className="text-accent font-medium tracking-wider">
                {orderId}
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* Order summary card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border/50 rounded-sm p-6 mb-5"
        >
          <div className="flex items-center gap-2 mb-5">
            <Package size={15} className="text-muted-foreground" />
            <h2 className="font-display text-sm uppercase tracking-wide">
              Items Ordered
            </h2>
          </div>

          <div className="space-y-0">
            {items.map((item: CartItem, i: number) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4 py-4 border-b border-border/40 first:border-t first:border-t-border/40"
                data-ocid={`order-confirmation.item.${i + 1}`}
              >
                <div className="w-14 h-18 rounded-sm overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={
                      item.product.images[0] ?? "/assets/images/placeholder.svg"
                    }
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    style={{ height: "72px" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm uppercase tracking-wide line-clamp-1">
                    {item.product.name}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    Size: {item.selectedSize} · Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-body text-sm text-accent font-medium flex-shrink-0 pt-0.5">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 space-y-2 text-sm font-body">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              {shipping === 0 ? (
                <span className="text-accent text-xs">Complimentary</span>
              ) : (
                <span>{formatPrice(shipping)}</span>
              )}
            </div>
          </div>

          <Separator className="bg-border/50 my-4" />
          <div
            className="flex justify-between items-center"
            data-ocid="order-confirmation.total"
          >
            <span className="font-body text-sm uppercase tracking-wide font-medium">
              Total
            </span>
            <span className="font-body text-xl text-accent font-semibold">
              {formatPrice(total)}
            </span>
          </div>
        </motion.div>

        {/* Shipping address */}
        {shippingAddress && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-card border border-border/50 rounded-sm p-6 mb-5"
            data-ocid="order-confirmation.shipping_address"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={15} className="text-muted-foreground" />
              <h2 className="font-display text-sm uppercase tracking-wide">
                Shipping To
              </h2>
            </div>
            <p className="font-body text-sm font-medium">
              {shippingAddress.fullName}
            </p>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {shippingAddress.street}
            </p>
            <p className="font-body text-sm text-muted-foreground">
              {shippingAddress.city}, {shippingAddress.state}{" "}
              {shippingAddress.zipCode}
            </p>
            <p className="font-body text-sm text-muted-foreground">
              {shippingAddress.country}
            </p>
          </motion.div>
        )}

        {/* Expected delivery */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-accent/10 border border-accent/25 rounded-sm px-6 py-4 mb-8 flex items-center gap-4"
          data-ocid="order-confirmation.delivery_info"
        >
          <Calendar size={18} className="text-accent flex-shrink-0" />
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-accent font-medium mb-0.5">
              Estimated Delivery
            </p>
            <p className="font-body text-sm text-foreground">
              {expectedDelivery}
            </p>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              5–7 business days · Standard tracked delivery
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to="/">
            <Button
              size="lg"
              data-ocid="order-confirmation.home_button"
              className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs"
            >
              <ShoppingBag size={14} />
              Return Home
            </Button>
          </Link>
          <Link to="/products">
            <Button
              variant="outline"
              size="lg"
              data-ocid="order-confirmation.shop_button"
              className="w-full sm:w-auto uppercase tracking-widest text-xs"
            >
              Continue Shopping
              <ArrowRight size={14} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
