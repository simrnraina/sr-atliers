import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Star,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useCallback, useRef, useState } from "react";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types";

// ─── Data ────────────────────────────────────────────────────────────────────

const COLLECTIONS = [
  {
    label: "New Arrivals",
    slug: "new-arrivals",
    description: "Fresh from the atelier",
    image: "/assets/generated/dress-cream.dim_800x1000.jpg",
  },
  {
    label: "Trending Now",
    slug: "trending",
    description: "What the world is wearing",
    image: "/assets/generated/blazer-beige.dim_800x1000.jpg",
  },
  {
    label: "Best Sellers",
    slug: "best-sellers",
    description: "Timeless favourites",
    image: "/assets/generated/collection-bestsellers.dim_800x1000.jpg",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "SR Atliers redefined my wardrobe. Every piece is crafted with such intention — you feel the quality the moment you put it on.",
    author: "Priya M.",
    location: "Mumbai",
    stars: 5,
  },
  {
    quote:
      "The silk blazer arrived beautifully packaged and fit perfectly. This is what luxury dressing feels like.",
    author: "Sofia L.",
    location: "London",
    stars: 5,
  },
  {
    quote:
      "I've been searching for a brand that merges elegance with modern sensibility. SR Atliers is exactly that.",
    author: "Aarav K.",
    location: "Dubai",
    stars: 5,
  },
  {
    quote:
      "The craftsmanship on the cashmere coat is extraordinary. Worth every penny — I wear it almost every day.",
    author: "Céline B.",
    location: "Paris",
    stars: 5,
  },
  {
    quote:
      "Exceptional quality and the most beautiful packaging. I gifted a scarf to my mother and she was speechless.",
    author: "Natalia V.",
    location: "Milan",
    stars: 5,
  },
];

