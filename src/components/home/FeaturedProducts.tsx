"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Heart,
  Sparkles,
  Briefcase,
  IdCard,
  Coffee,
  Shirt,
  Layers,
} from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { gsap } from "@/lib/gsap";

export const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Clean category definitions for category-wise presentation
  const categorySections = [
    {
      id: "frames",
      slug: "custom-photo-frames",
      name: "Custom Photo Frames & Keepsakes",
      shortLabel: "Photo Frames (14)",
      badge: "Trending Keepsakes",
      icon: Heart,
      description: "Anniversary calendar frames, backlit LED engagement frames, and milestone collages.",
      products: products.filter((p) => p.categorySlug === "custom-photo-frames"),
    },
    {
      id: "personalized",
      slug: "personalized-gifts",
      name: "Personalized Gifts & 3D LED Lamps",
      shortLabel: "Gifts & Lamps (12)",
      badge: "Romantic & Keepsakes",
      icon: Sparkles,
      description: "Laser engraved 3D acrylic lamps, photo cushions, couple mangalsutras, and dual-side wallets.",
      products: products.filter((p) => p.categorySlug === "personalized-gifts"),
    },
    {
      id: "corporate",
      slug: "corporate-kits",
      name: "Corporate Kits, Executive Hampers & Luxury Sets",
      shortLabel: "Corporate Kits (9)",
      badge: "B2B & Executive",
      icon: Briefcase,
      description: "OnePlus Buddha wellness hampers, 3-in-1 welcome sets, 4-in-1 leather sets, and doctor Caduceus sets.",
      products: products.filter((p) => p.categorySlug === "corporate-kits"),
    },
    {
      id: "badges",
      slug: "magnetic-badges",
      name: "Magnetic & Event Pin Badges",
      shortLabel: "Badges & Pins (8)",
      badge: "Zero Pinholes",
      icon: IdCard,
      description: "Neodymium metallic corporate badges, Haldi floral badges, and wedding celebration button pins.",
      products: products.filter((p) => p.categorySlug === "magnetic-badges"),
    },
    {
      id: "drinkware",
      slug: "drinkware-mugs",
      name: "Drinkware, Travel Flasks & Ceramic Mugs",
      shortLabel: "Drinkware & Mugs (4)",
      badge: "12h Hot / 24h Cold",
      icon: Coffee,
      description: "3-piece SG21 travel flask & handle cup gift sets and dishwasher-safe dual-tone inner ceramic mugs.",
      products: products.filter((p) => p.categorySlug === "drinkware-mugs"),
    },
    {
      id: "apparel",
      slug: "custom-caps",
      name: "Custom Caps & Premium Apparel",
      shortLabel: "Caps & Apparel (9)",
      badge: "Bio-Washed & Fleece",
      icon: Shirt,
      description: "Personalized script caps, 3D puff embroidery, 100% bio-washed tees, and heavyweight 380 GSM hoodies.",
      products: products.filter(
        (p) =>
          p.categorySlug === "custom-caps" ||
          p.categorySlug === "custom-t-shirts" ||
          p.categorySlug === "hoodies-sweatshirts"
      ),
    },
  ];

  // Specific single category list when tab is selected
  const activeCategory = categorySections.find((c) => c.slug === activeTab);
  const filteredProducts = activeCategory ? activeCategory.products : [];

  // Initial ScrollTrigger entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-product-card",
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards on tab change
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 12, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.04, duration: 0.35, ease: "power2.out", clearProps: "all" }
    );
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="py-20 bg-[#0B0F19] text-white border-b border-slate-800 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF4D36] uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>Category-Wise Product Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Explore Our Custom Collections
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Organized category-wise from custom anniversary frames and 3D LED lamps to corporate kits and event badges.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FF4D36] hover:text-white transition-colors group"
          >
            <span>See Full Catalog ({products.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none w-full max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#FF4D36] text-white shadow-lg shadow-[#FF4D36]/25 scale-102"
                : "bg-[#131926] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            All Categories ({products.length})
          </button>

          {categorySections.map((sec) => (
            <button
              key={sec.slug}
              type="button"
              onClick={() => setActiveTab(sec.slug)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === sec.slug
                  ? "bg-[#FF4D36] text-white shadow-lg shadow-[#FF4D36]/25 scale-102"
                  : "bg-[#131926] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {sec.shortLabel}
            </button>
          ))}
        </div>

        {/* View 1: When a specific category is selected, display ALL products of that category */}
        {activeTab !== "all" && activeCategory && (
          <div>
            {/* Category Header Banner */}
            <div className="bg-[#131926] rounded-2xl p-5 border border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B0F19] text-[#FF4D36] flex items-center justify-center shrink-0 border border-slate-800">
                  <activeCategory.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {activeCategory.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF4D36]/15 text-[#FF4D36] text-[10px] font-bold">
                      {activeCategory.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {activeCategory.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-bold text-slate-400">
                  Showing <strong>{activeCategory.products.length}</strong> Products
                </span>
                <Link
                  href={`/category/${activeCategory.slug}`}
                  className="px-4 py-2 rounded-xl bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs font-bold transition-all shadow-md shadow-[#FF4D36]/20 flex items-center gap-1.5"
                >
                  <span>View Full Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Grid of All Products in Category (2 Columns on Mobile) */}
            <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="featured-product-card">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 2: When "All Categories" is selected, display products organized Category-by-Category in Shelves */}
        {activeTab === "all" && (
          <div className="space-y-10 sm:space-y-12">
            {categorySections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div key={sec.slug} className="space-y-4 sm:space-y-5">
                  {/* Category Shelf Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#131926] text-[#FF4D36] flex items-center justify-center shrink-0 border border-slate-800 shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                            {sec.name}
                          </h3>
                          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">
                            {sec.products.length} items
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                          {sec.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveTab(sec.slug)}
                        className="text-xs font-bold text-[#FF4D36] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>View All ({sec.products.length})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 4-Item Preview Grid (2 Columns on Mobile) */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {sec.products.slice(0, 4).map((product) => (
                      <div key={product.id} className="featured-product-card">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF4D36] hover:bg-[#e0351d] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF4D36]/25 transition-all"
          >
            <span>Browse Complete {products.length}+ Product Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
