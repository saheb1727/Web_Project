"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles, Tag, ArrowRight } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import confetti from "canvas-confetti";
import Link from "next/link";

export const CouponBanner: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code "${code}" copied to clipboard!`, "success");

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#142344", "#FF4D24", "#FFD700", "#FFFFFF"],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

  return (
    <section className="py-8 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#142344] via-[#1B315F] to-[#142344] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          {/* Subtle geometric lines */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#FF4D24]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative">
            {/* Left Offer Description */}
            <div className="lg:col-span-7 space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4D24]/20 border border-[#FF4D24]/30 text-[#FF4D24] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Welcome Offer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Get <span className="text-[#FF4D24]">Flat 15% OFF</span> On Your First Order
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                Ready to brand your business or order custom event merchandise? Use our exclusive promotional code at checkout.
              </p>
            </div>

            {/* Right: Interactive Coupon Ticket */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3">
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl p-2 border-2 border-dashed border-[#FF4D24]/50 shadow-inner">
                <div className="px-4 py-2 border-r border-white/20 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider block">
                    Coupon Code
                  </span>
                  <span className="text-xl font-black font-mono tracking-widest text-[#FF4D24]">
                    PRINT15
                  </span>
                </div>
                <button
                  onClick={() => handleCopy("PRINT15")}
                  className="ml-2 px-4 py-2.5 bg-[#FF4D24] hover:bg-[#E03C14] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 active:scale-95"
                  aria-label="Copy coupon code PRINT15"
                >
                  {copiedCode === "PRINT15" ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <Link
                href="/products"
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-white/20"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF4D24]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

