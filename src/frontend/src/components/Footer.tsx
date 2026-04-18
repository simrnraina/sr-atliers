import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { SiInstagram } from "react-icons/si";

const SHOP_LINKS = [
  { label: "New Arrivals", href: "/products?category=new-arrivals" },
  { label: "Collections", href: "/products" },
  { label: "Best Sellers", href: "/products?filter=bestsellers" },
  { label: "Accessories", href: "/products?category=accessories" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Careers", href: "#footer" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#footer" },
  { label: "Terms & Conditions", href: "#footer" },
  { label: "Return Policy", href: "#footer" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer
      className="bg-card border-t border-border/60 mt-auto"
      data-ocid="footer.section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="block mb-4">
              <span className="font-display text-2xl tracking-[0.2em] uppercase">
                SR <span className="text-accent">Atliers</span>
              </span>
            </Link>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Curated collections of timeless elegance and modern
              sophistication. Crafted for those who wear their confidence.
            </p>
            {/* Instagram */}
            <a
              href="https://instagram.com/sr_atliers"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.instagram.link"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group"
            >
              <SiInstagram
                size={18}
                className="group-hover:scale-110 transition-smooth"
              />
              <span className="font-body text-sm tracking-wide">
                @sr_atliers
              </span>
            </a>
            <div className="mt-3">
              <a
                href="mailto:sratiliers@gmail.com"
                data-ocid="footer.email.link"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail size={16} />
                <span className="font-body text-sm">sratiliers@gmail.com</span>
              </a>
            </div>
            <div className="mt-3">
              <a
                href="tel:+918987242453"
                data-ocid="footer.phone.link"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Phone size={16} />
                <span className="font-body text-sm">+91 8987242453</span>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase text-foreground mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href as "/"}
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground tracking-wide">
            © {year} SR Atliers. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
