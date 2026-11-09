"use client";

import React, { useRef, useEffect } from "react";
import { PackageSearch, UploadCloud, Eye, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".how-step-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
        opacity: 0,
        y: 45,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      step: "01",
      icon: PackageSearch,
      title: "Choose Your Product",
      desc: "Select from magnetic name badges, premium bio-washed tees, fleece hoodies, caps, or executive corporate gift kits.",
    },
    {
      step: "02",
      icon: UploadCloud,
      title: "Upload Your Artwork",
      desc: "Upload your company logo, team vector design (PNG, SVG, PDF), or enter personalized names and designations.",
    },
    {
      step: "03",
      icon: Eye,
      title: "Live Mockup Preview",
      desc: "Review your print placement, scale, colors, and wholesale tiered volume discount in real time in our interactive customizer.",
    },
    {
      step: "04",
      icon: Truck,
      title: "Fast Doorstep Delivery",
      desc: "We print with industrial precision, quality-check each unit, and dispatch pan-India with live doorstep tracking.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#FF4D24] uppercase tracking-wider block mb-2">
            Effortless 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#142344] tracking-tight">
            How Custom Merch Works
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            No graphic design degree required. Create corporate-ready customized merchandise in under 3 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="how-step-card relative bg-slate-50 rounded-3xl p-6 border border-slate-200/80 hover:border-[#142344]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#142344] text-[#FF4D24] flex items-center justify-center shadow-md group-hover:bg-[#FF4D24] group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-300 group-hover:text-[#142344] transition-colors">
                      {s.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#142344] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-[#FF4D24]">
                  <span>Step {s.step}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF4D24] hover:bg-[#E03C14] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#FF4D24]/20 transition-all group"
          >
            <span>Start Customizing Your First Order</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
