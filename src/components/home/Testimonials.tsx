"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#FF4D24] uppercase tracking-wider block mb-2">
            Verified Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#142344] tracking-tight">
            Loved by 50,000+ Teams & Brands
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            See how Indian startups, universities, and corporate leaders rely on MyPrintHub.in for high-impact custom merchandise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#142344]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-700 leading-relaxed mb-6 italic">
                  &quot;{t.comment}&quot;
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full relative overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#142344] flex items-center gap-1 truncate">
                      <span>{t.name}</span>
                      {t.verified && (
                        <CheckCircle2 className="w-3 h-3 text-[#FF4D24] shrink-0" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 text-[10px] font-semibold text-slate-400 truncate">
                  Ordered: <span className="text-[#142344]">{t.productOrdered}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

