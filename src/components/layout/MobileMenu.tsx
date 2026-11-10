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
  HelpCircle,
  FileText,
} from "lucide-react";
import { categories } from "@/data/categories";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { wishlistCount } = useWishlist();
  const { totalItems } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#1E1B4B] flex items-center justify-center text-white">
              <Printer className="w-5 h-5 text-[#F95738]" />
            </div>
            <span className="font-extrabold text-xl text-[#1E1B4B]">
              MyPrintHub<span className="text-[#F95738]">.in</span>
            </span>
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
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Quick Action Pills */}
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
              <span>Login / Register</span>
            </Link>
          </div>

          {/* Categories List */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
              Product Categories
            </div>
            <div className="space-y-1">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#1E1B4B] transition-colors"
                >
                  <span>{cat.name}</span>
                  <div className="flex items-center gap-1.5">
                    {cat.badge && (
                      <span className="text-[10px] font-bold bg-[#F95738]/10 text-[#F95738] px-1.5 py-0.5 rounded">
                        {cat.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Site Pages */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-2">
              Explore More
            </div>
            <div className="space-y-1">
              <Link
                href="/products"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span>All Products Catalog</span>
                <span className="text-[10px] font-bold bg-[#1E1B4B] text-white px-2 py-0.5 rounded">
                  All
                </span>
              </Link>
              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span>About MyPrintHub</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span>Bulk Orders & Quotes</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Customer Support Info */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5 text-xs text-slate-600">
            <div className="font-bold text-slate-800 text-sm">Need Help?</div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#F95738]" />
              <span>+91 98765 43210 (9AM - 8PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#F95738]" />
              <span>support@myprinthub.in</span>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <Link
            href="/cart"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#1E1B4B] hover:bg-[#110E38] text-white font-bold rounded-xl shadow-lg transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-[#F95738]" />
            <span>Go to Cart ({totalItems} items)</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

