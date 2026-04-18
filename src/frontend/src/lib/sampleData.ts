import type { Product } from "../types";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Tailored Silk Blazer",
    price: 1250,
    category: "blazers",
    images: ["/assets/generated/blazer-beige.dim_800x1000.jpg"],
    description:
      "Impeccably tailored in fine Italian silk, this blazer embodies effortless authority. Clean lines and a relaxed silhouette create the perfect balance of structure and ease.",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 15,
    isTrending: true,
    tags: ["silk", "tailored", "workwear"],
  },
  {
    id: "2",
    name: "Luxury Silk Slip Dress",
    price: 980,
    category: "dresses",
    images: ["/assets/generated/dress-cream.dim_800x1000.jpg"],
    description:
      "Draped in weightless silk, this slip dress moves like a second skin. The bias cut flatters every silhouette, transitioning seamlessly from day to evening.",
    sizes: ["XS", "S", "M", "L"],
    stock: 10,
    isNew: true,
    tags: ["silk", "evening", "minimal"],
  },
  {
    id: "3",
    name: "Structured Leather Tote",
    price: 1640,
    category: "bags",
    images: ["/assets/generated/bag-tan.dim_800x1000.jpg"],
    description:
      "Crafted from full-grain Italian leather, this tote transcends seasons. The minimalist hardware and spacious interior make it indispensable for the modern woman.",
    sizes: [],
    stock: 8,
    isBestSeller: true,
    tags: ["leather", "tote", "everyday"],
  },
  {
    id: "4",
    name: "Midnight Velvet Gown",
    price: 2200,
    category: "dresses",
    images: ["/assets/generated/gown-black.dim_800x1000.jpg"],
    description:
      "A masterwork in deep velvet, this floor-length gown commands attention with understated drama. The open back detail reveals just enough.",
    sizes: ["XS", "S", "M", "L"],
    stock: 5,
    isNew: true,
    tags: ["velvet", "evening", "gown"],
  },
  {
    id: "5",
    name: "Cashmere Wrap Coat",
    price: 2850,
    originalPrice: 3200,
    category: "blazers",
    images: ["/assets/generated/coat-camel.dim_800x1000.jpg"],
    description:
      "Pure cashmere in a timeless camel hue, this wrap coat is the cornerstone of a luxury wardrobe. The generous lapels and belted waist create an effortlessly polished look.",
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    isBestSeller: true,
    tags: ["cashmere", "coat", "winter"],
  },
  {
    id: "6",
    name: "Pleated Silk Trousers",
    price: 720,
    category: "bottoms",
    images: ["/assets/generated/trousers-ivory.dim_800x1000.jpg"],
    description:
      "Wide-leg silk trousers with a high-rise waist and elegant pleats. The fluid drape creates a statuesque silhouette perfect for any refined occasion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 12,
    tags: ["silk", "wide-leg", "elegant"],
  },
  {
    id: "7",
    name: "Chain-Detail Crossbody",
    price: 890,
    category: "bags",
    images: ["/assets/generated/bag-crossbody.dim_800x1000.jpg"],
    description:
      "Compact yet capacious, this crossbody features a delicate gold chain strap and quilted lambskin exterior. The magnetic clasp adds both function and style.",
    sizes: [],
    stock: 9,
    isTrending: true,
    tags: ["leather", "crossbody", "chain"],
  },
  {
    id: "8",
    name: "Linen Tailored Shirt",
    price: 480,
    category: "tops",
    images: ["/assets/generated/shirt-white.dim_800x1000.jpg"],
    description:
      "Stone-washed Italian linen in pure white. Oversized fit with dropped shoulders and a relaxed collar that effortlessly bridges casual and formal.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 20,
    tags: ["linen", "shirt", "casual"],
  },
  {
    id: "9",
    name: "Suede Ankle Boots",
    price: 1120,
    category: "accessories",
    images: ["/assets/generated/boots-suede.dim_800x1000.jpg"],
    description:
      "Hand-stitched suede ankle boots with a stacked heel. The tobacco hue complements both warm and cool tones, making them the most versatile piece in any wardrobe.",
    sizes: ["S", "M", "L"],
    stock: 6,
    isBestSeller: true,
    tags: ["suede", "boots", "footwear"],
  },
  {
    id: "10",
    name: "Merino Turtleneck",
    price: 560,
    category: "tops",
    images: ["/assets/generated/turtleneck-beige.dim_800x1000.jpg"],
    description:
      "Superfine merino wool in a warm beige tone. The ribbed turtleneck sits perfectly while the relaxed body keeps it effortlessly modern.",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    isNew: true,
    tags: ["merino", "knitwear", "winter"],
  },
  {
    id: "11",
    name: "Silk Scarf — Heritage",
    price: 340,
    category: "accessories",
    images: ["/assets/generated/scarf-silk.dim_800x1000.jpg"],
    description:
      "Hand-rolled edges on 100% Habotai silk. The abstract botanical print in earthy tones is versatile enough to wear as a headscarf, neck tie, or bag accent.",
    sizes: [],
    stock: 25,
    tags: ["silk", "scarf", "print"],
  },
  {
    id: "12",
    name: "High-Waist Palazzo Pants",
    price: 660,
    category: "bottoms",
    images: ["/assets/generated/palazzo-black.dim_800x1000.jpg"],
    description:
      "Sweeping palazzo silhouette in matte crepe. The ultra-high waist and wide legs create an elongating effect that is both commanding and comfortable.",
    sizes: ["XS", "S", "M", "L"],
    stock: 11,
    isTrending: true,
    tags: ["palazzo", "crepe", "evening"],
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return sampleProducts;
  return sampleProducts.filter((p) => p.category === category);
};

export const getNewArrivals = (): Product[] =>
  sampleProducts.filter((p) => p.isNew);

export const getTrending = (): Product[] =>
  sampleProducts.filter((p) => p.isTrending);

export const getBestSellers = (): Product[] =>
  sampleProducts.filter((p) => p.isBestSeller);

export const getProductById = (id: string): Product | undefined =>
  sampleProducts.find((p) => p.id === id);

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return sampleProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.includes(q)),
  );
};
