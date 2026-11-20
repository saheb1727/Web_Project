"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface CategoryRailItem {
  id: string;
  name: string;
  tag: string;
  image: string;
  href: string;
}

export const CategoryQuickRail: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const railItems: CategoryRailItem[] = [
    {
      id: "frames",
      name: "Photo Frames",
      tag: "Best Seller",
      image: "/images/products/anniversary-calendar-frame.jpg",
      href: "/category/custom-photo-frames",
    },
    {
      id: "lamps",
      name: "3D LED Lamps",
      tag: "Trending",
      image: "/images/products/led-acrylic-heart-lamp.jpg",
      href: "/category/personalized-gifts",
    },
    {
      id: "hampers",
      name: "VIP Hampers",
      tag: "Corporate",
      image: "/images/products/corporate-oneplus-buddha-hamper.jpg",
      href: "/category/corporate-kits",
    },
    {
      id: "wallets",
      name: "Leather Wallets",
      tag: "Dual-Side",
      image: "/images/products/personalized-photo-charm-leather-wallet.jpg",
      href: "/products/prod-wallet-photo-charm-tan",
    },
    {
      id: "flasks",
      name: "Travel Flasks",
      tag: "3-Pc Set",
      image: "/images/products/vacuum-flask-cup-gift-set.jpg",
      href: "/products/prod-kit-vacuum-flask-cups",
    },
    {
      id: "mangalsutra",
      name: "Name Pendants",
      tag: "Gold Plated",
      image: "/images/products/custom-name-mangalsutra-pendants.jpg",
      href: "/products/prod-jewel-mangalsutra",
    },
    {
      id: "badges",
      name: "Badges & Pins",
      tag: "Zero MOQ",
      image: "/images/products/haldi-wedding-pin-badges.jpg",
      href: "/category/magnetic-badges",
    },
    {
      id: "cushions",
      name: "Photo Cushions",
      tag: "Duchess Satin",
      image: "/images/products/custom-photo-heart-cushion.jpg",
      href: "/category/personalized-gifts",
    },
    {
      id: "pens",
      name: "24K Gold Pens",
      tag: "Laser Script",
      image: "/images/products/gold-foil-engraved-pens.jpg",
      href: "/category/personalized-gifts",
    },
    {
      id: "caps",
      name: "Caps & Apparel",
      tag: "3D Puff",
      image: "/images/products/custom-embroidered-ved-cap.jpg",
      href: "/category/custom-caps",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white border-b border-slate-200/80 py-3 relative z-30 select-none shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between gap-3">
          
          {/* Scroll Left Button (hidden on touch screens) */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden md:flex w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#F95738] hover:border-[#F95738] items-center justify-center shadow-xs transition-colors shrink-0 cursor-pointer"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Categories Horizontal Scroll Rail */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-none py-1 px-1 scroll-smooth w-full"
          >
            {railItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col items-center text-center shrink-0 w-[72px] sm:w-[84px] focus:outline-hidden"
              >
                {/* Circular Image Container with Ring Effect on Hover */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 group-hover:border-[#F95738] group-hover:scale-105 transition-all duration-200 shadow-2xs">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Subtle Accent Glow Tag */}
                  <span className="absolute bottom-0 inset-x-0 bg-[#1E1B4B]/80 text-[8px] font-black text-white py-0.5 tracking-tight backdrop-blur-2xs uppercase">
                    {item.tag}
                  </span>
                </div>

                {/* Category Label */}
                <span className="mt-1.5 text-[11px] font-bold text-slate-700 group-hover:text-[#F95738] transition-colors leading-tight line-clamp-1">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden md:flex w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#F95738] hover:border-[#F95738] items-center justify-center shadow-xs transition-colors shrink-0 cursor-pointer"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    </div>
  );
};
