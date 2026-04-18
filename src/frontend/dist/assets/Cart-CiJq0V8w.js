import { c as createLucideIcon, f as useCart, h as useNavigate, j as jsxRuntimeExports, l as ShoppingBag, L as Link, a as Button, k as formatPrice } from "./index-BU4uHDVH.js";
import { S as Separator } from "./separator-kC2LepTQ.js";
import { m as motion } from "./proxy-BQW_Dvzl.js";
import { M as Minus } from "./minus-BGMoAr0Q.js";
import { P as Plus } from "./plus-D7xpqXQC.js";
import "./index-B_wl7axP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 15;
function Cart() {
  const { items, removeItem, updateQuantity, total, count } = useCart();
  const navigate = useNavigate();
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const grandTotal = total + shipping;
  if (count === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center text-center px-6",
        "data-ocid": "cart.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            className: "flex flex-col items-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 52, className: "text-muted-foreground mb-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl uppercase tracking-wide mb-3", children: "Your Bag is Empty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-8 max-w-xs leading-relaxed", children: "Discover our curated collections and add pieces that speak to you." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "cart.browse_products_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  className: "bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs",
                  children: "Shop the Collection"
                }
              ) })
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen", "data-ocid": "cart.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-baseline justify-between mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl lg:text-4xl uppercase tracking-wide", children: [
            "Shopping Bag",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-body text-base normal-case tracking-normal ml-3", children: [
              "(",
              count,
              " ",
              count === 1 ? "item" : "items",
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              "data-ocid": "cart.continue_shopping_button",
              className: "font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline",
              children: "Continue Shopping"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 space-y-0", children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { delay: i * 0.06, duration: 0.4 },
          className: "flex gap-5 py-7 border-b border-border/50 first:border-t first:border-t-border/50",
          "data-ocid": `cart.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/products/$id",
                params: { id: item.product.id },
                className: "flex-shrink-0",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-32 rounded-sm overflow-hidden bg-muted transition-smooth hover:opacity-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.product.images[0] ?? "/assets/images/placeholder.svg",
                    alt: item.product.name,
                    className: "w-full h-full object-cover"
                  }
                ) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/products/$id",
                      params: { id: item.product.id },
                      className: "font-display text-sm uppercase tracking-wide text-foreground hover:text-accent transition-colors line-clamp-1 block",
                      children: item.product.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground mt-1", children: [
                    "Size: ",
                    item.selectedSize
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground mt-0.5", children: [
                    "Unit: ",
                    formatPrice(item.product.price)
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-accent font-medium flex-shrink-0", children: formatPrice(item.product.price * item.quantity) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-sm overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Decrease quantity",
                      "data-ocid": `cart.decrease.${i + 1}`,
                      onClick: () => updateQuantity(
                        item.product.id,
                        item.selectedSize,
                        item.quantity - 1
                      ),
                      className: "w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-body text-sm w-8 text-center select-none",
                      "aria-label": `Quantity: ${item.quantity}`,
                      children: item.quantity
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Increase quantity",
                      "data-ocid": `cart.increase.${i + 1}`,
                      onClick: () => updateQuantity(
                        item.product.id,
                        item.selectedSize,
                        item.quantity + 1
                      ),
                      className: "w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "aria-label": `Remove ${item.product.name}`,
                    "data-ocid": `cart.delete_button.${i + 1}`,
                    onClick: () => removeItem(item.product.id, item.selectedSize),
                    className: "flex items-center gap-1.5 font-body text-xs text-muted-foreground hover:text-destructive transition-colors group/remove",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Trash2,
                        {
                          size: 13,
                          className: "group-hover/remove:scale-110 transition-transform"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Remove" })
                    ]
                  }
                )
              ] })
            ] })
          ]
        },
        `${item.product.id}-${item.selectedSize}`
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.2 },
          className: "bg-card border border-border/50 rounded-sm p-6 sticky top-28",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base uppercase tracking-wide mb-6", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-5", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex justify-between text-xs font-body",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate max-w-[150px]", children: [
                    item.product.name,
                    item.quantity > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1", children: [
                      "×",
                      item.quantity
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: formatPrice(item.product.price * item.quantity) })
                ]
              },
              `${item.product.id}-${item.selectedSize}`
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50 mb-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-body", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "Shipping",
                  total < FREE_SHIPPING_THRESHOLD && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-xs text-muted-foreground/70 mt-0.5", children: [
                    "Free over ",
                    formatPrice(FREE_SHIPPING_THRESHOLD)
                  ] })
                ] }),
                shipping === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-sm", children: "Complimentary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(shipping) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50 mb-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-body text-base mb-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium uppercase tracking-wide text-sm", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-semibold text-lg", children: formatPrice(grandTotal) })
            ] }),
            total < FREE_SHIPPING_THRESHOLD && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-muted-foreground bg-muted/40 rounded-sm px-3 py-2 mb-5 text-center", children: [
              "Add ",
              formatPrice(FREE_SHIPPING_THRESHOLD - total),
              " more for free shipping"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                "data-ocid": "cart.checkout_button",
                className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs",
                onClick: () => navigate({ to: "/checkout" }),
                children: "Proceed to Checkout"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                "data-ocid": "cart.shop_more_button",
                className: "w-full mt-3 text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest",
                children: "Continue Shopping"
              }
            ) })
          ]
        }
      ) })
    ] })
  ] }) });
}
export {
  Cart as default
};
