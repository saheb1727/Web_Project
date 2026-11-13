"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  Printer,
  ChevronRight,
  Heart,
  User,
  ShoppingBag,
  PhoneCall,
  Mail,
  Truck,
  Flame,
  Briefcase,
  IdCard,
  Shirt,
  Sparkles,
  Coffee,
  Layers,
  ArrowRight,
} from "lucide-react";
import { categories } from "@/data/categories";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Map categories to high-clarity icons
const getCategoryIcon = (slug: string) => {
  switch (slug) {
    case "magnetic-badges":
      return IdCard;
    case "custom-t-shirts":
      return Shirt;
    case "hoodies-sweatshirts":
      return Sparkles;
    case "drinkware-mugs":
      return Coffee;
    case "corporate-kits":
      return Briefcase;
    default:
      return Layers;
  }
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { wishlistCount } = useWishlist();
  const { totalItems } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1E1B4B] flex items-center justify-center text-white shadow-2xs">
              <Printer className="w-4 h-4 text-[#F95738]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-[#1E1B4B] leading-none">
                MyPrintHub<span className="text-[#F95738]">.in</span>
              </span>
              <span className="text-[9px] font-semibold text-slate-400 uppercase mt-0.5">
                Custom Merch & Print
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          
          {/* Quick Action Pills: Wishlist & User Account */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              <Heart className="w-4 h-4 text-[#F95738]" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>
            <Link
              href="/auth"
              onClick={onClose}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
            >
              <User className="w-4 h-4 text-[#1E1B4B]" />
              <span>Account / Login</span>
            </Link>
          </div>

          {/* Quick Shortcuts */}
          <div className="space-y-1">
            <Link
              href="/products"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-[#1E1B4B] hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-[#F95738]" />
                <span>Best Sellers & Deals</span>
              </div>
              <span className="text-[10px] font-bold bg-[#F95738]/10 text-[#F95738] px-2 py-0.5 rounded-full">
                Hot
              </span>
            </Link>

            <Link
              href="/track"
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-[#1E1B4B] hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-slate-600" />
                <span>Track Your Order</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Product Categories Section */}
          <div>
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Product Categories
              </span>
              <Link
                href="/products"
                onClick={onClose}
                className="text-[11px] font-bold text-[#F95738] hover:underline"
              >
                View All
              </Link>
            </div>
            
            <div className="space-y-1">
              {categories.map((cat) => {
                const Icon = getCategoryIcon(cat.slug);
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#1E1B4B] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-[#F95738]/10 group-hover:text-[#F95738] flex items-center justify-center text-slate-600 transition-colors shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {cat.badge && (
                        <span className="text-[9px] font-bold bg-slate-100 text-slate-600 group-hover:bg-[#F95738]/10 group-hover:text-[#F95738] px-1.5 py-0.5 rounded transition-colors">
                          {cat.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Corporate & Support Pages */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Enterprise & Services
            </div>
            <div className="space-y-1">
              <Link
                href="/category/corporate-kits"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <span>Corporate Gifts & Kits</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span>Bulk Quotations & Pantone</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span>About MyPrintHub</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Direct Support Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 text-xs text-slate-600">
            <div className="font-bold text-slate-800 text-xs">Customer Support</div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#F95738]" />
              <span>+91 98765 43210 (9AM - 8PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#F95738]" />
              <span>support@myprinthub.in</span>
            </div>
          </div>
        </div>

        {/* Drawer Footer with Cart Button */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <Link
            href="/cart"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#1E1B4B] hover:bg-[#110E38] text-white font-bold rounded-xl shadow-md transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-[#F95738]" />
            <span>Go to Cart ({totalItems} items)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
