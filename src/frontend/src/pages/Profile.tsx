import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogIn, Package, User } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../hooks/useAuth";
import { formatPrice } from "../lib/api";
import type { Order, OrderStatus } from "../types";

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending:
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
  processing:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
  shipped: "bg-accent/20 text-accent border-accent/40",
  delivered:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

// Simulate order history for authenticated user demo
const MOCK_ORDERS: Order[] = [
  {
    id: "SRA-00001",
    items: [
      {
        product: {
          id: "1",
          name: "Tailored Silk Blazer",
          price: 1250,
          category: "blazers",
          images: ["/assets/generated/blazer-beige.jpg"],
          description: "",
          sizes: ["S", "M", "L"],
          stock: 15,
        },
        quantity: 1,
        selectedSize: "M",
      },
    ],
    total: 1250,
    status: "delivered",
    createdAt: Date.now() - 86400000 * 14,
    address: {
      fullName: "My Account",
      street: "",
      city: "Mumbai",
      state: "MH",
      country: "India",
      zipCode: "400050",
    },
  },
  {
    id: "SRA-00002",
    items: [
      {
        product: {
          id: "2",
          name: "Luxury Silk Slip Dress",
          price: 980,
          category: "dresses",
          images: ["/assets/generated/dress-cream.jpg"],
          description: "",
          sizes: ["XS", "S"],
          stock: 10,
        },
        quantity: 1,
        selectedSize: "XS",
      },
      {
        product: {
          id: "11",
          name: "Silk Scarf — Heritage",
          price: 340,
          category: "accessories",
          images: ["/assets/generated/scarf-silk.jpg"],
          description: "",
          sizes: [],
          stock: 25,
        },
        quantity: 1,
        selectedSize: "M",
      },
    ],
    total: 1320,
    status: "shipped",
    createdAt: Date.now() - 86400000 * 3,
    address: {
      fullName: "My Account",
      street: "",
      city: "Mumbai",
      state: "MH",
      country: "India",
      zipCode: "400050",
    },
  },
  {
    id: "SRA-00003",
    items: [
      {
        product: {
          id: "5",
          name: "Cashmere Wrap Coat",
          price: 2850,
          category: "blazers",
          images: ["/assets/generated/coat-camel.jpg"],
          description: "",
          sizes: ["S", "M"],
          stock: 7,
        },
        quantity: 1,
        selectedSize: "S",
      },
    ],
    total: 2850,
    status: "processing",
    createdAt: Date.now() - 86400000 * 1,
    address: {
      fullName: "My Account",
      street: "",
      city: "Mumbai",
      state: "MH",
      country: "India",
      zipCode: "400050",
    },
  },
];

