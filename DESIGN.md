# Design Brief

## Direction

**Luxury Minimal Fashion** — Premium e-commerce for SR Atliers, inspired by Zara/Dior aesthetic with sophisticated restraint and intentional use of gold accents.

## Tone

Refined minimalism with precision editorial craft — no visual noise, every element earned. Glassmorphism and smooth motion reserved for interaction, not decoration.

## Differentiation

Gold accent reserved exclusively for luxury highlights (wishlist hearts, price tags, hero CTA, active states) creates instant visual hierarchy and brand identity without competing visual clutter.

## Color Palette

| Token       | OKLCH           | Role                                |
| ----------- | --------------- | ----------------------------------- |
| background  | 0.96 0.008 70   | Warm cream base (light mode)        |
| foreground  | 0.15 0.008 50   | Deep charcoal text                  |
| card        | 1.0 0.0 0       | Pure white for product cards        |
| primary     | 0.65 0.16 70    | Warm gold accent / button states    |
| accent      | 0.68 0.14 70    | Gold highlights (wishlist, tags)    |
| secondary   | 0.92 0.008 70   | Soft beige for subtle backgrounds   |
| muted       | 0.92 0.008 70   | Disabled/secondary states           |
| destructive | 0.55 0.22 25    | Red for delete/cart removal         |
| border      | 0.88 0.008 70   | Subtle dividers and card edges      |

## Typography

- **Display**: Fraunces — elegant serif for hero headlines, product names, section titles; conveys luxury and fashion heritage
- **Body**: General Sans — refined sans-serif for descriptions, UI labels, body copy; ensures readability at all sizes
- **Scale**: Hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl font-bold tracking-tight`, label `text-sm font-semibold uppercase tracking-widest`, body `text-base leading-relaxed`

## Elevation & Depth

Layered card surfaces with subtle shadows; dark mode uses elevated charcoal cards against deeper background. Glassmorphism (frosted glass with blur) on modals and overlays only — no ambient blur effects.

## Structural Zones

| Zone    | Background        | Border              | Notes                                            |
| ------- | ----------------- | ------------------- | ------------------------------------------------ |
| Header  | bg-card border-b  | border-border       | Clean white nav with gold hover on links         |
| Hero    | bg-background     | —                   | Cream background with full-width imagery overlay |
| Content | Alternating       | —                   | bg-background main, bg-card sections             |
| Footer  | bg-card border-t  | border-border       | Dark text on white, Instagram social link        |
| Modal   | glassmorphism     | border / subtle     | Frosted glass effect with blur, centered         |

## Spacing & Rhythm

Spacious breathing room throughout (6rem section gaps); content grouped in 2–3 column grids (responsive: 1 mobile, 2 tablet, 3 desktop); micro-spacing uses `gap-4` for card arrays, `p-6` for internal padding. Footer and header balanced at `px-6 py-4`.

## Component Patterns

- **Buttons**: Rounded-sm (6px), full-width CTA with gold (`bg-accent text-accent-foreground`), secondary outlined with `border-2 border-foreground`, hover lifts with `shadow-elevated`
- **Cards**: Rounded-sm, white background (`bg-card`), subtle `shadow-subtle`, product images full-width top, hover scales +5% with gold outline accent
- **Badges**: Uppercase label, gold text on transparent, `rounded-sm`, used for "New" / "Trending" labels only
- **Wishlist**: Heart icon `text-accent` gold on hover, smooth color transition

## Motion

- **Entrance**: Staggered fade-in + slide-up on page load (`animate-fade animate-slide` per product card, 100ms stagger)
- **Hover**: Product cards scale 1.05 with `shadow-elevated`, buttons shift slightly up with gold glow (`shadow-gold`), smooth 300ms cubic-bezier transition
- **Interactive**: Cart add/remove uses fade-out on item removal, modal entrance is scale-in from center with glassmorphism background fade-in

## Constraints

- No rainbow colors, no competing accent hues — gold is the only accent throughout
- Glassmorphism limited to modals/overlays; surfaces remain solid with subtle shadows
- Product grid maintains editorial crispness: squared corners on images, minimal spacing, clean product data hierarchy
- Dark mode inverts backgrounds/text but maintains gold accent and luxury feel

## Signature Detail

Subtle gold glow shadow on interactive elements (buttons, wishlist on hover) — luxury jewelry-inspired detail that elevates touch interactions without breaking visual restraint.
