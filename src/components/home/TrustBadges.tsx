"use client";

import React from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  Award,
} from "lucide-react";

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: RotateCcw,
      title: "No Minimum Order",
      desc: "Customize just 1 piece or 10,000 without penalty",
    },
    {
      icon: Zap,
      title: "24-48h Fast Dispatch",
      desc: "Rapid turnaround on all custom merchandise",
    },
    {
      icon: ShieldCheck,
      title: "Print Perfection",
      desc: "Zero-defect guarantee with free replacement reprint",
    },
    {
      icon: Award,
      title: "Rare-Earth Magnets",
      desc: "Zero fabric holes on suits and formal shirts",
    },
    {
      icon: Truck,
      title: "Free Express Shipping",
      desc: "On all prepaid orders over ₹999 pan-India",
    },
    {
      icon: Sparkles,
      title: "Free Design Support",
      desc: "Our in-house design team verifies every vector logo",
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#142344]/30 hover:bg-slate-100/60 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center text-[#FF4D24] mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-[#142344] mb-1">
                  {b.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

