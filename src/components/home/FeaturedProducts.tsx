"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { gsap } from "@/lib/gsap";

export const FeaturedProducts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filterTabs = [
    { id: "all", label: "All Merch" },
    { id: "Magnetic Badges", label: "Magnetic Badges" },
    { id: "Custom T-Shirts", label: "T-Shirts" },
    { id: "Hoodies & Sweatshirts", label: "Hoodies" },
    { id: "Drinkware & Ceramic Mugs", label: "Drinkware" },
  ];

  const filteredProducts =
    activeTab === "all"
      ? products.slice(0, 8)
      : products.filter((p) => p.category === activeTab);

  // Initial ScrollTrigger entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".featured-product-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 35,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards on tab change
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 15, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" }
    );
  }, [activeTab]);

  return (
    <section ref={sectionRef} className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF4D24] uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>Trending & Best Sellers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#142344] tracking-tight">
              Top Custom Products
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Engineered with industrial precision and ready for your personalized branding.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FF4D24] hover:text-[#E03C14] transition-colors group"
          >
            <span>See Full Catalog ({products.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#142344] text-white shadow-md scale-102"
                  : "bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="featured-product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#142344] hover:bg-[#0D1830] text-white text-sm font-bold rounded-xl shadow-lg transition-all"
          >
            <span>Browse All {products.length}+ Products & Corporate Kits</span>
            <ArrowRight className="w-4 h-4 text-[#FF4D24]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
