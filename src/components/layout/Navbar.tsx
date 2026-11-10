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
  IdCard,
  Shirt,
  Flame,
  Gift,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchModal } from "@/components/ui/SearchModal";
import { MobileMenu } from "./MobileMenu";

// Clean vector Cap SVG icon
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

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      label: "Magnetic Badge",
      href: "/category/magnetic-badges",
      icon: IdCard,
    },
    {
      label: "T-Shirts",
      href: "/category/custom-t-shirts",
      icon: Shirt,
    },
    {
      label: "Best Seller",
      href: "/products",
      icon: Flame,
    },
    {
      label: "Caps",
      href: "/category/custom-caps",
      icon: CapIcon,
    },
    {
      label: "Corporate Gifts",
      href: "/category/corporate-kits",
      icon: Gift,
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

            {/* Center Navigation Links (Using clean vector SVG icons, zero emojis) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 hover:text-[var(--color-accent)] transition-colors py-2 group"
                  >
                    <Icon className="w-4 h-4 text-slate-500 group-hover:text-[var(--color-accent)] transition-colors shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Icons: Search, Account, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-3 text-slate-700">
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
