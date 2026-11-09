"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  Printer,
  Palette,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useTheme } from "@/context/ThemeContext";
import { SearchModal } from "@/components/ui/SearchModal";
import { MobileMenu } from "./MobileMenu";

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { themeConfig, setIsPaletteModalOpen } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      label: "Magnetic Badge",
      href: "/category/magnetic-badges",
      icon: "🪪",
    },
    {
      label: "T-Shirts",
      href: "/category/custom-t-shirts",
      icon: "👕",
    },
    {
      label: "Best Seller",
      href: "/products",
      icon: "✨",
    },
    {
      label: "Caps",
      href: "/category/custom-caps",
      icon: "🧢",
    },
    {
      label: "Corporate Gifts",
      href: "/category/corporate-kits",
      icon: "🎁",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-slate-700 hover:text-[var(--color-primary)] rounded-lg transition-colors cursor-pointer"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo (Matching Reference Layout) */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] text-[var(--color-accent)] flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform">
                <Printer className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight text-[var(--color-primary)] leading-none">
                  MyPrintHub<span className="text-[var(--color-accent)]">.in</span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 tracking-normal mt-0.5">
                  Your Brand. Your Style. Your Print.
                </span>
              </div>
            </Link>

            {/* Center Navigation Links (Matching Screenshot exactly with icon badges) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 hover:text-[var(--color-accent)] transition-colors py-2"
                >
                  <span className="text-base leading-none">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Icons: Search, Palette Switcher, Account, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-3 text-slate-700">
              {/* Palette Switcher Button */}
              <button
                type="button"
                onClick={() => setIsPaletteModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all text-xs font-bold text-slate-700 cursor-pointer"
                title="Change Color Palette"
              >
                <div className="flex items-center -space-x-1">
                  <span
                    className="w-3 h-3 rounded-full border border-white"
                    style={{ backgroundColor: themeConfig.primaryColor }}
                  />
                  <span
                    className="w-3 h-3 rounded-full border border-white"
                    style={{ backgroundColor: themeConfig.accentColor }}
                  />
                </div>
                <Palette className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden md:inline text-[11px] font-semibold text-slate-600">
                  Colors
                </span>
              </button>

              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-[var(--color-accent)] transition-colors cursor-pointer"
                aria-label="Search merchandise"
                title="Search (⌘K)"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Account Icon */}
              <Link
                href="/auth"
                className="p-2 hover:text-[var(--color-accent)] transition-colors"
                aria-label="My Account"
                title="Account"
              >
                <User className="w-5 h-5 stroke-[1.8]" />
              </Link>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2 hover:text-[var(--color-accent)] transition-colors"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.8]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[var(--color-accent)] text-white text-[10px] font-bold rounded-sm flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 hover:text-[var(--color-accent)] transition-colors"
                aria-label="Shopping Cart"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[var(--color-accent)] text-white text-[10px] font-bold rounded-sm flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
