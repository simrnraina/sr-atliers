import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  User,
  X,
} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../hooks/useAuth";

const NAV_LINKS = [
  { label: "New Arrivals", href: "/products" },
  { label: "Collections", href: "/products" },
  { label: "Clothing", href: "/products" },
  { label: "Accessories", href: "/products" },
  { label: "Our Story", href: "/#about" },
];

export function Header() {
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { toggleTheme, isDark } = useTheme();
  const { isAuthenticated, login, logout, isLoading } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/products" });
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glassmorphism shadow-subtle"
            : "bg-card border-b border-border/50",
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" data-ocid="header.logo.link" className="flex-shrink-0">
              <span className="font-display text-xl lg:text-2xl tracking-[0.2em] uppercase text-foreground hover:text-accent transition-colors">
                SR <span className="text-accent">Atliers</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href as "/"}
                  data-ocid={`header.nav.${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 lg:gap-2">
              {/* Search */}
              <div className="relative flex items-center">
                {searchOpen ? (
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-2"
                  >
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      data-ocid="header.search_input"
                      className="w-36 lg:w-52 bg-transparent border-b border-border focus:border-accent outline-none text-xs font-body text-foreground placeholder:text-muted-foreground py-1 transition-all duration-200"
                    />
                    <button
                      type="button"
                      aria-label="Close search"
                      onClick={() => setSearchOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={15} />
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    aria-label="Open search"
                    data-ocid="header.search.toggle"
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Search size={18} />
                  </button>
                )}
              </div>

              {/* Auth */}
              <button
                type="button"
                aria-label={isAuthenticated ? "Account" : "Login"}
                data-ocid="header.auth_button"
                onClick={
                  isAuthenticated ? () => navigate({ to: "/products" }) : login
                }
                disabled={isLoading}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <User size={18} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                data-ocid="header.wishlist.link"
                className="relative p-2 text-muted-foreground hover:text-accent transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <Badge
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] text-[10px] px-1 flex items-center justify-center rounded-full bg-accent text-accent-foreground border-transparent"
                    data-ocid="header.wishlist.count"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                data-ocid="header.cart.link"
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <Badge
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] text-[10px] px-1 flex items-center justify-center rounded-full bg-accent text-accent-foreground border-transparent"
                    data-ocid="header.cart.count"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Link>

              {/* Dark mode toggle */}
              <button
                type="button"
                aria-label="Toggle theme"
                data-ocid="header.theme_toggle"
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:flex"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Logout if authenticated */}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  data-ocid="header.logout_button"
                  onClick={logout}
                  className="hidden lg:flex text-xs font-body"
                >
                  Logout
                </Button>
              )}

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label="Open menu"
                data-ocid="header.mobile_menu.toggle"
                onClick={() => setMobileOpen(true)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors lg:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          data-ocid="mobile.menu.sheet"
        >
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop overlay only needs click */}
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-card flex flex-col animate-slide shadow-elevated">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="font-display text-lg tracking-[0.2em] uppercase">
                SR <span className="text-accent">Atliers</span>
              </span>
              <button
                type="button"
                aria-label="Close menu"
                data-ocid="mobile.menu.close_button"
                onClick={() => setMobileOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-6 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href as "/"}
                  data-ocid={`mobile.nav.${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-sm tracking-widest uppercase text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-6 border-t border-border flex items-center gap-4">
              <button
                type="button"
                aria-label="Toggle theme"
                data-ocid="mobile.theme_toggle"
                onClick={toggleTheme}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="mobile.logout_button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="font-body text-xs"
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  data-ocid="mobile.login_button"
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  className="font-body text-xs bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
