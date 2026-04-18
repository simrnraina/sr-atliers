import { c as createLucideIcon, e as useParams, f as useCart, g as useWishlist, h as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, a as Button, i as getRelatedProducts, B as Badge, k as formatPrice, l as ShoppingBag, H as Heart } from "./index-BU4uHDVH.js";
import { P as ProductCard } from "./ProductCard-z22AbCcR.js";
import { a as useProductById, s as sampleProducts } from "./useProducts-D2xGSJY0.js";
import { m as motion } from "./proxy-BQW_Dvzl.js";
import { A as AnimatePresence } from "./index-PGH7r6tF.js";
import { C as ChevronLeft, a as ChevronRight } from "./chevron-right-PoqaSm-K.js";
import { M as Minus } from "./minus-BGMoAr0Q.js";
import { P as Plus } from "./plus-D7xpqXQC.js";
import { C as Check } from "./check-Bts_O2Qz.js";
import { A as ArrowLeft } from "./arrow-left-BhcqkNER.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const FEATURES_BY_CATEGORY = {
  dresses: [
    "100% premium natural fabric",
    "Bias-cut silhouette for flattering drape",
    "Adjustable spaghetti straps",
    "Lined interior for comfortable wear"
  ],
  blazers: [
    "Italian-sourced fabrication",
    "Structured shoulders with soft pad",
    "Two front patch pockets",
    "Single centre-back vent"
  ],
  bags: [
    "Full-grain Italian leather exterior",
    "Gold-tone hardware throughout",
    "Interior zip and slip pockets",
    "Dust bag included"
  ],
  tops: [
    "Breathable natural fibre construction",
    "Relaxed, oversized silhouette",
    "Reinforced seams for longevity",
    "Machine washable at 30°C"
  ],
  bottoms: [
    "High-rise waistband with interior stay",
    "Fluid wide-leg silhouette",
    "Side invisible zip closure",
    "Fully lined for modesty"
  ],
  accessories: [
    "Artisan hand-finished construction",
    "Hypoallergenic metal fittings",
    "Comes in branded SR Atliers box",
    "Gift wrapping available"
  ]
};
function ProductDetail() {
  const { id } = useParams({ from: "/products/$id" });
  const { data: product, isLoading } = useProductById(id);
  const { addItem, isInCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = reactExports.useState(null);
  const [quantity, setQuantity] = reactExports.useState(1);
  const [activeImage, setActiveImage] = reactExports.useState(0);
  const [sizeError, setSizeError] = reactExports.useState(false);
  const [addedBounce, setAddedBounce] = reactExports.useState(false);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[3/4] bg-muted rounded-sm animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-20 bg-muted rounded-sm animate-pulse"
          },
          n
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-muted rounded w-2/3 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-muted rounded w-1/3 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-full animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-muted rounded w-4/5 animate-pulse" })
      ] })
    ] }) });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl uppercase mb-4", children: "Product Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Back to Collection" }) })
    ] });
  }
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const related = getRelatedProducts(product, sampleProducts);
  const features = FEATURES_BY_CATEGORY[product.category] ?? FEATURES_BY_CATEGORY.tops;
  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize ?? "M", quantity);
    setAddedBounce(true);
    setTimeout(() => setAddedBounce(false), 600);
  };
  const handleBuyNow = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize ?? "M", quantity);
    navigate({ to: "/cart" });
  };
  const prevImage = () => setActiveImage(
    (i) => (i - 1 + product.images.length) % product.images.length
  );
  const nextImage = () => setActiveImage((i) => (i + 1) % product.images.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "product-detail.page", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "nav",
      {
        className: "flex items-center gap-2 mb-8 text-xs font-body text-muted-foreground",
        "aria-label": "Breadcrumb",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              className: "hover:text-foreground transition-colors",
              children: "Collection"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate max-w-[200px]", children: product.name })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden rounded-sm bg-muted group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.img,
                {
                  src: product.images[activeImage] ?? "/assets/images/placeholder.svg",
                  alt: `${product.name} — view ${activeImage + 1}`,
                  className: "w-full h-full object-cover",
                  initial: { opacity: 0, scale: 1.03 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.98 },
                  transition: { duration: 0.35 }
                },
                activeImage
              ) }),
              product.images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Previous image",
                    "data-ocid": "product-detail.image.prev",
                    onClick: prevImage,
                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-sm bg-card/80 backdrop-blur-sm border border-border/40 text-foreground opacity-0 group-hover:opacity-100 transition-smooth hover:border-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Next image",
                    "data-ocid": "product-detail.image.next",
                    onClick: nextImage,
                    className: "absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-sm bg-card/80 backdrop-blur-sm border border-border/40 text-foreground opacity-0 group-hover:opacity-100 transition-smooth hover:border-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex flex-col gap-1.5", children: [
                product.isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent text-accent-foreground border-transparent text-[10px] uppercase tracking-wider", children: "New" }),
                product.isBestSeller && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "bg-card/80 backdrop-blur-sm text-accent border-accent/40 text-[10px] uppercase tracking-wider",
                    children: "Best Seller"
                  }
                ),
                product.stock <= 5 && product.stock > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "bg-card/80 backdrop-blur-sm text-destructive border-destructive/40 text-[10px] uppercase tracking-wider",
                    children: [
                      "Only ",
                      product.stock,
                      " left"
                    ]
                  }
                )
              ] })
            ] }),
            product.images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-3", children: product.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `product-detail.thumbnail.${i + 1}`,
                "aria-label": `View image ${i + 1}`,
                onClick: () => setActiveImage(i),
                className: `w-16 h-20 overflow-hidden rounded-sm transition-smooth flex-shrink-0 ${activeImage === i ? "ring-1 ring-accent opacity-100" : "opacity-50 hover:opacity-80"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img,
                    alt: "",
                    "aria-hidden": true,
                    className: "w-full h-full object-cover"
                  }
                )
              },
              img
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          className: "flex flex-col",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl lg:text-4xl uppercase tracking-wide mb-3", children: product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-baseline gap-3 mb-5",
                "data-ocid": "product-detail.price",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-2xl text-accent font-medium", children: formatPrice(product.price) }),
                  product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-base text-muted-foreground line-through", children: formatPrice(product.originalPrice) }),
                  product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/15 text-accent border-transparent text-[10px] uppercase tracking-wider", children: "Sale" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed mb-6", children: product.description }),
            product.sizes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs tracking-widest uppercase text-foreground mb-3 flex items-center gap-2", children: [
                "Size",
                sizeError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-destructive normal-case tracking-normal font-normal",
                    "data-ocid": "product-detail.size.field_error",
                    children: "— Please select a size"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `product-detail.size.${size}`,
                  onClick: () => {
                    setSelectedSize(size);
                    setSizeError(false);
                  },
                  className: `w-12 h-12 flex items-center justify-center font-body text-xs tracking-wider rounded-sm border transition-smooth ${selectedSize === size ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-foreground"}`,
                  children: size
                },
                size
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-7", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs tracking-widest uppercase text-foreground mb-3", children: "Quantity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0 border border-border rounded-sm w-fit", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Decrease quantity",
                    "data-ocid": "product-detail.qty.minus",
                    onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                    disabled: quantity <= 1,
                    className: "w-10 h-10 flex items-center justify-center text-foreground disabled:text-muted-foreground hover:bg-muted/60 transition-smooth border-r border-border",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-12 text-center font-body text-sm",
                    "data-ocid": "product-detail.qty.display",
                    children: quantity
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Increase quantity",
                    "data-ocid": "product-detail.qty.plus",
                    onClick: () => setQuantity((q) => Math.min(q + 1, product.stock)),
                    disabled: quantity >= product.stock,
                    className: "w-10 h-10 flex items-center justify-center text-foreground disabled:text-muted-foreground hover:bg-muted/60 transition-smooth border-l border-border",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: addedBounce ? { scale: [1, 0.96, 1.02, 1] } : { scale: 1 },
                  transition: { duration: 0.4 },
                  className: "flex-1",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "lg",
                      "data-ocid": "product-detail.add_button",
                      onClick: handleAddToCart,
                      className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body text-xs tracking-widest uppercase",
                      children: inCart ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
                        "Added to Bag"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14 }),
                        "Add to Bag"
                      ] })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  "data-ocid": "product-detail.buy_now_button",
                  onClick: handleBuyNow,
                  className: "flex-1 font-body text-xs tracking-widest uppercase border-foreground/40 hover:border-foreground hover:bg-foreground hover:text-background transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 14 }),
                    "Buy Now"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": wishlisted ? "Remove from wishlist" : "Save to wishlist",
                  "data-ocid": "product-detail.wishlist_button",
                  onClick: () => toggle(product),
                  className: "w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-sm border border-border hover:border-accent transition-smooth",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Heart,
                    {
                      size: 18,
                      className: wishlisted ? "fill-accent text-accent" : "text-muted-foreground"
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/50 pt-6 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs tracking-widest uppercase text-foreground mb-4", children: "Key Features" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: features.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-muted-foreground leading-relaxed", children: feat })
              ] }, feat)) })
            ] }),
            product.tags && product.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 border-t border-border/50 pt-5", children: product.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "capitalize font-body text-xs",
                children: tag
              },
              tag
            )) })
          ]
        }
      )
    ] }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
        className: "mt-24 pt-16 border-t border-border/50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1", children: "You May Also Like" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl uppercase tracking-wide", children: "Related Pieces" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/products",
                className: "font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-accent flex items-center gap-1 transition-colors",
                children: [
                  "View All",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 12, className: "rotate-180" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6", children: related.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.35, delay: i * 0.07 },
              "data-ocid": `product-detail.related.item.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i + 1 })
            },
            p.id
          )) })
        ]
      }
    )
  ] }) });
}
export {
  ProductDetail as default
};
