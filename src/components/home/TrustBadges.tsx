"use client";

import React, { useRef, useEffect } from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  Award,
} from "lucide-react";
import { gsap } from "@/lib/gsap";

export const TrustBadges: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trust-item-card",
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 88%",
            once: true,
          },
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      title: "Free Digital Proof",
      desc: "Live mockups approved before print starts",
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="trust-item-card p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-[var(--color-primary)] leading-tight mb-1">
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
