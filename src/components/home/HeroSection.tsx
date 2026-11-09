"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Copy,
  Check,
  Star,
  Package,
  Play,
  ArrowRight,
  PenTool,
  Truck,
  Building2,
  MapPin,
  Gift,
  X,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import confetti from "canvas-confetti";

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { showToast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText("SPECIAL15");
    setCopied(true);
    showToast("Coupon SPECIAL15 copied to clipboard!", "success");

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#142344", "#FF4D24", "#FFD700"],
      });
    } catch {
      // ignore
    }

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <section className="relative bg-white pt-8 pb-16 border-b border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Heading, Offers, Stats, CTAs, 2x2 Grid (7 cols) */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6">
              {/* 1. Promotional Coupon Banner (Matching Reference Image) */}
              <div className="inline-flex items-center justify-between gap-3 p-2 pr-2.5 rounded-xl bg-orange-50 border border-orange-200/80 text-xs w-full max-w-lg">
                <div className="flex items-center gap-2 text-slate-800 font-semibold truncate">
                  <div className="w-7 h-7 rounded-lg bg-[#FF4D24] text-white flex items-center justify-center shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <span className="truncate">Extra 15% off on first order</span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-[#FF4D24] bg-white text-[#FF4D24] font-mono font-bold hover:bg-orange-100 transition-colors shrink-0"
                >
                  <span>SPECIAL15</span>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* 2. Main Heading (Matching Exact Layout) */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] text-[#142344]">
                  Your Logo. <br />
                  <span className="text-[#FF4D24]">On Magnetic Badges.</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-3.5 font-medium leading-relaxed">
                  Made in our own factory in Noida NCR. Dispatched in 24–48 hours across India.
                </p>
              </div>

              {/* 3. Stats Cards (Two Side-by-Side Rectangles) */}
              <div className="grid grid-cols-2 gap-3 max-w-md">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-black text-sm text-[#142344]">4.4</span>
                      <div className="flex text-amber-500 text-xs">★★★★★</div>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">3,400+ Reviews</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#FF4D24] flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-black text-sm text-[#142344]">81,000+</div>
                    <div className="text-[11px] text-slate-500 font-medium">Orders Delivered</div>
                  </div>
                </div>
              </div>

              {/* 4. Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {/* Watch Factory Tour Button with Play Icon and warm orange shadow */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-5 py-3.5 bg-[#FF4D24] hover:bg-[#E03C14] text-white rounded-xl shadow-lg shadow-[#FF4D24]/30 transition-all flex items-center gap-3 group active:scale-98"
                >
                  <div className="w-8 h-8 rounded-full bg-white text-[#FF4D24] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-[#FF4D24] ml-0.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold leading-none">Watch Factory Tour</div>
                    <div className="text-[10px] text-orange-100 mt-0.5 leading-none">1 min video</div>
                  </div>
                </button>

                {/* Shop Best Sellers Button */}
                <Link
                  href="/products"
                  className="px-6 py-4 bg-white hover:bg-slate-50 text-[#142344] font-bold text-xs rounded-xl border border-slate-300 shadow-2xs transition-colors flex items-center gap-2"
                >
                  <span>Shop Best Sellers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 5. 2x2 Trust Indicators Grid (Matching Screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <PenTool className="w-5 h-5 text-[#FF4D24] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#142344]">Approve Before We Print</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Upload your logo, preview it live</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#FF4D24] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#142344]">Dispatch in 24–48 hrs</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Straight from our factory floor</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#FF4D24] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#142344]">In-house manufacturing</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Our own factory in Noida NCR</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF4D24] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#142344]">Pan-India delivery</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Safe, tracked shipping</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 2x2 Product Showcase Cards Grid (6 cols) */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Magnetic Badges Card */}
                <Link
                  href="/products/prod-1"
                  className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-xl hover:border-[#142344]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-black tracking-tight text-[#142344] uppercase">
                      MAGNETIC BADGES
                    </div>
                    <div className="text-[10px] font-bold text-[#FF4D24] uppercase tracking-wide">
                      WITH YOUR COMPANY LOGO
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-1">
                      Custom magnetic badges for founders and their teams
                    </p>

                    <div className="relative aspect-4/3 w-full my-3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60">
                      <Image
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                        alt="Custom Magnetic Name Badges"
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-2xs px-2 py-0.5 rounded text-[10px] font-bold text-slate-700">
                        Zero Pinholes
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#142344]">Magnetic Badge</div>
                      <div className="text-xs font-black text-[#FF4D24]">₹ 999 for 5 pcs</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#FF4D24] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>

                {/* 2. Customized Printed T-Shirts Card */}
                <Link
                  href="/products/prod-2"
                  className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-xl hover:border-[#142344]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-black tracking-tight text-[#142344] uppercase">
                      CUSTOMIZED PRINTED T-SHIRTS
                    </div>
                    <div className="text-[10px] font-bold text-[#FF4D24] uppercase tracking-wide">
                      WITH YOUR COMPANY LOGO
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-1">
                      100% Bio-washed combed cotton with high-density print
                    </p>

                    <div className="relative aspect-4/3 w-full my-3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60">
                      <Image
                        src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
                        alt="Customized Printed Polo T-Shirts"
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 left-2 bg-[#142344]/80 backdrop-blur-2xs text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        Front & Back Print
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#142344]">Polo T-Shirt</div>
                      <div className="text-xs font-black text-[#FF4D24]">₹ 1,449 for 2 pcs</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#FF4D24] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>

                {/* 3. Customized Caps Card */}
                <Link
                  href="/products/prod-4"
                  className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-xl hover:border-[#142344]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-black tracking-tight text-[#142344] uppercase">
                      CUSTOMIZED CAPS
                    </div>
                    <div className="text-[10px] font-bold text-[#FF4D24] uppercase tracking-wide">
                      WITH YOUR COMPANY LOGO
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-1">
                      Structured 6-panel twill with 3D puff embroidery
                    </p>

                    <div className="relative aspect-4/3 w-full my-3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60">
                      <Image
                        src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80"
                        alt="Customized Caps with Embroidery"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-2xs px-2 py-0.5 rounded text-[10px] font-bold text-slate-700">
                        Universal Fit
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#142344]">Caps</div>
                      <div className="text-xs font-black text-[#FF4D24]">₹ 1,390 for 5 pcs</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#FF4D24] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>

                {/* 4. Customized Printed Hoodies Card */}
                <Link
                  href="/products/prod-3"
                  className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-xl hover:border-[#142344]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-black tracking-tight text-[#142344] uppercase">
                      CUSTOMIZED PRINTED HOODIES
                    </div>
                    <div className="text-[10px] font-bold text-[#FF4D24] uppercase tracking-wide">
                      WITH YOUR COMPANY LOGO
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-1">
                      Heavyweight 380 GSM fleece with inner kangaroo pocket
                    </p>

                    <div className="relative aspect-4/3 w-full my-3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60">
                      <Image
                        src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
                        alt="Customized Fleece Hoodies"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 left-2 bg-[#142344]/80 backdrop-blur-2xs text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        380 GSM Fleece
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#142344]">Hoodies</div>
                      <div className="text-xs font-black text-[#FF4D24]">₹ 2,034 for 2 pcs</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#FF4D24] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tour Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#142344] rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="p-4 border-b border-slate-700 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#FF4D24]" />
                <span className="font-bold text-sm">Inside MyPrintHub Factory • Noida NCR</span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-white text-center">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80"
                  alt="Factory Floor"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#FF4D24] text-white flex items-center justify-center shadow-xl mb-3">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  <span className="text-sm font-bold">10,000 Sq. Ft. Manufacturing & Laser Lab</span>
                  <span className="text-xs text-slate-300">Plot 42, Electronic City, Sector 62, Noida</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs text-left">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[#FF4D24] font-bold">UV DTF Printers</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Mimaki Japanese 1200 DPI</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[#FF4D24] font-bold">Laser Engravers</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Fiber laser rotary units</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[#FF4D24] font-bold">Daily Output</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">5,000+ units dispatched</div>
                </div>
              </div>

              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="mt-2 px-6 py-2.5 bg-[#FF4D24] text-white text-xs font-bold rounded-xl hover:bg-[#E03C14] transition-colors"
              >
                Close Video Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
