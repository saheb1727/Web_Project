"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
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

// Dynamically import modals to reduce initial JavaScript bundle
const SearchModal = dynamic(
  () => import("@/components/ui/SearchModal").then((mod) => mod.SearchModal),
  { ssr: false }
);

const MobileMenu = dynamic(
  () => import("./MobileMenu").then((mod) => mod.MobileMenu),
  { ssr: false }
);

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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 sm:p-2 text-slate-700 hover:text-[var(--color-primary)] rounded-lg transition-colors cursor-pointer active:bg-slate-100"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Brand Logo (Responsive sizing for mobile screens 320px+) */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[var(--color-primary)] text-[var(--color-accent)] flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform">
                <Printer className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-accent)]" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-2xl tracking-tight text-[var(--color-primary)] leading-none">
                  MyPrintHub<span className="text-[var(--color-accent)]">.in</span>
                </span>
                <span className="hidden sm:block text-[10px] font-medium text-slate-500 tracking-normal mt-0.5">
                  Your Brand. Your Style. Your Print.
                </span>
              </div>
            </Link>

            {/* Center Navigation Links (Desktop) */}
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

            {/* Right Icons: Search, Wishlist, Cart, Account */}
            <div className="flex items-center gap-1 sm:gap-2 text-slate-700 shrink-0">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-[var(--color-accent)] transition-colors cursor-pointer rounded-lg active:bg-slate-100"
                aria-label="Search merchandise"
                title="Search (⌘K)"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Account Icon (Desktop & Tablet) */}
              <Link
                href="/auth"
                className="hidden sm:flex p-2 hover:text-[var(--color-accent)] transition-colors rounded-lg"
                aria-label="My Account"
                title="Account"
              >
                <User className="w-5 h-5 stroke-[1.8]" />
              </Link>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2 hover:text-[var(--color-accent)] transition-colors rounded-lg"
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

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 hover:text-[var(--color-accent)] transition-colors rounded-lg"
                aria-label="Shopping Cart"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-[var(--color-accent)] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Conditionally rendered lazy search modal */}
      {isSearchOpen && (
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}

      {/* Conditionally rendered lazy mobile drawer */}
      {isMobileMenuOpen && (
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  );
};
