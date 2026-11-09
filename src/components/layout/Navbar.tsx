"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  ChevronDown,
  Printer,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { categories } from "@/data/categories";
import { SearchModal } from "@/components/ui/SearchModal";
import { MobileMenu } from "./MobileMenu";

export const Navbar: React.FC = () => {
  const { totalItems, total } = useCart();
  const { wishlistCount } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-slate-700 hover:text-[#142344] hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#142344] to-[#1E3A8A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Printer className="w-5 h-5 text-[#FF4D24]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-extrabold text-2xl tracking-tight text-[#142344] leading-none">
                  MyPrintHub<span className="text-[#FF4D24]">.in</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
                  Custom Merch & Badges
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#FF4D24] rounded-lg transition-colors"
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                onMouseLeave={() => setIsCategoryDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#FF4D24] rounded-lg transition-colors"
                  aria-expanded={isCategoryDropdownOpen}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isCategoryDropdownOpen ? "rotate-180 text-[#FF4D24]" : ""
                    }`}
                  />
                </button>

                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Explore Collections
                      </span>
                      <span className="text-[10px] font-bold text-[#FF4D24] bg-[#FF4D24]/10 px-2 py-0.5 rounded-full">
                        No Minimum MOQ
                      </span>
                    </div>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover/item:text-[#142344]">
                            {cat.name}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1">{cat.itemCount}+ designs available</p>
                        </div>
                        {cat.badge && (
                          <span className="text-[10px] font-semibold bg-orange-50 text-[#FF4D24] px-2 py-0.5 rounded-md border border-[#FF4D24]/20">
                            {cat.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                    <div className="pt-2 border-t border-slate-100 mt-1">
                      <Link
                        href="/products"
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="block text-center text-xs font-bold text-[#FF4D24] hover:text-[#E03C14] py-1"
                      >
                        Browse All Products →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/products"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#FF4D24] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>All Products</span>
                <span className="text-[10px] font-bold bg-[#FF4D24] text-white px-1.5 py-0.2 rounded-full uppercase">
                  Hot
                </span>
              </Link>

              <Link
                href="/about"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#FF4D24] rounded-lg transition-colors"
              >
                Why Us
              </Link>

              <Link
                href="/contact"
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#FF4D24] rounded-lg transition-colors"
              >
                Bulk Quotes
              </Link>
            </nav>

            {/* Search Input Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-xs xl:max-w-sm mx-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-100/80 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl text-sm border border-slate-200/80 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-slate-400 group-hover:text-[#FF4D24] transition-colors" />
                  <span className="text-slate-500 font-normal">Search custom merch...</span>
                </div>
                <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Actions: Search (Mobile), Wishlist, Cart, Account */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 text-slate-600 hover:text-[#142344] hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative p-2 text-slate-600 hover:text-[#142344] hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF4D24] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account Link */}
              <Link
                href="/auth"
                className="hidden sm:flex items-center gap-1.5 p-2 text-slate-600 hover:text-[#142344] hover:bg-slate-100 rounded-xl transition-colors"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-semibold text-slate-700 hidden xl:inline">Account</span>
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="flex items-center gap-2.5 pl-3 pr-4 py-2 bg-[#142344] hover:bg-[#0D1830] text-white rounded-xl shadow-md transition-all group ml-1"
                aria-label="View Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-slate-200 group-hover:text-[#FF4D24] transition-colors" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-[#FF4D24] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Cart</span>
                  <span className="text-xs font-bold text-white">₹{total.toLocaleString()}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

