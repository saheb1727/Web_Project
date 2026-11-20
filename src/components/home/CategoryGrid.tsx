"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Sparkles, Heart, Gift, Award } from "lucide-react";
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
              <span>Personalized Gifts & Custom Merchandise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
              Curated Collections Built For You
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              From bespoke anniversary calendar frames and 3D LED lamps to executive leather sets and magnetic badges.
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
          
          {/* Card 1: Custom Photo Frames & Keepsakes (Spanning 2 Columns on LG) */}
          <Link
            href="/category/custom-photo-frames"
            className="category-bento-card lg:col-span-2 group relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#1E1B4B] to-[#110E38] text-white p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[340px]"
          >
            <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden opacity-40 lg:opacity-50 pointer-events-none">
              <Image
                src="/images/products/anniversary-calendar-frame.jpg"
                alt="Custom Photo Frames"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-md space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F95738] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                <Heart className="w-3 h-3 fill-white" />
                <span>Trending Gift Collection</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Custom Calendar & Milestone Photo Frames
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Heart-marked anniversary calendars, relationship milestone timelines, and baby first-year collages. High-definition photographic prints with anti-glare protective lamination.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                  Custom Calendar Date
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                  A4 & A3 Sizes
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-slate-200">
                  From ₹269 / pc
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-6 flex items-center justify-between border-t border-white/15 mt-4">
              <span className="text-xs font-bold text-white flex items-center gap-1 group-hover:text-[#F95738] transition-colors">
                <span>Customize Your Frame Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-xs font-mono text-slate-400">18+ Designs</span>
            </div>
          </Link>

          {/* Card 2: 3D LED Acrylic Heart Lamps */}
          <Link
            href="/category/personalized-gifts"
            className="category-bento-card group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-800">
                  Valentine & Anniversary
                </span>
                <span className="text-xs text-slate-400 font-bold">24+ Styles</span>
              </div>
              <h3 className="text-xl font-black text-[#1E1B4B] group-hover:text-[#F95738] transition-colors">
                3D LED Acrylic Heart Lamps
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Optical cast acrylic laser engraved with custom couple calligraphy names on warm LED wooden base.
              </p>
            </div>

            <div className="relative aspect-16/10 w-full my-4 rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src="/images/products/led-acrylic-heart-lamp.jpg"
                alt="3D LED Acrylic Heart Lamp"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/60">
              <span>From ₹349 / pc</span>
              <ArrowRight className="w-4 h-4 text-[#F95738] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Executive 4-in-1 Leather Gift Hampers */}
          <Link
            href="/category/corporate-kits"
            className="category-bento-card group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Executive Hamper
                </span>
                <span className="text-xs text-slate-400 font-bold">Luxury Box</span>
              </div>
              <h3 className="text-xl font-black text-[#1E1B4B] group-hover:text-[#F95738] transition-colors">
                4-in-1 Leather Gift Hampers
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Customized passport cover, wallet, eyewear pouch, and keychain with personalized brass nameplates.
              </p>
            </div>

            <div className="relative aspect-16/10 w-full my-4 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="/images/products/executive-leather-gift-set.jpg"
                alt="Executive Leather Gift Hamper"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/60">
              <span>From ₹499 / pc</span>
              <ArrowRight className="w-4 h-4 text-[#F95738] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Floating 24K Gold Pens & Keychains */}
          <Link
            href="/category/corporate-kits"
            className="category-bento-card group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                  24K Gold Flakes
                </span>
                <span className="text-xs text-slate-400 font-bold">Appreciation</span>
              </div>
              <h3 className="text-xl font-black text-[#1E1B4B] group-hover:text-[#F95738] transition-colors">
                24K Gold Pens & Keychains
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Floating 24K gold foil laser engraved pens and personalized wooden & acrylic quote keychains.
              </p>
            </div>

            <div className="relative aspect-16/10 w-full my-4 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="/images/products/gold-foil-engraved-pens.jpg"
                alt="24K Floating Gold Pens"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/60">
              <span>From ₹75 / pc</span>
              <ArrowRight className="w-4 h-4 text-[#F95738] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Magnetic Badges & Wedding Pin Badges */}
          <Link
            href="/category/magnetic-badges"
            className="category-bento-card group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Zero Pinholes
                </span>
                <span className="text-xs text-slate-400 font-bold">Events & Teams</span>
              </div>
              <h3 className="text-xl font-black text-[#1E1B4B] group-hover:text-[#F95738] transition-colors">
                Magnetic & Wedding Badges
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Neodymium magnetic metallic name badges and glossy wedding pin badges (Ladki Wale / Ladke Wale).
              </p>
            </div>

            <div className="relative aspect-16/10 w-full my-4 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="/images/products/wedding-pin-badges.jpg"
                alt="Custom Wedding & Magnetic Badges"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/60">
              <span>From ₹16 / pc</span>
              <ArrowRight className="w-4 h-4 text-[#F95738] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: Dual-Tone Ceramic Mugs & Embroidered Caps */}
          <Link
            href="/category/drinkware-mugs"
            className="category-bento-card group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 hover:border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                  Drinkware & Caps
                </span>
                <span className="text-xs text-slate-400 font-bold">New Models</span>
              </div>
              <h3 className="text-xl font-black text-[#1E1B4B] group-hover:text-[#F95738] transition-colors">
                Dual-Tone Mugs & Custom Caps
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                AAA sublimation inner-color ceramic mugs and custom script embroidered cotton baseball caps.
              </p>
            </div>

            <div className="relative aspect-16/10 w-full my-4 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="/images/products/dual-tone-ceramic-mugs.jpg"
                alt="Dual Tone Ceramic Sublimation Mugs"
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-slate-200/60">
              <span>From ₹89 / pc</span>
              <ArrowRight className="w-4 h-4 text-[#F95738] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
};
