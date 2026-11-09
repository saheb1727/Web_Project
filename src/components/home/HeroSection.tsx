"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Star,
  Layers,
  CheckCircle2,
} from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 lg:py-20 border-b border-slate-200/60">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#142344]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FF4D24]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Subtitle, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#142344]/5 border border-[#142344]/15 text-[#142344] text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FF4D24] animate-ping" />
              <span>India&apos;s Premium On-Demand Print Partner</span>
              <span className="text-slate-300">|</span>
              <span className="text-[#FF4D24]">0 Minimum Order</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#142344] tracking-tight leading-[1.1]">
              Your Brand. <br />
              Your Style. <br />
              <span className="text-[#FF4D24]">Your Print.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Elevate your team, startup, or event with executive{" "}
              <strong className="text-slate-900 font-semibold">neodymium magnetic badges</strong>,{" "}
              custom bio-washed apparel, heavyweight 380 GSM fleece hoodies, and corporate welcome kits.
              Delivered across India with factory-direct bulk discounts.
            </p>

            {/* Highlights bullet list */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF4D24]" />
                <span>Zero Pinholes (Magnetic Badges)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF4D24]" />
                <span>100% Combed Cotton</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF4D24]" />
                <span>24-48h Dispatch</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#FF4D24] hover:bg-[#E03C14] text-white font-bold rounded-xl shadow-lg shadow-[#FF4D24]/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 text-base group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/products/prod-1"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#142344] hover:bg-[#0D1830] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base"
              >
                <Sparkles className="w-4 h-4 text-[#FF4D24]" />
                <span>Customize Magnetic Badges</span>
              </Link>
            </div>

            {/* Stats / Social Proof */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#142344]">50k+</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Custom Orders Delivered</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#142344] flex items-center justify-center lg:justify-start gap-1">
                  4.9 <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">5,000+ Reviews</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#FF4D24]">48h</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Pan-India Dispatch</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border border-slate-200/80">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
                    alt="Custom Premium T-Shirt Merch"
                    fill
                    priority
                    className="object-cover"
                  />
                  {/* Floating Mockup Tag */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FF4D24] text-white flex items-center justify-center font-bold text-xs">
                      HD
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Custom Screen & DTF</div>
                      <div className="text-[10px] text-emerald-600 font-bold">Photo-Realistic Quality</div>
                    </div>
                  </div>
                </div>

                {/* Sub row with Badges preview & Hoodies */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <Link
                    href="/products/prod-1"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-[#142344]/5 border border-slate-200 flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white relative overflow-hidden shrink-0 border border-slate-200">
                      <Image
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80"
                        alt="Magnetic Name Badge"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">Magnetic Badges</div>
                      <div className="text-[11px] font-bold text-[#FF4D24]">From ₹99/pc</div>
                    </div>
                  </Link>

                  <Link
                    href="/products/prod-3"
                    className="p-3 rounded-xl bg-slate-50 hover:bg-[#142344]/5 border border-slate-200 flex items-center gap-3 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white relative overflow-hidden shrink-0 border border-slate-200">
                      <Image
                        src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80"
                        alt="Custom Fleece Hoodie"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">380 GSM Hoodies</div>
                      <div className="text-[11px] font-bold text-[#FF4D24]">From ₹599/pc</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Floating Verified Quality Stamp */}
              <div className="absolute -top-4 -right-4 bg-[#142344] text-white p-3 rounded-2xl shadow-xl border-2 border-white flex items-center gap-2.5 animate-bounce">
                <ShieldCheck className="w-5 h-5 text-[#FF4D24]" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">
                    Print Guarantee
                  </div>
                  <div className="text-xs font-bold text-white">100% Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

