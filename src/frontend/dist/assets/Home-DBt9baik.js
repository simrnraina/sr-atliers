import { c as createLucideIcon, j as jsxRuntimeExports, B as Badge, L as Link, a as Button, b as LoadingSkeleton, r as reactExports } from "./index-BU4uHDVH.js";
import { P as ProductCard } from "./ProductCard-z22AbCcR.js";
import { u as useProducts } from "./useProducts-D2xGSJY0.js";
import { m as motion } from "./proxy-BQW_Dvzl.js";
import { A as ArrowRight } from "./arrow-right-CqzpsBq3.js";
import { A as AnimatePresence } from "./index-PGH7r6tF.js";
import { C as ChevronLeft, a as ChevronRight } from "./chevron-right-PoqaSm-K.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$1);
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const COLLECTIONS = [
  {
    label: "New Arrivals",
    slug: "new-arrivals",
    description: "Fresh from the atelier",
    image: "/assets/generated/dress-cream.dim_800x1000.jpg"
  },
  {
    label: "Trending Now",
    slug: "trending",
    description: "What the world is wearing",
    image: "/assets/generated/blazer-beige.dim_800x1000.jpg"
  },
  {
    label: "Best Sellers",
    slug: "best-sellers",
    description: "Timeless favourites",
    image: "/assets/generated/collection-bestsellers.dim_800x1000.jpg"
  }
];
const TESTIMONIALS = [
  {
    quote: "SR Atliers redefined my wardrobe. Every piece is crafted with such intention — you feel the quality the moment you put it on.",
    author: "Priya M.",
    location: "Mumbai",
    stars: 5
  },
  {
    quote: "The silk blazer arrived beautifully packaged and fit perfectly. This is what luxury dressing feels like.",
    author: "Sofia L.",
    location: "London",
    stars: 5
  },
  {
    quote: "I've been searching for a brand that merges elegance with modern sensibility. SR Atliers is exactly that.",
    author: "Aarav K.",
    location: "Dubai",
    stars: 5
  },
  {
    quote: "The craftsmanship on the cashmere coat is extraordinary. Worth every penny — I wear it almost every day.",
    author: "Céline B.",
    location: "Paris",
    stars: 5
  },
  {
    quote: "Exceptional quality and the most beautiful packaging. I gifted a scarf to my mother and she was speechless.",
    author: "Natalia V.",
    location: "Milan",
    stars: 5
  }
];
const BRAND_VALUES = [
  { label: "Timeless Craft", desc: "Made to last generations" },
  { label: "Modern Elegance", desc: "Luxury for today's woman" },
  { label: "Ethical Sourcing", desc: "Artisan partnerships globally" }
];
function Home() {
  const { data: products, isLoading } = useProducts();
  const showcaseProducts = (products == null ? void 0 : products.slice(0, 8)) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-hidden", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CollectionsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProductShowcase, { products: showcaseProducts, isLoading }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterSection, {})
  ] });
}
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative min-h-[92vh] flex items-end overflow-hidden",
      "data-ocid": "home.hero.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/hero-editorial.dim_1600x900.jpg",
            alt: "SR Atliers — Elevate Your Style",
            className: "absolute inset-0 w-full h-full object-cover object-center",
            fetchPriority: "high"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 lg:pb-32 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            className: "max-w-2xl",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: -20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.7, delay: 0.2 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mb-6 bg-accent/25 text-accent border-accent/50 uppercase tracking-[0.2em] text-[10px] font-body px-3", children: "SS 2026 Collection" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-6xl md:text-7xl lg:text-[90px] uppercase tracking-tight leading-[0.88] mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.8, delay: 0.3 },
                    className: "block",
                    style: { color: "#C4956A" },
                    children: "Elevate"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.8, delay: 0.45 },
                    className: "block",
                    style: { color: "#C4956A" },
                    children: "Your Style"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.8, delay: 0.6 },
                    className: "block",
                    style: { color: "#C4956A" },
                    children: "with SR Atliers"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.8, delay: 0.8 },
                  className: "font-body text-base text-background/80 mb-10 max-w-md leading-relaxed",
                  children: "Discover curated collections of timeless elegance and modern sophistication — crafted for the discerning individual."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay: 1 },
                  className: "flex flex-col sm:flex-row gap-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        size: "lg",
                        "data-ocid": "home.hero.shop_button",
                        className: "bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-[0.18em] text-xs font-body px-8 h-12 transition-smooth",
                        children: "Shop Now"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#collections", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "lg",
                        "data-ocid": "home.hero.explore_button",
                        className: "uppercase tracking-[0.18em] text-xs font-body px-8 h-12 transition-smooth",
                        style: {
                          backgroundColor: "#FBBF24",
                          color: "#1a1a00",
                          border: "none"
                        },
                        children: [
                          "Explore Collection ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                        ]
                      }
                    ) })
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.4, duration: 0.8 },
            className: "absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-[10px] tracking-[0.25em] uppercase text-background/50 rotate-90 origin-center mb-4", children: "Scroll" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { y: [0, 8, 0] },
                  transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                  className: "w-px h-12 bg-gradient-to-b from-background/50 to-transparent"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function CollectionsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "collections",
      className: "py-20 lg:py-28 bg-background",
      "data-ocid": "home.collections.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "flex flex-col md:flex-row md:items-end justify-between mb-12",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3", children: "Curated For You" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl lg:text-5xl uppercase tracking-wide", children: "Featured Collections" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/products",
                  "data-ocid": "home.collections.view_all",
                  className: "font-body text-xs text-muted-foreground transition-colors mt-4 md:mt-0 flex items-center gap-1.5 tracking-widest uppercase hover:text-foreground",
                  children: [
                    "View All ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7", children: COLLECTIONS.map((col, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 40 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.55, delay: i * 0.12 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/products",
                "data-ocid": `home.collection.item.${i + 1}`,
                className: "block group cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[3/4] bg-muted overflow-hidden rounded-sm mb-5 relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: col.image,
                        alt: col.label,
                        className: "w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105",
                        loading: "lazy"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/12 transition-all duration-500" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-5 left-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-block font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-yellow-500/60",
                        style: { backgroundColor: "#FBBF24", color: "#1a1a00" },
                        children: col.label
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 right-5 w-8 h-8 rounded-full bg-accent/0 group-hover:bg-accent/90 flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ArrowRight,
                      {
                        size: 13,
                        className: "text-accent-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm tracking-[0.15em] uppercase text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300", children: col.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground", children: col.description })
                ]
              }
            )
          },
          col.slug
        )) })
      ] })
    }
  );
}
function ProductShowcase({ products, isLoading }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-20 lg:py-28 bg-muted/25",
      "data-ocid": "home.products.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "text-center mb-14",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3", children: "The Edit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl lg:text-5xl uppercase tracking-wide", children: "New Season Pieces" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-px bg-accent mx-auto mt-5" })
            ]
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { count: 8 }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-12", children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.45, delay: i % 4 * 0.08 },
            "data-ocid": `home.products.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i + 1 })
          },
          product.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: 0.3 },
            className: "text-center mt-16",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "lg",
                "data-ocid": "home.products.view_all_button",
                className: "uppercase tracking-[0.18em] text-xs font-body px-10 h-12 transition-smooth hover:bg-foreground hover:text-background border-foreground/30 hover:border-foreground",
                children: [
                  "View All Products ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                ]
              }
            ) })
          }
        )
      ] })
    }
  );
}
function AboutSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "about",
      className: "py-20 lg:py-28 bg-background",
      "data-ocid": "home.about.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -40 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            className: "relative",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] rounded-sm overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/coat-camel.dim_800x1000.jpg",
                  alt: "SR Atliers — The Brand Story",
                  className: "w-full h-full object-cover",
                  loading: "lazy"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.9 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.6, delay: 0.4 },
                  className: "absolute -bottom-6 -right-4 lg:-right-8 glassmorphism p-6 rounded-sm border border-border/20 shadow-lg max-w-[200px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-accent mb-1", children: "2018" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-muted-foreground leading-relaxed", children: "Founded in the heart of luxury craftsmanship" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 40 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: {
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1]
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[10px] tracking-[0.28em] uppercase text-accent mb-5", children: "Our Story" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-4xl lg:text-5xl uppercase tracking-wide leading-tight mb-8", children: [
                "Crafted for the",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-accent", children: "Modern Icon" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed mb-5", children: "SR Atliers was born from a belief that luxury should be personal. Founded on the principles of impeccable craft, thoughtful design, and enduring style, every piece we create is an invitation to inhabit your most confident self." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-muted-foreground leading-relaxed mb-10", children: "From the weight of our silks to the precision of our cuts, each detail is deliberate. We work with artisans who share our obsession with quality — because exceptional clothing is never accidental." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 mb-10 pt-8 border-t border-border/40", children: BRAND_VALUES.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs tracking-[0.1em] uppercase text-foreground mb-1", children: v.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[11px] text-muted-foreground leading-relaxed", children: v.desc })
              ] }, v.label)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  "data-ocid": "home.about.shop_button",
                  className: "bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-[0.18em] text-xs font-body px-8 h-12 transition-smooth",
                  children: "Shop the Collection"
                }
              ) })
            ]
          }
        )
      ] }) })
    }
  );
}
function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = reactExports.useState(0);
  const total = TESTIMONIALS.length;
  const prev = reactExports.useCallback(
    () => setActiveIdx((i) => (i - 1 + total) % total),
    [total]
  );
  const next = reactExports.useCallback(() => setActiveIdx((i) => (i + 1) % total), [total]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-20 lg:py-28 bg-muted/25 overflow-hidden",
      "data-ocid": "home.testimonials.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "text-center mb-14",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3", children: "Client Stories" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl lg:text-5xl uppercase tracking-wide", children: "What They Say" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-px bg-accent mx-auto mt-5" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:grid md:grid-cols-3 gap-6 lg:gap-8", children: TESTIMONIALS.slice(0, 3).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: i * 0.12 },
            className: "bg-card border border-border/40 rounded-sm p-8 flex flex-col",
            "data-ocid": `home.testimonial.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { count: t.stars }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground leading-relaxed italic my-6 flex-1", children: [
                '"',
                t.quote,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-border/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm text-accent", children: t.author[0] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-medium text-foreground truncate", children: t.author }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[11px] text-muted-foreground", children: t.location })
                ] })
              ] })
            ]
          },
          t.author
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 60 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -60 },
              transition: { duration: 0.35 },
              className: "bg-card border border-border/40 rounded-sm p-7",
              "data-ocid": `home.testimonial.item.${activeIdx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { count: TESTIMONIALS[activeIdx].stars }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-muted-foreground leading-relaxed italic my-5", children: [
                  '"',
                  TESTIMONIALS[activeIdx].quote,
                  '"'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-border/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm text-accent", children: TESTIMONIALS[activeIdx].author[0] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-medium text-foreground", children: TESTIMONIALS[activeIdx].author }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[11px] text-muted-foreground", children: TESTIMONIALS[activeIdx].location })
                  ] })
                ] })
              ]
            },
            activeIdx
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: prev,
                "aria-label": "Previous testimonial",
                "data-ocid": "home.testimonials.prev_button",
                className: "w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-smooth",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveIdx(i),
                "aria-label": `Testimonial ${i + 1}`,
                className: `h-px transition-all duration-300 ${i === activeIdx ? "w-8 bg-accent" : "w-4 bg-border"}`
              },
              t.author
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: next,
                "aria-label": "Next testimonial",
                "data-ocid": "home.testimonials.next_button",
                className: "w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-smooth",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];
function StarRating({ count }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: STAR_KEYS.slice(0, count).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 13, className: "fill-accent text-accent" }, k)) });
}
function NewsletterSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-20 lg:py-28 bg-foreground text-background",
      id: "contact",
      "data-ocid": "home.newsletter.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[1400px] mx-auto px-6 lg:px-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.65 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: { scale: [1, 1.05, 1] },
                transition: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                className: "inline-block mb-6",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { size: 30, className: "text-accent" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl lg:text-5xl uppercase tracking-wide text-background mb-5", children: "Join the Inner Circle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-background/70 leading-relaxed mb-8", children: [
              "Be first to know about new collections, exclusive offers, and behind-the-scenes stories. Follow us on",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "https://instagram.com/sr_atliers",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-ocid": "home.newsletter.instagram_link",
                  className: "text-accent hover:underline underline-offset-2",
                  children: "@sr_atliers"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(NewsletterForm, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-[11px] text-background/40 mt-5 leading-relaxed", children: "No spam, ever. Unsubscribe at any time. By subscribing you agree to our Privacy Policy." })
          ]
        }
      ) }) })
    }
  );
}
function NewsletterForm() {
  const [email, setEmail] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        "data-ocid": "newsletter.success_state",
        className: "py-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-display text-lg", children: "✓" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-accent font-medium", children: "Welcome to the circle. Watch your inbox." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "flex gap-0 max-w-md mx-auto",
      "data-ocid": "newsletter.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            placeholder: "Your email address",
            required: true,
            "data-ocid": "newsletter.email.input",
            className: "flex-1 bg-background/10 border border-background/20 border-r-0 text-background placeholder:text-background/40 text-sm font-body px-5 py-3.5 outline-none focus:border-accent transition-colors rounded-sm rounded-r-none min-w-0"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            "data-ocid": "newsletter.submit_button",
            className: "bg-accent text-accent-foreground font-body text-[10px] tracking-[0.22em] uppercase px-7 py-3.5 rounded-sm rounded-l-none hover:opacity-90 transition-smooth whitespace-nowrap shrink-0",
            children: "Subscribe"
          }
        )
      ]
    }
  );
}
export {
  Home as default
};