const BRAND_VALUES = [
  { label: "Timeless Craft", desc: "Made to last generations" },
  { label: "Modern Elegance", desc: "Luxury for today's woman" },
  { label: "Ethical Sourcing", desc: "Artisan partnerships globally" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const { data: products, isLoading } = useProducts();
  const showcaseProducts = products?.slice(0, 8) ?? [];

  return (
    <div className="overflow-x-hidden" data-ocid="home.page">
      <HeroSection />
      <CollectionsSection />
      <ProductShowcase products={showcaseProducts} isLoading={isLoading} />
      <AboutSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-end overflow-hidden"
      data-ocid="home.hero.section"
    >
      {/* Background image */}
      <img
        src="/assets/generated/hero-editorial.dim_1600x900.jpg"
        alt="SR Atliers — Elevate Your Style"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Multi-layer gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 lg:pb-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Badge className="mb-6 bg-accent/25 text-accent border-accent/50 uppercase tracking-[0.2em] text-[10px] font-body px-3">
              SS 2026 Collection
            </Badge>
          </motion.div>

          <h1 className="font-display text-6xl md:text-7xl lg:text-[90px] uppercase tracking-tight leading-[0.88] mb-6">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block"
              style={{ color: "#C4956A" }}
            >
              Elevate
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="block"
              style={{ color: "#C4956A" }}
            >
              Your Style
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block"
              style={{ color: "#C4956A" }}
            >
              with SR Atliers
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-body text-base text-background/80 mb-10 max-w-md leading-relaxed"
          >
            Discover curated collections of timeless elegance and modern
            sophistication — crafted for the discerning individual.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/products">
              <Button
                size="lg"
                data-ocid="home.hero.shop_button"
                className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-[0.18em] text-xs font-body px-8 h-12 transition-smooth"
              >
                Shop Now
              </Button>
            </Link>
            <a href="#collections">
              <Button
                size="lg"
                data-ocid="home.hero.explore_button"
                className="uppercase tracking-[0.18em] text-xs font-body px-8 h-12 transition-smooth"
                style={{
                  backgroundColor: "#FBBF24",
                  color: "#1a1a00",
                  border: "none",
                }}
              >
                Explore Collection <ArrowRight size={14} />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.25em] uppercase text-background/50 rotate-90 origin-center mb-4">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-px h-12 bg-gradient-to-b from-background/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── Collections ──────────────────────────────────────────────────────────────

function CollectionsSection() {
  return (
    <section
      id="collections"
      className="py-20 lg:py-28 bg-background"
      data-ocid="home.collections.section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <p className="font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">
              Curated For You
            </p>
            <h2 className="font-display text-3xl lg:text-5xl uppercase tracking-wide">
              Featured Collections
            </h2>
          </div>
          <Link
            to="/products"
            data-ocid="home.collections.view_all"
            className="font-body text-xs text-muted-foreground transition-colors mt-4 md:mt-0 flex items-center gap-1.5 tracking-widest uppercase hover:text-foreground"
          >
            View All <ArrowRight size={13} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
            >
              <Link
                to="/products"
                data-ocid={`home.collection.item.${i + 1}`}
                className="block group cursor-pointer"
              >
                <div className="aspect-[3/4] bg-muted overflow-hidden rounded-sm mb-5 relative">
                  <img
                    src={col.image}
                    alt={col.label}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/12 transition-all duration-500" />

                  {/* Category pill */}
                  <div className="absolute bottom-5 left-5">
                    <span
                      className="inline-block font-body text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-yellow-500/60"
                      style={{ backgroundColor: "#FBBF24", color: "#1a1a00" }}
                    >
                      {col.label}
                    </span>
                  </div>

                  {/* Arrow indicator on hover */}
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-accent/0 group-hover:bg-accent/90 flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100">
                    <ArrowRight
                      size={13}
                      className="text-accent-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
                <h3 className="font-display text-sm tracking-[0.15em] uppercase text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">
                  {col.label}
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  {col.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Showcase ─────────────────────────────────────────────────────────

interface ShowcaseProps {
  products: Product[];
  isLoading: boolean;
}

function ProductShowcase({ products, isLoading }: ShowcaseProps) {
  return (
    <section
      className="py-20 lg:py-28 bg-muted/25"
      data-ocid="home.products.section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">
            The Edit
          </p>
          <h2 className="font-display text-3xl lg:text-5xl uppercase tracking-wide">
            New Season Pieces
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </motion.div>

        {isLoading ? (
          <LoadingSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-12">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
                data-ocid={`home.products.item.${i + 1}`}
              >
                <ProductCard product={product} index={i + 1} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link to="/products">
            <Button
              variant="outline"
              size="lg"
              data-ocid="home.products.view_all_button"
              className="uppercase tracking-[0.18em] text-xs font-body px-10 h-12 transition-smooth hover:bg-foreground hover:text-background border-foreground/30 hover:border-foreground"
            >
              View All Products <ArrowRight size={14} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Brand ──────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-background"
      data-ocid="home.about.section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-sm overflow-hidden bg-muted">
              <img
                src="/assets/generated/coat-camel.dim_800x1000.jpg"
                alt="SR Atliers — The Brand Story"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 lg:-right-8 glassmorphism p-6 rounded-sm border border-border/20 shadow-lg max-w-[200px]"
            >
              <p className="font-display text-2xl text-accent mb-1">2018</p>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Founded in the heart of luxury craftsmanship
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="font-body text-[10px] tracking-[0.28em] uppercase text-accent mb-5">
              Our Story
            </p>
            <h2 className="font-display text-4xl lg:text-5xl uppercase tracking-wide leading-tight mb-8">
              Crafted for the
              <br />
              <em className="not-italic text-accent">Modern Icon</em>
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
              SR Atliers was born from a belief that luxury should be personal.
              Founded on the principles of impeccable craft, thoughtful design,
              and enduring style, every piece we create is an invitation to
              inhabit your most confident self.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
              From the weight of our silks to the precision of our cuts, each
              detail is deliberate. We work with artisans who share our
              obsession with quality — because exceptional clothing is never
              accidental.
            </p>

            {/* Brand values */}
            <div className="grid grid-cols-3 gap-4 mb-10 pt-8 border-t border-border/40">
              {BRAND_VALUES.map((v) => (
                <div key={v.label}>
                  <p className="font-display text-xs tracking-[0.1em] uppercase text-foreground mb-1">
                    {v.label}
                  </p>
                  <p className="font-body text-[11px] text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/products">
              <Button
                size="lg"
                data-ocid="home.about.shop_button"
                className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase tracking-[0.18em] text-xs font-body px-8 h-12 transition-smooth"
              >
                Shop the Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Slider ──────────────────────────────────────────────────────

function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = TESTIMONIALS.length;

  const prev = useCallback(
    () => setActiveIdx((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setActiveIdx((i) => (i + 1) % total), [total]);

  return (
    <section
      className="py-20 lg:py-28 bg-muted/25 overflow-hidden"
      data-ocid="home.testimonials.section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-3">
            Client Stories
          </p>
          <h2 className="font-display text-3xl lg:text-5xl uppercase tracking-wide">
            What They Say
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </motion.div>

        {/* Desktop: 3-card grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-card border border-border/40 rounded-sm p-8 flex flex-col"
              data-ocid={`home.testimonial.item.${i + 1}`}
            >
              <StarRating count={t.stars} />
              <p className="font-body text-sm text-muted-foreground leading-relaxed italic my-6 flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                  <span className="font-display text-sm text-accent">
                    {t.author[0]}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-body text-xs font-medium text-foreground truncate">
                    {t.author}
                  </p>
                  <p className="font-body text-[11px] text-muted-foreground">
                    {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: slider */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.35 }}
                className="bg-card border border-border/40 rounded-sm p-7"
                data-ocid={`home.testimonial.item.${activeIdx + 1}`}
              >
                <StarRating count={TESTIMONIALS[activeIdx].stars} />
                <p className="font-body text-sm text-muted-foreground leading-relaxed italic my-5">
                  "{TESTIMONIALS[activeIdx].quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center">
                    <span className="font-display text-sm text-accent">
                      {TESTIMONIALS[activeIdx].author[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-xs font-medium text-foreground">
                      {TESTIMONIALS[activeIdx].author}
                    </p>
                    <p className="font-body text-[11px] text-muted-foreground">
                      {TESTIMONIALS[activeIdx].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              data-ocid="home.testimonials.prev_button"
              className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-smooth"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.author}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-px transition-all duration-300 ${i === activeIdx ? "w-8 bg-accent" : "w-4 bg-border"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              data-ocid="home.testimonials.next_button"
              className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-smooth"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {STAR_KEYS.slice(0, count).map((k) => (
        <Star key={k} size={13} className="fill-accent text-accent" />
      ))}
    </div>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

function NewsletterSection() {
  return (
    <section
      className="py-20 lg:py-28 bg-foreground text-background"
      id="contact"
      data-ocid="home.newsletter.section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="inline-block mb-6"
            >
              <Instagram size={30} className="text-accent" />
            </motion.div>
            <h2 className="font-display text-3xl lg:text-5xl uppercase tracking-wide text-background mb-5">
              Join the Inner Circle
            </h2>
            <p className="font-body text-sm text-background/70 leading-relaxed mb-8">
              Be first to know about new collections, exclusive offers, and
              behind-the-scenes stories. Follow us on{" "}
              <a
                href="https://instagram.com/sr_atliers"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="home.newsletter.instagram_link"
                className="text-accent hover:underline underline-offset-2"
              >
                @sr_atliers
              </a>
            </p>
            <NewsletterForm />
            <p className="font-body text-[11px] text-background/40 mt-5 leading-relaxed">
              No spam, ever. Unsubscribe at any time. By subscribing you agree
              to our Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        data-ocid="newsletter.success_state"
        className="py-4"
      >
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
          <span className="text-accent font-display text-lg">✓</span>
        </div>
        <p className="font-body text-sm text-accent font-medium">
          Welcome to the circle. Watch your inbox.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-0 max-w-md mx-auto"
      data-ocid="newsletter.form"
    >
      <input
        ref={inputRef}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        data-ocid="newsletter.email.input"
        className="flex-1 bg-background/10 border border-background/20 border-r-0 text-background placeholder:text-background/40 text-sm font-body px-5 py-3.5 outline-none focus:border-accent transition-colors rounded-sm rounded-r-none min-w-0"
      />
      <button
        type="submit"
        data-ocid="newsletter.submit_button"
        className="bg-accent text-accent-foreground font-body text-[10px] tracking-[0.22em] uppercase px-7 py-3.5 rounded-sm rounded-l-none hover:opacity-90 transition-smooth whitespace-nowrap shrink-0"
      >
        Subscribe
      </button>
    </form>
  );
}
