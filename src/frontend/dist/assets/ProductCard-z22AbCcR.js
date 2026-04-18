import { f as useCart, g as useWishlist, j as jsxRuntimeExports, L as Link, B as Badge, H as Heart, d as cn, a as Button, l as ShoppingBag, k as formatPrice } from "./index-BU4uHDVH.js";
function ProductCard({ product, index = 1 }) {
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const defaultSize = product.sizes[0] ?? "M";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative", "data-ocid": `product.item.${index}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: product.id }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden rounded-sm bg-muted mb-4 cursor-pointer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: product.images[0] ?? "/assets/images/placeholder.svg",
          alt: product.name,
          className: "w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex flex-col gap-1.5", children: [
        product.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent text-accent-foreground border-transparent text-[10px] uppercase tracking-wider", children: "New" }),
        product.isBestSeller && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-accent border-accent/40 text-[10px] uppercase tracking-wider",
            children: "Best Seller"
          }
        ),
        product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "destructive",
            className: "text-[10px] uppercase tracking-wider",
            children: "Sale"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "aria-label": wishlisted ? "Remove from wishlist" : "Add to wishlist",
          "data-ocid": `product.wishlist.${index}`,
          onClick: (e) => {
            e.preventDefault();
            toggle(product);
          },
          className: "absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full glassmorphism transition-smooth hover:scale-110",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Heart,
            {
              size: 15,
              className: cn(
                wishlisted ? "fill-accent text-accent" : "text-foreground/70 hover:text-accent"
              )
            }
          )
        }
      ),
      product.sizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-all duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "default",
          size: "sm",
          "data-ocid": `product.add_button.${index}`,
          className: "w-full rounded-none rounded-b-sm text-xs tracking-widest uppercase bg-accent text-accent-foreground hover:bg-accent/90",
          onClick: (e) => {
            e.preventDefault();
            addItem(product, defaultSize);
          },
          children: inCart ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 12 }),
            " In Bag"
          ] }) : "Quick Add"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/products/$id",
          params: { id: product.id },
          "data-ocid": `product.link.${index}`,
          className: "block",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm tracking-wide text-foreground uppercase hover:text-accent transition-colors line-clamp-1", children: product.name })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-body text-sm text-accent font-medium",
            "data-ocid": `product.price.${index}`,
            children: formatPrice(product.price)
          }
        ),
        product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-muted-foreground line-through", children: formatPrice(product.originalPrice) })
      ] })
    ] })
  ] });
}
export {
  ProductCard as P
};
