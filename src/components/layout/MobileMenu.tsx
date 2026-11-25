"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
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
} from "lucide-react";
import { categories } from "@/data/categories";
import { WhatsAppBadge } from "@/components/ui/WhatsAppIcon";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  const pathname = usePathname();

  useBodyScrollLock(isOpen);

  // Automatically close menu when navigating to a new route
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex lg:hidden">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-[99999]"
            onClick={onClose}
          />

          {/* Animated Drawer Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 32,
              stiffness: 340,
              mass: 0.8,
            }}
            className="relative w-[86vw] max-w-[360px] sm:max-w-sm bg-white h-full flex flex-col shadow-2xl z-[100000] touch-pan-y"
            style={{ touchAction: "pan-y" }}
          >
            {/* Drawer Header */}
            <div className="h-16 px-4 sm:px-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <Link href="/" onClick={onClose} className="flex items-center group py-1">
                <span className="font-black text-xl text-[#0B0F19] leading-none tracking-tight">
                  MyPrintHub
                </span>
              </Link>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 overscroll-contain touch-pan-y">
              {/* Quick Action Pills: Wishlist & User Account */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.3 }}
                className="grid grid-cols-2 gap-2"
              >
                <Link
                  href="/wishlist"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  <Heart className="w-4 h-4 text-[#FF4D36]" />
                  <span>Wishlist ({wishlistCount})</span>
                </Link>
                <Link
                  href="/auth"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  <User className="w-4 h-4 text-[#0B0F19]" />
                  <span>Account / Login</span>
                </Link>
              </motion.div>

              {/* Quick Shortcuts */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="space-y-1"
              >
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#0B0F19] hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-slate-600" />
                    <span>Home</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/products"
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#0B0F19] hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Flame className="w-4 h-4 text-[#FF4D36]" />
                    <span>Best Sellers & Deals</span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#FF4D36]/10 text-[#FF4D36] px-2 py-0.5 rounded-full">
                    Hot
                  </span>
                </Link>

                <Link
                  href="/track"
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-[#0B0F19] hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-slate-600" />
                    <span>Track Your Order</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </motion.div>

              {/* Product Categories Section */}
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                  className="flex items-center justify-between mb-2 px-2"
                >
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Product Categories
                  </span>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="text-[11px] font-bold text-[#FF4D36] hover:underline"
                  >
                    View All
                  </Link>
                </motion.div>

                <div className="space-y-1">
                  {categories.map((cat, idx) => {
                    const Icon = getCategoryIcon(cat.slug);
                    return (
                      <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.2 + idx * 0.03,
                          duration: 0.28,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Link
                          href={`/category/${cat.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#0B0F19] transition-colors group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-[#FF4D36]/10 group-hover:text-[#FF4D36] flex items-center justify-center text-slate-600 transition-colors shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="truncate">{cat.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {cat.badge && (
                              <span className="text-[9px] font-bold bg-slate-100 text-slate-600 group-hover:bg-[#FF4D36]/10 group-hover:text-[#FF4D36] px-1.5 py-0.5 rounded transition-colors">
                                {cat.badge}
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Corporate & Support Pages */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.3 }}
              >
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
              </motion.div>

              {/* Direct Support Card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.3 }}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2 text-xs text-slate-600"
              >
                <div className="font-bold text-slate-800 text-xs">Customer Support</div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-[#FF4D36]" />
                  <span>+91 98765 43210 (9AM - 8PM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#FF4D36]" />
                  <span>support@myprinthub.in</span>
                </div>
                <a
                  href="https://wa.me/919876543210?text=Hi%20MyPrintHub,%20I%20have%20an%20inquiry%20regarding%20custom%20merchandise."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 pt-1 border-t border-slate-200/80 font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <WhatsAppBadge className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Chat</span>
                </a>
              </motion.div>
            </div>

            {/* Drawer Footer with Cart Button */}
            <div className="p-4 border-t border-slate-100 bg-white shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Link
                href="/cart"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#0B0F19] hover:bg-[#FF4D36] text-white font-bold rounded-xl shadow-md transition-all active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 text-[#FF4D36]" />
                <span>Go to Cart ({totalItems} items)</span>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
