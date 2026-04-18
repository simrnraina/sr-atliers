import { g as useWishlist, j as jsxRuntimeExports, H as Heart, L as Link, a as Button, f as useCart, X, k as formatPrice } from "./index-BU4uHDVH.js";
import { m as motion } from "./proxy-BQW_Dvzl.js";
function WishlistCard({ product, index }) {
  const { removeItem } = useWishlist();
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const defaultSize = product.sizes[0] ?? "M";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { delay: index * 0.06, duration: 0.4 },
      className: "group relative",
      "data-ocid": `wishlist.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": `Remove ${product.name} from wishlist`,
            "data-ocid": `wishlist.remove_button.${index}`,
            onClick: () => removeItem(product.id),
            className: "absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full glassmorphism opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-destructive/20",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-foreground/80" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-4 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.images[0] ?? "/assets/images/placeholder.svg",
              alt: product.name,
              className: "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/8 transition-all duration-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              "data-ocid": `wishlist.add_to_cart.${index}`,
              className: "w-full rounded-none rounded-b-sm text-[10px] tracking-widest uppercase bg-accent text-accent-foreground hover:bg-accent/90",
              onClick: (e) => {
                e.preventDefault();
                addItem(product, defaultSize);
              },
              children: inCart ? "Added to Bag ✓" : "Add to Bag"
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products/$id",
              params: { id: product.id },
              className: "font-display text-sm uppercase tracking-wide text-foreground hover:text-accent transition-colors line-clamp-1 block",
              children: product.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-accent font-medium", children: formatPrice(product.price) }),
            product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground line-through", children: formatPrice(product.originalPrice) })
          ] })
        ] })
      ]
    }
  );
}
function Wishlist() {
  const { items, count } = useWishlist();
  if (count === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center text-center px-6",
        "data-ocid": "wishlist.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            className: "flex flex-col items-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 52, className: "text-muted-foreground mb-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl uppercase tracking-wide mb-3", children: "Your Wishlist is Empty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mb-8 max-w-xs leading-relaxed", children: "Save the pieces you love and revisit them whenever inspiration strikes." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "wishlist.browse_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  className: "bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-widest text-xs",
                  children: "Browse Collection"
                }
              ) })
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen", "data-ocid": "wishlist.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl lg:text-4xl uppercase tracking-wide", children: [
              "Wishlist",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-body text-base normal-case tracking-normal ml-3", children: [
                "(",
                count,
                " ",
                count === 1 ? "piece" : "pieces",
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/products",
                className: "font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline",
                children: "Browse More"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground mt-2", children: "Your curated selection — hover to add to bag or remove." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12",
        "data-ocid": "wishlist.list",
        children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          WishlistCard,
          {
            product: item.product,
            index: i + 1
          },
          item.product.id
        ))
      }
    )
  ] }) });
}
export {
  Wishlist as default
};
