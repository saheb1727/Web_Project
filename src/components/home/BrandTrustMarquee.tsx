"use client";

import React, { useRef, useEffect } from "react";
import { Building2, Sparkles, ShieldCheck } from "lucide-react";
import { gsap } from "@/lib/gsap";

export const BrandTrustMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const brands = [
    { name: "Razorpay", category: "Fintech" },
    { name: "Swiggy", category: "Food & Delivery" },
    { name: "Zomato", category: "Food Tech" },
    { name: "CRED", category: "Members Club" },
    { name: "Zepto", category: "Quick Commerce" },
    { name: "IIT Delhi", category: "Institutes" },
    { name: "Tata 1mg", category: "Healthcare" },
    { name: "Lenskart", category: "Eyewear & Retail" },
    { name: "Urban Company", category: "Services" },
    { name: "PhysicsWallah", category: "EdTech" },
  ];

  // Infinite GSAP Marquee loop
  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      // Create seamless infinite loop
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <section
      ref={marqueeRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="py-4 bg-[#0B0F19] border-y border-white/10 overflow-hidden w-full max-w-full select-none"
    >
      <div className="flex items-center">
        {/* Fixed Left Badge */}
        <div className="shrink-0 pl-4 sm:pl-8 pr-6 z-10 bg-[#0B0F19] flex items-center gap-2 border-r border-white/10">
          <div className="w-6 h-6 rounded-lg bg-[#FF4D36]/15 flex items-center justify-center text-[#FF4D36]">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-300 hidden md:inline">
            Trusted by 2,500+ Brands
          </span>
        </div>

        {/* Continuous Scrolling Track */}
        <div className="overflow-hidden flex-1 relative">
          <div
            ref={trackRef}
            className="flex items-center gap-6 whitespace-nowrap will-change-transform"
            style={{ width: "fit-content" }}
          >
            {/* First Set of Brands */}
            {brands.concat(brands).map((b, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 transition-colors cursor-default group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D36]" />
                <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                  {b.name}
                </span>
                <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-300">
                  • {b.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandTrustMarquee;
