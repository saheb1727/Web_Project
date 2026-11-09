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
  BadgePercent,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SearchModal } from "@/components/ui/SearchModal";
import { MobileMenu } from "./MobileMenu";

export const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
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
                className="p-2 text-slate-700 hover:text-[#142344] rounded-lg transition-colors"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo (Matching Reference Layout) */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 rounded-lg bg-[#142344] text-[#FF4D24] flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform">
                <Printer className="w-5 h-5 text-[#FF4D24]" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tight text-[#142344] leading-none">
                  MyPrintHub<span className="text-[#FF4D24]">.in</span>
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
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 hover:text-[#FF4D24] transition-colors py-2"
                >
                  <span className="text-base leading-none">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Icons: Search, Account, Wishlist, Cart */}
            <div className="flex items-center gap-3 sm:gap-4 text-slate-700">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:text-[#FF4D24] transition-colors"
                aria-label="Search merchandise"
                title="Search (⌘K)"
              >
                <Search className="w-5 h-5 stroke-[1.8]" />
              </button>

              {/* Account Icon */}
              <Link
                href="/auth"
                className="p-2 hover:text-[#FF4D24] transition-colors"
                aria-label="My Account"
                title="Account"
              >
                <User className="w-5 h-5 stroke-[1.8]" />
              </Link>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2 hover:text-[#FF4D24] transition-colors"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.8]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#FF4D24] text-white text-[10px] font-bold rounded-sm flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 hover:text-[#FF4D24] transition-colors"
                aria-label="Shopping Cart"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#FF4D24] text-white text-[10px] font-bold rounded-sm flex items-center justify-center">
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
