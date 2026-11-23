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
    case "custom-photo-frames":
      return Heart;
    case "personalized-gifts":
      return Sparkles;
    case "magnetic-badges":
      return IdCard;
    case "custom-t-shirts":
      return Shirt;
    case "hoodies-sweatshirts":
      return Flame;
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
  const { totalItems, subtotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isLoggedIn } = useAuth();
  const pathname = usePathname();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll for elevated sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-md border-b border-slate-200/95 shadow-sm"
            : "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px] gap-3 sm:gap-4 lg:gap-8">
            
            {/* Zone 1: Brand Anchor (Left) */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Mobile Hamburger Trigger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-slate-700 hover:text-[#0B0F19] rounded-xl hover:bg-slate-100 transition-colors cursor-pointer active:bg-slate-200"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Brand Logo & Studio Subtitle */}
              <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group py-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0B0F19] text-[#FF4D36] flex items-center justify-center font-black shadow-xs ring-1 ring-black/5 group-hover:scale-105 transition-transform shrink-0">
                  <Printer className="w-4 h-4 text-[#FF4D36]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-[#0B0F19] leading-none">
                    MyPrintHub<span className="text-[#FF4D36]">.in</span>
                  </span>
                  <span className="hidden sm:block text-[9px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                    STUDIO PRINT LAB
                  </span>
                </div>
              </Link>
            </div>

            {/* Zone 2: Spacious Clean Navigation (Center) */}
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
                  className={`flex items-center gap-1.5 text-sm font-semibold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                    isProductsOpen || isProductsActive
                      ? "text-[#FF4D36] bg-[#FF4D36]/8 font-bold"
                      : "text-slate-700 hover:text-[#0B0F19] hover:bg-slate-50"
                  }`}
                  aria-expanded={isProductsOpen}
                  aria-haspopup="true"
                >
                  <span>Products</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isProductsOpen ? "rotate-180 text-[#FF4D36]" : "text-slate-400"
                    }`}
                  />
                </button>

                  {/* Dropdown Menu Panel */}
                  {isProductsOpen && (
                    <div
                      className="absolute top-full left-0 mt-2.5 w-[680px] bg-white/98 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
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
                          className="text-xs font-bold text-[#FF4D36] hover:text-[#e0351d] flex items-center gap-1 transition-colors group/link"
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
                                  ? "bg-[#FF4D36]/5 border-[#FF4D36]/30 shadow-2xs"
                                  : "hover:bg-slate-50 border-transparent hover:border-slate-200/80"
                              }`}
                            >
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                  isCurrent
                                    ? "bg-[#FF4D36] text-white"
                                    : "bg-slate-100 text-slate-700 group-hover/item:bg-[#FF4D36]/10 group-hover/item:text-[#FF4D36]"
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`text-xs font-bold truncate transition-colors ${
                                      isCurrent
                                        ? "text-[#FF4D36]"
                                        : "text-slate-900 group-hover/item:text-[#FF4D36]"
                                    }`}
                                  >
                                    {cat.name}
                                  </span>
                                  {cat.badge && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 group-hover/item:bg-[#FF4D36]/15 group-hover/item:text-[#FF4D36] shrink-0 transition-colors">
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
                          className="text-[11px] font-bold text-slate-900 hover:text-[#FF4D36] transition-colors"
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
                  className={`text-sm font-semibold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                    pathname === "/products" && !isProductsOpen
                      ? "text-[#FF4D36] bg-[#FF4D36]/8 font-bold"
                      : "text-slate-700 hover:text-[#0B0F19] hover:bg-slate-50"
                  }`}
                >
                  Best Sellers
                </Link>

                {/* Corporate & Bulk Link */}
                <Link
                  href="/category/corporate-kits"
                  className={`text-sm font-semibold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                    pathname === "/category/corporate-kits"
                      ? "text-[#FF4D36] bg-[#FF4D36]/8 font-bold"
                      : "text-slate-700 hover:text-[#0B0F19] hover:bg-slate-50"
                  }`}
                >
                  Corporate & Bulk
                </Link>

                {/* Track Order Link */}
                <Link
                  href="/track"
                  className={`text-sm font-semibold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                    pathname === "/track"
                      ? "text-[#FF4D36] bg-[#FF4D36]/8 font-bold"
                      : "text-slate-700 hover:text-[#0B0F19] hover:bg-slate-50"
                  }`}
                >
                  Track Order
                </Link>

                {/* Custom Quote Link (Visible on xl screens, keeping smaller laptops uncluttered) */}
                <Link
                  href="/contact"
                  className={`hidden xl:inline-flex text-sm font-semibold py-2 px-3.5 rounded-xl transition-all cursor-pointer ${
                    pathname === "/contact"
                      ? "text-[#FF4D36] bg-[#FF4D36]/8 font-bold"
                      : "text-slate-700 hover:text-[#0B0F19] hover:bg-slate-50"
                  }`}
                >
                  Custom Quote
                </Link>
            </nav>

            {/* Zone 3: Command & Utility Deck (Right) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Sleek Command Search Trigger Pill (Medium & Desktop) */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 text-slate-500 hover:text-slate-800 transition-all text-xs cursor-pointer group w-36 lg:w-40 xl:w-48"
                aria-label="Search merchandise"
                title="Search custom products (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF4D36] transition-colors shrink-0" />
                <span className="truncate text-slate-500 group-hover:text-slate-700 font-medium text-xs">
                  Search products...
                </span>
                <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white rounded border border-slate-200/80 ml-auto shadow-2xs">
                  ⌘K
                </kbd>
              </button>

              {/* Compact Search Icon (Mobile Only) */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex md:hidden p-2 text-slate-700 hover:text-[#0B0F19] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Search merchandise"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative p-2 rounded-xl text-slate-600 hover:text-[#FF4D36] hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4 h-4 stroke-[1.8]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[15px] h-3.5 px-0.5 bg-[#FF4D36] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center leading-none ring-1.5 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* User Account Button */}
              <Link
                href="/auth"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors text-xs font-semibold cursor-pointer"
                aria-label="My Account"
                title={isLoggedIn && user ? `Account: ${user.name}` : "Sign In / Register"}
              >
                {isLoggedIn && user ? (
                  <div className="w-6 h-6 rounded-full bg-[#0B0F19] text-white flex items-center justify-center text-[10px] font-bold shadow-2xs">
                    {user.name[0].toUpperCase()}
                  </div>
                ) : (
                  <User className="w-4 h-4 stroke-[1.8] text-slate-600" />
                )}
                <span className="hidden xl:inline truncate max-w-[75px]">
                  {isLoggedIn && user ? user.name.split(" ")[0] : "Sign In"}
                </span>
              </Link>

              {/* Executive Cart Pill */}
              <Link
                href="/cart"
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#0B0F19] hover:bg-[#FF4D36] text-white transition-all shadow-xs hover:shadow-md group cursor-pointer shrink-0"
                aria-label="Shopping Cart"
                title="View Shopping Cart"
              >
                <div className="relative flex items-center justify-center">
                  <ShoppingBag className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2.5 min-w-[15px] h-3.5 px-0.5 bg-[#FF4D36] text-white text-[9px] font-black rounded-full flex items-center justify-center leading-none ring-1.5 ring-[#0B0F19]">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-white tracking-wide">
                  Cart
                </span>
                {totalItems > 0 && subtotal > 0 && (
                  <span className="text-[11px] font-bold text-slate-300 group-hover:text-white pl-1.5 border-l border-white/20 hidden xs:inline">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                )}
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
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
