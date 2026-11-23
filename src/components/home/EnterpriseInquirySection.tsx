"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { gsap } from "@/lib/gsap";

export const EnterpriseInquirySection: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            once: true,
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "all",
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#0B0F19] py-14 border-b border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Custom Enterprise Inquiry Card */}
        <div
          ref={cardRef}
          className="rounded-none border border-slate-800 bg-[#131926] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF4D36] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Dedicated Merch Specialist</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Have a custom enterprise inquiry?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-xl">
              Talk directly to our print engineers for custom Pantone matches, zero-pinhole badge prototyping, and specialized dimensions.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3.5 bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs sm:text-sm font-bold rounded-none shadow-lg shadow-[#FF4D36]/25 transition-all flex items-center gap-2.5 shrink-0 group cursor-pointer active:scale-98"
          >
            <MessageSquare className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span>Chat With Support</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default EnterpriseInquirySection;
