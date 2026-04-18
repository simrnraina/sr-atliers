import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { ProductCategory } from "../types";

const CATEGORIES: {
  label: string;
  value: ProductCategory | "all" | "trending" | "best-sellers";
}[] = [
  { label: "All", value: "all" },
  { label: "New Arrivals", value: "new-arrivals" },
  { label: "Trending", value: "trending" },
  { label: "Best Sellers", value: "best-sellers" },
  { label: "Dresses", value: "dresses" },
  { label: "Blazers", value: "blazers" },
  { label: "Tops", value: "tops" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Bags", value: "bags" },
  { label: "Accessories", value: "accessories" },
];

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Trending", value: "trending" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const MAX_PRICE = 3200;

export default function Products() {
  const { data: products, isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState("featured");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    MAX_PRICE,
  ]);
  const [showFilters, setShowFilters] = useState(false);

  const handleClearSearch = useCallback(() => setSearch(""), []);
  const handleClearCategory = useCallback(() => setActiveCategory("all"), []);
  const handleClearPrice = useCallback(() => setPriceRange([0, MAX_PRICE]), []);

  const activeChips = useMemo(() => {
    const chips: { id: string; label: string; onRemove: () => void }[] = [];
    if (search.trim())
      chips.push({
        id: "search",
        label: `"${search}"`,
        onRemove: handleClearSearch,
      });
    if (activeCategory !== "all") {
      const cat = CATEGORIES.find((c) => c.value === activeCategory);
      chips.push({
        id: "category",
        label: cat?.label ?? activeCategory,
        onRemove: handleClearCategory,
      });
    }
    if (priceRange[0] > 0 || priceRange[1] < MAX_PRICE) {
      chips.push({
        id: "price",
        label: `₹${priceRange[0]} – ₹${priceRange[1]}`,
        onRemove: handleClearPrice,
      });
    }
    return chips;
  }, [
    search,
    activeCategory,
    priceRange,
    handleClearSearch,
    handleClearCategory,
    handleClearPrice,
  ]);

  const filtered = useMemo(() => {
    const all = products ?? [];
    const q = search.toLowerCase().trim();

    return all.filter((p) => {
      // Category
      if (activeCategory === "new-arrivals" && !p.isNew) return false;
      if (activeCategory === "trending" && !p.isTrending) return false;
      if (activeCategory === "best-sellers" && !p.isBestSeller) return false;
      if (
        activeCategory !== "all" &&
        activeCategory !== "new-arrivals" &&
        activeCategory !== "trending" &&
        activeCategory !== "best-sellers" &&
        p.category !== activeCategory
      )
        return false;

      // Price
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

      // Search
      if (q) {
        const inName = p.name.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inTags =
          p.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        if (!inName && !inDesc && !inTags) return false;
      }

      return true;
    });
  }, [products, activeCategory, priceRange, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === "trending")
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      return 0;
    });
  }, [filtered, sortBy]);

  return (
    <div className="min-h-screen" data-ocid="products.page">
      {/* Page header */}
      <div className="bg-muted/30 border-b border-border/50 py-14">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              SR Atliers
            </p>
            <h1 className="font-display text-4xl lg:text-5xl uppercase tracking-wide mb-6">
              The Collection
            </h1>

            {/* Search bar */}
            <div className="relative max-w-md">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <Input
                type="text"
                placeholder="Search pieces..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="products.search_input"
                className="pl-10 pr-9 bg-card border-border/60 font-body text-sm focus:border-accent transition-colors"
              />
              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-card border-b border-border/50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-3">
          <div className="flex items-center gap-4">
            {/* Category pills — scroll horizontally */}
            <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto scrollbar-none flex-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  data-ocid={`products.filter.${cat.value}`}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`font-body text-[11px] tracking-widest uppercase whitespace-nowrap px-3 py-1.5 rounded-sm transition-smooth flex-shrink-0 ${
                    activeCategory === cat.value
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Price filter toggle */}
              <button
                type="button"
                data-ocid="products.price_filter.toggle"
                onClick={() => setShowFilters((v) => !v)}
                className={`flex items-center gap-1.5 font-body text-xs tracking-wider uppercase px-3 py-1.5 rounded-sm border transition-smooth ${
                  showFilters
                    ? "bg-foreground text-background border-foreground"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground"
                }`}
              >
                <SlidersHorizontal size={12} />
                Filter
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                data-ocid="products.sort.select"
                className="bg-transparent border border-border/60 rounded-sm px-3 py-1.5 text-xs font-body text-foreground outline-none focus:border-accent transition-colors"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-card">
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price range panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 border-t border-border/30 mt-3 flex items-center gap-6">
                  <p className="font-body text-xs tracking-widest uppercase text-muted-foreground flex-shrink-0">
                    Price Range
                  </p>
                  <div className="flex-1 max-w-xs">
                    <Slider
                      min={0}
                      max={MAX_PRICE}
                      step={50}
                      value={priceRange}
                      onValueChange={(val) =>
                        setPriceRange(val as [number, number])
                      }
                      data-ocid="products.price_range.slider"
                      className="[&_[data-orientation=horizontal]]:h-1"
                    />
                  </div>
                  <span className="font-body text-xs text-muted-foreground whitespace-nowrap">
                    ₹{priceRange[0]} — ₹{priceRange[1]}
                  </span>
                  {(priceRange[0] > 0 || priceRange[1] < MAX_PRICE) && (
                    <button
                      type="button"
                      onClick={handleClearPrice}
                      className="font-body text-xs text-accent hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10">
        {/* Meta row: count + active chips */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <p
            className="font-body text-xs text-muted-foreground"
            data-ocid="products.count"
          >
            Showing{" "}
            <span className="text-foreground font-medium">{sorted.length}</span>{" "}
            {sorted.length === 1 ? "piece" : "pieces"}
          </p>

          {/* Active filter chips */}
          <AnimatePresence>
            {activeChips.map((chip) => (
              <motion.button
                key={chip.id}
                type="button"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                onClick={chip.onRemove}
                data-ocid={`products.chip.${chip.id}`}
                className="flex items-center gap-1.5 font-body text-[11px] tracking-wide border border-accent/40 text-accent bg-accent/8 px-2.5 py-1 rounded-sm hover:bg-accent/20 transition-smooth"
              >
                {chip.label}
                <X size={10} />
              </motion.button>
            ))}
          </AnimatePresence>

          {activeChips.length > 1 && (
            <button
              type="button"
              data-ocid="products.clear_all"
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setPriceRange([0, MAX_PRICE]);
              }}
              className="font-body text-xs text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {isLoading ? (
          <LoadingSkeleton count={6} />
        ) : sorted.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-28"
            data-ocid="products.empty_state"
          >
            <p className="font-display text-3xl text-muted-foreground/50 mb-3 uppercase tracking-wide">
              No pieces found
            </p>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Try adjusting your search or filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setPriceRange([0, MAX_PRICE]);
              }}
              className="font-body text-xs tracking-widest uppercase"
            >
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
            {sorted.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.48) }}
                data-ocid={`products.item.${i + 1}`}
              >
                <ProductCard product={product} index={i + 1} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
