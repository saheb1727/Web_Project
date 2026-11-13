"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { categories } from "@/data/categories";
import { gsap } from "@/lib/gsap";

export const CategoryGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".category-bento-card",
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#F95738] uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Curated Product Collections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
              Custom Merch Built For Teams & Brands
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Engineered with industrial precision in our Noida NCR manufacturing facility with zero minimums.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#F95738] hover:text-[#d64023] transition-colors group"
          >
            <span>Explore All 150+ Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Flagship Magnetic Badges (Featured Spanning 2 Columns on LG) */}
          <Link
            href="/category/magnetic-badges"
            className="category-bento-card lg:col-span-2 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#1E1B4B] to-[#110E38] text-white p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[340px]"
          >
            <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden opacity-30 lg:opacity-40 pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                alt="Magnetic Name Badges"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-md space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F95738] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3 h-3" />
                <span>Our #1 Flagship Product</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Neodymium Magnetic Name Badges
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Zero pinholes on executive suits and formal shirts. Triple-magnet rare-earth fasteners with 2.5 kg pull strength and laser-cut metallic finish.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                  Zero Fabric Damage
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                  18+ Formats
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                  From ₹28 / pc
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-6 flex items-center justify-between border-t border-white/15 mt-4">
              <span className="text-xs font-bold text-white flex items-center gap-1 group-hover:text-[#F95738] transition-colors">
                <span>Customize Badges Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-xs font-mono text-slate-400">18 designs</span>
            </div>
          </Link>

          {/* Card 2: Custom T-Shirts */}
          <Link
            href="/category/custom-t-shirts"
            className="category-bento-card group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Best Seller
                </span>
                <span className="text-xs text-slate-400 font-bold">42+ styles</span>
              </div>
              <h3 className="text-xl font-black text-[#1E1B4B] group-hover:text-[#F95738] transition-colors">
                Custom Printed T-Shirts
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                100% Super-combed bio-washed cotton & dry-fit tees with durable DTF and screen printing.
              </p>
            </div>

            <div className="relative aspect-16/10 w-full my-4 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
                alt="Custom T-Shirts"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/60">
              <span>From ₹149 / pc</span>
              <ArrowRight className="w-4 h-4 text-[#F95738] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Winter Hoodies */}
          <Link
            href="/category/hoodies-sweatshirts"
            className="category-bento-card group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  Winter Special
                </span>
                <span className="text-xs text-slate-400 font-bold">24+ styles</span>
              </div>
              <h3 className="text-xl font-black text-[#1E1B4B] group-hover:text-[#F95738] transition-colors">
                Hoodies & Sweatshirts
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Heavyweight 380 GSM fleece winter hoodies with high-definition embroidery and custom prints.
              </p>
            </div>

            <div className="relative aspect-16/10 w-full my-4 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
                alt="Winter Hoodies"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/60">
              <span>From ₹549 / pc</span>
              <ArrowRight className="w-4 h-4 text-[#F95738] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Custom Embroidered Caps */}
          <Link
            href="/category/custom-caps"
            className="category-bento-card group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  Accessories
                </span>
                <span className="text-xs text-slate-400 font-bold">16+ styles</span>
              </div>
              <h3 className="text-xl font-black text-[#1E1B4B] group-hover:text-[#F95738] transition-colors">
                Custom Embroidered Caps
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Structured 6-panel cotton twill & breathable trucker caps with 3D puff embroidery.
              </p>
            </div>

            <div className="relative aspect-16/10 w-full my-4 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80"
                alt="Embroidered Caps"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/60">
              <span>From ₹115 / pc</span>
              <ArrowRight className="w-4 h-4 text-[#F95738] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Corporate Kits & Drinkware */}
          <Link
            href="/category/corporate-kits"
            className="category-bento-card group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Bulk Enterprise
                </span>
                <span className="text-xs text-slate-400 font-bold">30+ items</span>
              </div>
              <h3 className="text-xl font-black text-[#1E1B4B] group-hover:text-[#F95738] transition-colors">
                Corporate Welcome Kits
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Satin lanyards, RFID cards, laser-engraved metal pens, and executive diaries.
              </p>
            </div>

            <div className="relative aspect-16/10 w-full my-4 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80"
                alt="Corporate Kits"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/60">
              <span>Wholesale Deals</span>
              <ArrowRight className="w-4 h-4 text-[#F95738] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
};
