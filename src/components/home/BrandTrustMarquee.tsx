"use client";

import React from "react";
import { Building2, ShieldCheck, Sparkles, Award } from "lucide-react";

export const BrandTrustMarquee: React.FC = () => {
  const brands = [
    { name: "Razorpay", category: "Fintech" },
    { name: "Swiggy", category: "Food & Delivery" },
    { name: "Zomato", category: "Food Tech" },
    { name: "CRED", category: "Members Club" },
    { name: "Zepto", category: "Quick Commerce" },
    { name: "IIT Delhi", category: "Institutes" },
    { name: "Tata 1mg", category: "Healthcare" },
    { name: "Lenskart", category: "Eyewear & Retail" },
  ];

  return (
    <section className="py-6 bg-slate-50/80 border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Label */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            <Building2 className="w-4 h-4 text-[#F95738]" />
            <span>Trusted by 2,500+ Teams & Brands</span>
          </div>

          {/* Brands Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-xs font-black text-slate-600 tracking-tight">
            {brands.map((b, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-white hover:text-[#1E1B4B] transition-colors cursor-default"
                title={`${b.name} (${b.category})`}
              >
                <span className="text-slate-400 font-mono text-[10px]">#</span>
                <span className="font-extrabold text-slate-700">{b.name}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

