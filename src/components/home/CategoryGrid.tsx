"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers } from "lucide-react";
import { categories } from "@/data/categories";
import { gsap } from "@/lib/gsap";

export const CategoryGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".category-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF4D24] uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Browse by Category</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#142344] tracking-tight">
              Custom Merch Designed For You
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              From zero-pinhole magnetic badges to heavyweight fleece apparel. Select a category to start customizing.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FF4D24] hover:text-[#E03C14] transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="category-card group relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 hover:border-[#142344]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {cat.badge && (
                  <span className="absolute top-4 left-4 bg-[#FF4D24] text-white text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                    {cat.badge}
                  </span>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs text-slate-200 font-medium">
                    {cat.itemCount}+ Products
                  </span>
                  <h3 className="text-xl font-black tracking-tight text-white group-hover:text-[#FF4D24] transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#142344] group-hover:text-[#FF4D24] transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
