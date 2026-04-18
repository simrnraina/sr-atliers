import { c as createLucideIcon, n as useAuth, j as jsxRuntimeExports, a as Button, U as User, k as formatPrice, B as Badge } from "./index-BU4uHDVH.js";
import { m as motion } from "./proxy-BQW_Dvzl.js";
import { P as Package } from "./package-BksnokLD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700",
  processing: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
  shipped: "bg-accent/20 text-accent border-accent/40",
  delivered: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30"
};
const MOCK_ORDERS = [
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
          stock: 15
        },
        quantity: 1,
        selectedSize: "M"
      }
    ],
    total: 1250,
    status: "delivered",
    createdAt: Date.now() - 864e5 * 14,
    address: {
      fullName: "My Account",
      street: "",
      city: "Mumbai",
      state: "MH",
      country: "India",
      zipCode: "400050"
    }
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
          stock: 10
        },
        quantity: 1,
        selectedSize: "XS"
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
          stock: 25
        },
        quantity: 1,
        selectedSize: "M"
      }
    ],
    total: 1320,
    status: "shipped",
    createdAt: Date.now() - 864e5 * 3,
    address: {
      fullName: "My Account",
      street: "",
      city: "Mumbai",
      state: "MH",
      country: "India",
      zipCode: "400050"
    }
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
          stock: 7
        },
        quantity: 1,
        selectedSize: "S"
      }
    ],
    total: 2850,
    status: "processing",
    createdAt: Date.now() - 864e5 * 1,
    address: {
      fullName: "My Account",
      street: "",
      city: "Mumbai",
      state: "MH",
      country: "India",
      zipCode: "400050"
    }
  }
];
function Profile() {
  const { isAuthenticated, isLoading, login, logout, principalText } = useAuth();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[80vh] flex flex-col items-center justify-center text-center px-6",
        "data-ocid": "profile.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { size: 32, className: "text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl uppercase tracking-[0.15em] mb-3", children: "Sign In to Your Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-8 max-w-sm leading-relaxed", children: "Access your order history, wishlist, and personal settings using Internet Identity — secure, private, and password-free." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "default",
              size: "lg",
              "data-ocid": "profile.login_button",
              onClick: login,
              disabled: isLoading,
              className: "bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs px-10",
              children: isLoading ? "Connecting…" : "Sign In with Internet Identity"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", "data-ocid": "profile.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[900px] mx-auto px-5 lg:px-10 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: "flex items-center justify-between mb-10 pb-8 border-b border-border/40",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 22, className: "text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl uppercase tracking-[0.12em]", children: "My Account" }),
              principalText && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-mono text-[11px] text-muted-foreground mt-1",
                  "data-ocid": "profile.principal",
                  children: [
                    principalText.slice(0, 24),
                    "…"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 inline-block" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] uppercase tracking-widest text-muted-foreground", children: "Authenticated" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              "data-ocid": "profile.logout_button",
              onClick: logout,
              className: "uppercase tracking-widest text-[10px] hover:border-destructive/50 hover:text-destructive transition-smooth",
              children: "Sign Out"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base uppercase tracking-widest", children: "Order History" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-body text-[10px] uppercase tracking-wider text-muted-foreground", children: [
              MOCK_ORDERS.length,
              " order",
              MOCK_ORDERS.length !== 1 ? "s" : ""
            ] })
          ] }),
          MOCK_ORDERS.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border/50 rounded-sm py-16 text-center",
              "data-ocid": "profile.orders.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Package,
                  {
                    size: 40,
                    className: "mx-auto mb-4 text-muted-foreground opacity-40"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-base uppercase tracking-widest mb-2", children: "No orders yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground max-w-xs mx-auto", children: "Your order history will appear here once you make a purchase." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "default",
                    size: "sm",
                    className: "mt-6 bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-[10px]",
                    onClick: () => window.location.assign("/"),
                    "data-ocid": "profile.orders.shop_button",
                    children: "Start Shopping"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 rounded-sm overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", "data-ocid": "profile.orders.table", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Order ID", "Date", "Items", "Total", "Status"].map(
                (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "font-body text-[10px] tracking-widest uppercase text-muted-foreground text-left px-6 py-3",
                    children: h
                  },
                  h
                )
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: MOCK_ORDERS.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors cursor-pointer",
                  "data-ocid": `profile.order.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: order.id }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm", children: new Date(order.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      }
                    ) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0.5", children: order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "font-body text-xs text-muted-foreground truncate max-w-[180px]",
                        children: [
                          item.product.name,
                          item.quantity > 1 && ` ×${item.quantity}`
                        ]
                      },
                      `${item.product.id}-${item.selectedSize}`
                    )) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-accent font-medium", children: formatPrice(order.total) }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-[9px] uppercase tracking-widest px-2 py-0.5 ${STATUS_COLORS[order.status]}`,
                        children: order.status
                      }
                    ) })
                  ]
                },
                order.id
              )) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border/20", children: MOCK_ORDERS.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-5 hover:bg-muted/20 transition-colors",
                "data-ocid": `profile.order.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground block mb-1", children: order.id }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground", children: new Date(order.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-[9px] uppercase tracking-widest px-2 py-0.5 ${STATUS_COLORS[order.status]}`,
                        children: order.status
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 mb-3", children: order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-body text-xs text-muted-foreground",
                      children: [
                        item.product.name,
                        item.quantity > 1 && ` ×${item.quantity}`
                      ]
                    },
                    `${item.product.id}-${item.selectedSize}`
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-accent font-medium", children: formatPrice(order.total) })
                ]
              },
              order.id
            )) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.2 },
        className: "mt-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base uppercase tracking-widest mb-5", children: "Account Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/50 rounded-sm p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] uppercase tracking-widest text-muted-foreground", children: "Identity Provider" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm", children: "Internet Identity" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] uppercase tracking-widest text-muted-foreground flex-shrink-0", children: "Principal ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono text-xs text-muted-foreground text-right break-all",
                  "data-ocid": "profile.principal_full",
                  children: principalText ?? "—"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] uppercase tracking-widest text-muted-foreground", children: "Login Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500 inline-block" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm", children: "Active Session" })
              ] })
            ] })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  Profile as default
};