export default function Profile() {
  const { isAuthenticated, isLoading, login, logout, principalText } =
    useAuth();

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6"
        data-ocid="profile.page"
      >
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
          <LogIn size={32} className="text-accent" />
        </div>
        <h1 className="font-display text-3xl uppercase tracking-[0.15em] mb-3">
          Sign In to Your Account
        </h1>
        <p className="font-body text-sm text-muted-foreground mb-8 max-w-sm leading-relaxed">
          Access your order history, wishlist, and personal settings using
          Internet Identity — secure, private, and password-free.
        </p>
        <Button
          variant="default"
          size="lg"
          data-ocid="profile.login_button"
          onClick={login}
          disabled={isLoading}
          className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs px-10"
        >
          {isLoading ? "Connecting…" : "Sign In with Internet Identity"}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="profile.page">
      <div className="max-w-[900px] mx-auto px-5 lg:px-10 py-12">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-10 pb-8 border-b border-border/40"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center">
              <User size={22} className="text-accent" />
            </div>
            <div>
              <h1 className="font-display text-2xl uppercase tracking-[0.12em]">
                My Account
              </h1>
              {principalText && (
                <p
                  className="font-mono text-[11px] text-muted-foreground mt-1"
                  data-ocid="profile.principal"
                >
                  {principalText.slice(0, 24)}…
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                  Authenticated
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            data-ocid="profile.logout_button"
            onClick={logout}
            className="uppercase tracking-widest text-[10px] hover:border-destructive/50 hover:text-destructive transition-smooth"
          >
            Sign Out
          </Button>
        </motion.div>

        {/* ── Order History ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-base uppercase tracking-widest">
              Order History
            </h2>
            <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">
              {MOCK_ORDERS.length} order{MOCK_ORDERS.length !== 1 ? "s" : ""}
            </span>
          </div>

          {MOCK_ORDERS.length === 0 ? (
            <div
              className="bg-card border border-border/50 rounded-sm py-16 text-center"
              data-ocid="profile.orders.empty_state"
            >
              <Package
                size={40}
                className="mx-auto mb-4 text-muted-foreground opacity-40"
              />
              <p className="font-display text-base uppercase tracking-widest mb-2">
                No orders yet
              </p>
              <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto">
                Your order history will appear here once you make a purchase.
              </p>
              <Button
                variant="default"
                size="sm"
                className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-[10px]"
                onClick={() => window.location.assign("/")}
                data-ocid="profile.orders.shop_button"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="bg-card border border-border/50 rounded-sm overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full" data-ocid="profile.orders.table">
                  <thead className="border-b border-border/40 bg-muted/30">
                    <tr>
                      {["Order ID", "Date", "Items", "Total", "Status"].map(
                        (h) => (
                          <th
                            key={h}
                            className="font-body text-[10px] tracking-widest uppercase text-muted-foreground text-left px-6 py-3"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.map((order, i) => (
                      <tr
                        key={order.id}
                        className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer"
                        data-ocid={`profile.order.item.${i + 1}`}
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-muted-foreground">
                            {order.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-body text-sm">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-0.5">
                            {order.items.map((item) => (
                              <span
                                key={`${item.product.id}-${item.selectedSize}`}
                                className="font-body text-xs text-muted-foreground truncate max-w-[180px]"
                              >
                                {item.product.name}
                                {item.quantity > 1 && ` ×${item.quantity}`}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-body text-sm text-accent font-medium">
                            {formatPrice(order.total)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={`text-[9px] uppercase tracking-widest px-2 py-0.5 ${STATUS_COLORS[order.status]}`}
                          >
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-border/20">
                {MOCK_ORDERS.map((order, i) => (
                  <div
                    key={order.id}
                    className="p-5 hover:bg-muted/20 transition-colors"
                    data-ocid={`profile.order.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="font-mono text-xs text-muted-foreground block mb-1">
                          {order.id}
                        </span>
                        <span className="font-body text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[9px] uppercase tracking-widest px-2 py-0.5 ${STATUS_COLORS[order.status]}`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 mb-3">
                      {order.items.map((item) => (
                        <p
                          key={`${item.product.id}-${item.selectedSize}`}
                          className="font-body text-xs text-muted-foreground"
                        >
                          {item.product.name}
                          {item.quantity > 1 && ` ×${item.quantity}`}
                        </p>
                      ))}
                    </div>
                    <p className="font-body text-sm text-accent font-medium">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        {/* ── Account Details ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-10"
        >
          <h2 className="font-display text-base uppercase tracking-widest mb-5">
            Account Details
          </h2>
          <div className="bg-card border border-border/50 rounded-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                Identity Provider
              </span>
              <span className="font-body text-sm">Internet Identity</span>
            </div>
            <div className="border-t border-border/30" />
            <div className="flex items-start justify-between gap-4">
              <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground flex-shrink-0">
                Principal ID
              </span>
              <span
                className="font-mono text-xs text-muted-foreground text-right break-all"
                data-ocid="profile.principal_full"
              >
                {principalText ?? "—"}
              </span>
            </div>
            <div className="border-t border-border/30" />
            <div className="flex items-center justify-between">
              <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
                Login Status
              </span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                <span className="font-body text-sm">Active Session</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
