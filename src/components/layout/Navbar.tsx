"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Printer,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Flame,
  Briefcase,
  Truck,
  MessageSquare,
  IdCard,
  Shirt,
  Coffee,
  Layers,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { categories } from "@/data/categories";

// Dynamically import modals to reduce initial JavaScript bundle
const SearchModal = dynamic(
  () => import("@/components/ui/SearchModal").then((mod) => mod.SearchModal),
  { ssr: false }
);

const MobileMenu = dynamic(
  () => import("./MobileMenu").then((mod) => mod.MobileMenu),
  { ssr: false }
);

// Clean vector Cap SVG icon for headwear
const CapIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 15c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    <path d="M2 15h20c0 1.5-1.5 3-4 3H6c-2.5 0-4-1.5-4-3z" />
    <circle cx="12" cy="7" r="1" />
  </svg>
);

// Map categories to high-clarity icons
const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case "magnetic-badges":
      return IdCard;
    case "custom-t-shirts":
      return Shirt;
    case "hoodies-sweatshirts":
      return Sparkles;
    case "custom-caps":
      return CapIcon;
    case "drinkware-mugs":
      return Coffee;
    case "corporate-kits":
      return Briefcase;
    default:
      return Layers;
  }
};

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isLoggedIn } = useAuth();
  const pathname = usePathname();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on route change
  useEffect(() => {
    setIsProductsOpen(false);
  }, [pathname]);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProductsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsProductsOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsProductsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 150);
  };

  const isProductsActive =
    pathname.startsWith("/category") || pathname === "/products";

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 lg:gap-6">
            
            {/* Left: Mobile Hamburger & Brand Identity */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {/* Mobile Hamburger Trigger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-700 hover:text-[var(--color-primary)] rounded-xl transition-colors cursor-pointer active:bg-slate-100"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Brand Logo & Tagline */}
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group py-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-primary)] text-[var(--color-accent)] flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <Printer className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl sm:text-2xl tracking-tight text-[var(--color-primary)] leading-none">
                    MyPrintHub<span className="text-[var(--color-accent)]">.in</span>
                  </span>
                  <span className="hidden sm:block text-[10px] font-semibold text-slate-400 tracking-wide mt-1 uppercase">
                    Your Brand • Your Style • Your Print
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Precision Navigation with Products Mega Dropdown */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              
              {/* Products Mega Dropdown Trigger */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setIsProductsOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 px-3 rounded-xl cursor-pointer ${
                    isProductsOpen || isProductsActive
                      ? "text-[#F95738] bg-[#F95738]/10 font-bold shadow-2xs"
                      : "text-slate-800 hover:text-[var(--color-accent)] hover:bg-slate-50"
                  }`}
                  aria-expanded={isProductsOpen}
                  aria-haspopup="true"
                >
                  <Layers
                    className={`w-4 h-4 transition-colors ${
                      isProductsOpen || isProductsActive
                        ? "text-[#F95738]"
                        : "text-slate-500"
                    }`}
                  />
                  <span>Products</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isProductsOpen ? "rotate-180 text-[#F95738]" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Dropdown Menu Panel */}
                {isProductsOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-[620px] bg-white/98 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    role="menu"
                  >
                    {/* Header Strip */}
                    <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <span>Product Catalog</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            Zero MOQ
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Direct factory manufacturing with 24-48h dispatch
                        </p>
                      </div>
                      <Link
                        href="/products"
                        onClick={() => setIsProductsOpen(false)}
                        className="text-xs font-bold text-[#F95738] hover:text-[#d84326] flex items-center gap-1 transition-colors group/link"
                      >
                        <span>View All Products</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    {/* 2-Column Grid of Categories */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {categories.map((cat) => {
                        const Icon = getCategoryIcon(cat.slug);
                        const isCurrent = pathname === `/category/${cat.slug}`;

                        return (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            onClick={() => setIsProductsOpen(false)}
                            className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all group/item ${
                              isCurrent
                                ? "bg-[#F95738]/5 border-[#F95738]/30 shadow-2xs"
                                : "hover:bg-slate-50 border-transparent hover:border-slate-200/80"
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isCurrent
                                  ? "bg-[#F95738] text-white"
                                  : "bg-slate-100 text-[#1E1B4B] group-hover/item:bg-[#F95738]/10 group-hover/item:text-[#F95738]"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`text-sm font-bold truncate transition-colors ${
                                    isCurrent
                                      ? "text-[#F95738]"
                                      : "text-[#1E1B4B] group-hover/item:text-[#F95738]"
                                  }`}
                                >
                                  {cat.name}
                                </span>
                                {cat.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 group-hover/item:bg-[#F95738]/15 group-hover/item:text-[#F95738] shrink-0 transition-colors">
                                    {cat.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {cat.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Bottom Promo & Enterprise Strip */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/80 -mx-5 -mb-5 p-3.5 rounded-b-2xl px-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold text-[11px]">
                          100% Quality Guarantee • Custom Pantone Matches
                        </span>
                      </div>
                      <Link
                        href="/contact"
                        onClick={() => setIsProductsOpen(false)}
                        className="text-[11px] font-bold text-[#1E1B4B] hover:text-[#F95738] transition-colors"
                      >
                        Enterprise Inquiries →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Best Sellers Link */}
              <Link
                href="/products"
                className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 px-3 rounded-xl cursor-pointer ${
                  pathname === "/products" && !isProductsOpen
                    ? "text-[#F95738] bg-[#F95738]/10 font-bold"
                    : "text-slate-800 hover:text-[var(--color-accent)] hover:bg-slate-50"
                }`}
              >
                <Flame className="w-4 h-4 text-slate-500 hover:text-[var(--color-accent)] shrink-0" />
                <span>Best Sellers</span>
              </Link>

              {/* Corporate & Bulk Link */}
              <Link
                href="/category/corporate-kits"
                className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 px-3 rounded-xl cursor-pointer ${
                  pathname === "/category/corporate-kits"
                    ? "text-[#F95738] bg-[#F95738]/10 font-bold"
                    : "text-slate-800 hover:text-[var(--color-accent)] hover:bg-slate-50"
                }`}
              >
                <Briefcase className="w-4 h-4 text-slate-500 hover:text-[var(--color-accent)] shrink-0" />
                <span>Corporate & Bulk</span>
              </Link>

              {/* Track Order Link */}
              <Link
                href="/track"
                className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 px-3 rounded-xl cursor-pointer ${
                  pathname === "/track"
                    ? "text-[#F95738] bg-[#F95738]/10 font-bold"
                    : "text-slate-800 hover:text-[var(--color-accent)] hover:bg-slate-50"
                }`}
              >
                <Truck className="w-4 h-4 text-slate-500 hover:text-[var(--color-accent)] shrink-0" />
                <span>Track Order</span>
              </Link>

              {/* Custom Quote / Contact Link */}
              <Link
                href="/contact"
                className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 px-3 rounded-xl cursor-pointer ${
                  pathname === "/contact"
                    ? "text-[#F95738] bg-[#F95738]/10 font-bold"
                    : "text-slate-800 hover:text-[var(--color-accent)] hover:bg-slate-50"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-slate-500 hover:text-[var(--color-accent)] shrink-0" />
                <span>Custom Quote</span>
              </Link>
            </nav>

            {/* Right: Integrated Search, Account, Wishlist & Cart */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* Integrated Search Trigger Pill (Medium & Desktop) */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-slate-500 hover:text-slate-800 transition-all text-xs cursor-pointer group w-44 lg:w-48 xl:w-56"
                aria-label="Search merchandise"
                title="Search custom products (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#F95738] transition-colors shrink-0" />
                <span className="truncate text-slate-500 group-hover:text-slate-700 font-medium">
                  Search products...
                </span>
                <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white rounded border border-slate-200 ml-auto shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Compact Search Icon (Mobile Only) */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex md:hidden p-2 text-slate-700 hover:text-[var(--color-accent)] transition-colors cursor-pointer rounded-xl active:bg-slate-100"
                aria-label="Search merchandise"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* User Account Button */}
              <Link
                href="/auth"
                className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 hover:text-[var(--color-accent)] transition-colors rounded-xl hover:bg-slate-50 text-slate-700 cursor-pointer"
                aria-label="My Account"
                title={isLoggedIn && user ? `Account: ${user.name}` : "Sign In / Register"}
              >
                {isLoggedIn && user ? (
                  <div className="w-7 h-7 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                    {user.name[0].toUpperCase()}
                  </div>
                ) : (
                  <User className="w-5 h-5 stroke-[1.8]" />
                )}
                {isLoggedIn && user ? (
                  <span className="text-xs font-bold text-slate-800 hidden xl:inline truncate max-w-[80px]">
                    {user.name.split(" ")[0]}
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-700 hidden xl:inline">
                    Sign In
                  </span>
                )}
              </Link>

              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative p-2 text-slate-700 hover:text-[var(--color-accent)] hover:bg-slate-50 transition-colors rounded-xl cursor-pointer"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.8]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-[var(--color-accent)] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* High-Conversion Cart Pill */}
              <Link
                href="/cart"
                className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#1E1B4B] hover:bg-[#120F38] text-white transition-all shadow-xs group cursor-pointer shrink-0"
                aria-label="Shopping Cart"
                title="View Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-white group-hover:scale-105 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-[16px] h-4 px-1 bg-[var(--color-accent)] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center leading-none ring-2 ring-[#1E1B4B]">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-white tracking-wide">
                  Cart
                </span>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* Lazy Search Modal */}
      {isSearchOpen && (
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}

      {/* Lazy Mobile Drawer */}
      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
