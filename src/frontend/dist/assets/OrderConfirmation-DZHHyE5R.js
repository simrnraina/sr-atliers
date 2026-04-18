import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, k as formatPrice, L as Link, a as Button, l as ShoppingBag } from "./index-BU4uHDVH.js";
import { S as Separator } from "./separator-kC2LepTQ.js";
import { m as motion } from "./proxy-BQW_Dvzl.js";
import { P as Package } from "./package-BksnokLD.js";
import { M as MapPin } from "./map-pin-BKk7EvVM.js";
import { A as ArrowRight } from "./arrow-right-CqzpsBq3.js";
import "./index-B_wl7axP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
const SAMPLE_ITEMS = [
  {
    product: {
      id: "p1",
      name: "Tailored Wool Blazer",
      price: 1250,
      category: "blazers",
      images: ["/assets/images/placeholder.svg"],
      description: "",
      sizes: ["S", "M", "L"],
      stock: 5
    },
    selectedSize: "M",
    quantity: 1
  }
];
const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 15;
function formatOrderId(raw) {
  if (!raw) return `SRA-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return raw;
}
function OrderConfirmation() {
  const params = new URLSearchParams(window.location.search);
  const rawOrderId = params.get("orderId");
  const orderId = reactExports.useMemo(() => formatOrderId(rawOrderId), [rawOrderId]);
  const storedOrder = (() => {
    try {
      const raw = sessionStorage.getItem("sr_last_order");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();
  const items = (storedOrder == null ? void 0 : storedOrder.items) ?? SAMPLE_ITEMS;
  const shippingAddress = (storedOrder == null ? void 0 : storedOrder.address) ?? null;
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const expectedDelivery = reactExports.useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen py-12 px-6",
      "data-ocid": "order-confirmation.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[680px] mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { scale: 0, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: {
                    delay: 0.2,
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1]
                  },
                  className: "inline-flex",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheckBig,
                    {
                      size: 64,
                      className: "text-accent mx-auto mb-6",
                      strokeWidth: 1.5
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl lg:text-5xl uppercase tracking-wide mb-3", children: "Order Confirmed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto", children: "Thank you for your purchase. Your order has been received and is being carefully prepared by our team." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 6 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.4 },
                  className: "mt-4",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-body text-xs text-muted-foreground",
                      "data-ocid": "order-confirmation.order_id",
                      children: [
                        "Order reference:",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium tracking-wider", children: orderId })
                      ]
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 },
            className: "bg-card border border-border/50 rounded-sm p-6 mb-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 15, className: "text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm uppercase tracking-wide", children: "Items Ordered" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex gap-4 py-4 border-b border-border/40 first:border-t first:border-t-border/40",
                  "data-ocid": `order-confirmation.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-18 rounded-sm overflow-hidden bg-muted flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.product.images[0] ?? "/assets/images/placeholder.svg",
                        alt: item.product.name,
                        className: "w-full h-full object-cover",
                        style: { height: "72px" }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm uppercase tracking-wide line-clamp-1", children: item.product.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground mt-1", children: [
                        "Size: ",
                        item.selectedSize,
                        " · Qty: ",
                        item.quantity
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-accent font-medium flex-shrink-0 pt-0.5", children: formatPrice(item.product.price * item.quantity) })
                  ]
                },
                `${item.product.id}-${item.selectedSize}`
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 text-sm font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(subtotal) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                  shipping === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-xs", children: "Complimentary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(shipping) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50 my-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between items-center",
                  "data-ocid": "order-confirmation.total",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm uppercase tracking-wide font-medium", children: "Total" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xl text-accent font-semibold", children: formatPrice(total) })
                  ]
                }
              )
            ]
          }
        ),
        shippingAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.35 },
            className: "bg-card border border-border/50 rounded-sm p-6 mb-5",
            "data-ocid": "order-confirmation.shipping_address",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 15, className: "text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm uppercase tracking-wide", children: "Shipping To" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-medium", children: shippingAddress.fullName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-1", children: shippingAddress.street }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground", children: [
                shippingAddress.city,
                ", ",
                shippingAddress.state,
                " ",
                shippingAddress.zipCode
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground", children: shippingAddress.country })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.4 },
            className: "bg-accent/10 border border-accent/25 rounded-sm px-6 py-4 mb-8 flex items-center gap-4",
            "data-ocid": "order-confirmation.delivery_info",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 18, className: "text-accent flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs uppercase tracking-widest text-accent font-medium mb-0.5", children: "Estimated Delivery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground", children: expectedDelivery }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: "5–7 business days · Standard tracked delivery" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.5 },
            className: "flex flex-col sm:flex-row gap-3 justify-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  "data-ocid": "order-confirmation.home_button",
                  className: "w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14 }),
                    "Return Home"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "lg",
                  "data-ocid": "order-confirmation.shop_button",
                  className: "w-full sm:w-auto uppercase tracking-widest text-xs",
                  children: [
                    "Continue Shopping",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                  ]
                }
              ) })
            ]
          }
        )
      ] })
    }
  );
}
export {
  OrderConfirmation as default
};
