"use client";

import React, { useState, useEffect } from "react";
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
  IdCard,
  Shirt,
  Flame,
  Gift,
  MapPin,
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

const LocationModal = dynamic(
  () => import("@/components/ui/LocationModal").then((mod) => mod.LocationModal),
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
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Delivery Location state (defaults to Noida NCR factory base)
  const [deliveryLocation, setDeliveryLocation] = useState({
    pincode: "201301",
    city: "Noida NCR",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myprinthub_delivery_location");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.pincode && parsed.city) {
            setDeliveryLocation(parsed);
          }
        } catch {
          // ignore parsing error
        }
      }
    }
  }, []);

  const handleSaveLocation = (pincode: string, city: string) => {
    const loc = { pincode, city };
    setDeliveryLocation(loc);
    if (typeof window !== "undefined") {
      localStorage.setItem("myprinthub_delivery_location", JSON.stringify(loc));
    }
  };

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

            {/* Brand Logo & Tagline */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
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

              {/* Delivery Pincode Locator (Desktop Expanded Pill) */}
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-xs font-semibold text-slate-700 transition-colors cursor-pointer group shrink-0"
                title="Change delivery location"
              >
                <div className="w-7 h-7 rounded-lg bg-[var(--color-accent-soft)] flex items-center justify-center text-[#F95738] shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] text-slate-400 font-medium">Deliver to</span>
                  <span className="text-xs font-bold text-[#1E1B4B] truncate max-w-[110px]">
                    {deliveryLocation.city} {deliveryLocation.pincode}
                  </span>
                </div>
              </button>
            </div>

            {/* Center Navigation Links (with Active Page / Route Locator) */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href ||
                  (link.href.startsWith("/category") && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-1.5 px-2.5 xl:px-3 rounded-xl group cursor-pointer ${
                      isActive
                        ? "text-[#F95738] bg-[#F95738]/10 font-bold shadow-2xs"
                        : "text-slate-800 hover:text-[var(--color-accent)] hover:bg-slate-50"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-colors shrink-0 ${
                        isActive
                          ? "text-[#F95738]"
                          : "text-slate-500 group-hover:text-[var(--color-accent)]"
                      }`}
                    />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Icons: Locator, Search, Account, Wishlist, Cart */}
            <div className="flex items-center gap-1 sm:gap-1.5 text-slate-700 shrink-0">
              {/* Compact Locator Button (Tablet & Mobile) */}
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="flex xl:hidden p-2 hover:text-[var(--color-accent)] transition-colors cursor-pointer rounded-lg active:bg-slate-100"
                aria-label="Delivery location"
                title={`Deliver to ${deliveryLocation.city} (${deliveryLocation.pincode})`}
              >
                <MapPin className="w-5 h-5 stroke-[1.8] text-[#F95738]" />
              </button>

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

      {/* Lazy Search Modal */}
      {isSearchOpen && (
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      )}

      {/* Lazy Delivery Location Modal */}
      {isLocationModalOpen && (
        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          currentPincode={deliveryLocation.pincode}
          currentCity={deliveryLocation.city}
          onSaveLocation={handleSaveLocation}
        />
      )}

      {/* Lazy Mobile Drawer */}
      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onOpenLocation={() => setIsLocationModalOpen(true)}
          currentPincode={deliveryLocation.pincode}
          currentCity={deliveryLocation.city}
        />
      )}
    </>
  );
};

export default Navbar;
