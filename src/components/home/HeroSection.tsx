"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Copy,
  Check,
  Star,
  Play,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  X,
  Truck,
  Flame,
  IdCard,
  Shirt,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { gsap } from "@/lib/gsap";

interface SpotlightItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  priceNote: string;
  badge: string;
  tag: string;
  image: string;
  href: string;
}

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { showToast } = useToast();
  const heroRef = useRef<HTMLElement>(null);

  // Spotlight stage items
  const spotlightItems: SpotlightItem[] = [
    {
      id: "badges",
      category: "Magnetic Badges",
      title: "Neodymium Magnetic Name Badges",
      subtitle: "Laser-cut metallic acrylic with 3-point rare-earth magnet fastener.",
      priceNote: "₹49/pc (Wholesale) • ₹999 for 5 pcs",
      badge: "Zero Pinholes",
      tag: "Flagship",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      href: "/products/prod-1",
    },
    {
      id: "tshirts",
      category: "Custom T-Shirts",
      title: "100% Bio-Washed Cotton Tees",
      subtitle: "220 GSM super-combed cotton with ultra-durable high-def DTF print.",
      priceNote: "₹149/pc (Wholesale) • ₹449 single",
      badge: "Zero Color Bleed",
      tag: "Best Seller",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      href: "/products/prod-2",
    },
    {
      id: "hoodies",
      category: "Winter Hoodies",
      title: "Heavyweight 380 GSM Fleece Hoodies",
      subtitle: "Brushed interior fleece with 3D puff embroidery and kangaroo pocket.",
      priceNote: "₹549/pc (Wholesale) • ₹1,299 single",
      badge: "Thermal Fleece",
      tag: "Winter Edition",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      href: "/products/prod-3",
    },
    {
      id: "caps",
      category: "Embroidered Caps",
      title: "6-Panel Cotton Twill Structured Caps",
      subtitle: "Breathable eyelets with brass buckle adjuster and front 3D embroidery.",
      priceNote: "₹115/pc (Wholesale) • ₹299 single",
      badge: "3D Puff Stitched",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
      href: "/products/prod-4",
    },
  ];

  const [activeSpotlight, setActiveSpotlight] = useState<SpotlightItem>(spotlightItems[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".hero-badge-pill",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, clearProps: "all" }
      )
        .fromTo(
          ".hero-main-title",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, clearProps: "all" },
          "-=0.25"
        )
        .fromTo(
          ".hero-main-desc",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, clearProps: "all" },
          "-=0.3"
        )
        .fromTo(
          ".hero-coupon-card",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, clearProps: "all" },
          "-=0.2"
        )
        .fromTo(
          ".hero-cta-group",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, clearProps: "all" },
          "-=0.2"
        )
        .fromTo(
          ".hero-stage-container",
          { opacity: 0, scale: 0.97, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, clearProps: "all" },
          "-=0.4"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCopyCode = async () => {
    navigator.clipboard.writeText("SPECIAL15");
    setCopied(true);
    showToast("Coupon SPECIAL15 copied to clipboard!", "success");

    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#1E1B4B", "#F95738", "#FFD700"],
      });
    } catch {
      // ignore confetti error
    }

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <section
        ref={heroRef}
        className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-slate-200/80 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Subtitle, Coupon, CTAs, Social Proof (6 cols) */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6">
              
              {/* 1. Live Factory Floor Indicator */}
              <div className="hero-badge-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-[#1E1B4B]">Factory Online</span>
                <span className="text-slate-300">•</span>
                <span>24–48h Pan-India Dispatch</span>
              </div>

              {/* 2. Executive Headline */}
              <div>
                <h1 className="hero-main-title text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.08] text-[#1E1B4B]">
                  Industrial-Grade <br />
                  <span className="text-[#F95738]">Custom Merchandise.</span>
                </h1>
                <p className="hero-main-desc text-sm sm:text-base text-slate-600 mt-4 font-medium leading-relaxed max-w-xl">
                  Rare-earth magnetic name badges, 100% bio-washed cotton apparel, and corporate welcome kits manufactured in our Noida NCR facility. Zero minimums, instant digital proofs, and wholesale tier pricing.
                </p>
              </div>

              {/* 3. 1-Click First Order Coupon Bar */}
              <div className="hero-coupon-card p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100/90 flex items-center justify-between gap-3 max-w-lg shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#F95738] text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                    %
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#1E1B4B] truncate">
                      Extra 15% Off Your First Order
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      Valid on custom badges, apparel, & kits
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-[#F95738] bg-white text-[#F95738] font-mono font-bold text-xs hover:bg-slate-50 transition-colors shrink-0 cursor-pointer shadow-2xs"
                >
                  <span>SPECIAL15</span>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* 4. Action CTAs */}
              <div className="hero-cta-group flex flex-wrap items-center gap-3 pt-1">
                {/* Primary CTA */}
                <Link
                  href="/products"
                  className="px-6 py-3.5 bg-[#F95738] hover:bg-[#e04526] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg transition-all flex items-center gap-2 group cursor-pointer active:scale-98"
                >
                  <span>Explore Best Sellers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary Factory Tour CTA */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-5 py-3.5 bg-white hover:bg-slate-50 text-[#1E1B4B] text-xs sm:text-sm font-bold rounded-2xl border border-slate-200 shadow-2xs transition-all flex items-center gap-2.5 cursor-pointer active:scale-98"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center shrink-0">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                  <span>Factory Tour (1 min)</span>
                </button>
              </div>

              {/* 5. Live Trust Indicators Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200/70 max-w-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1E1B4B]">4.9 / 5.0</div>
                    <div className="text-[10px] text-slate-500 font-medium">3,400+ Reviews</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-[#1E1B4B]" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1E1B4B]">81,000+</div>
                    <div className="text-[10px] text-slate-500 font-medium">Dispatched</div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#1E1B4B]">Zero MOQ</div>
                    <div className="text-[10px] text-slate-500 font-medium">Order 1 or 1,000</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Merch Spotlight Stage (6 cols) */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="hero-stage-container bg-white rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-6 overflow-hidden">
                
                {/* Stage Category Selectors */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 border-b border-slate-100 scrollbar-none">
                  {spotlightItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSpotlight(item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        activeSpotlight.id === item.id
                          ? "bg-[#1E1B4B] text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                      }`}
                    >
                      {item.category}
                    </button>
                  ))}
                </div>

                {/* Stage Spotlight Display Card */}
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/70 group">
                  <Image
                    key={activeSpotlight.id}
                    src={activeSpotlight.image}
                    alt={activeSpotlight.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 animate-in fade-in"
                  />

                  {/* Floating Tags on Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#1E1B4B]/95 text-white text-[10px] font-bold backdrop-blur-md shadow-sm">
                      {activeSpotlight.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-800 text-[10px] font-bold backdrop-blur-md shadow-sm">
                      {activeSpotlight.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-700 shadow-sm">
                    In-House Laser & UV
                  </div>
                </div>

                {/* Product Meta & Direct Action Link */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-[#1E1B4B]">
                      {activeSpotlight.title}
                    </h3>
                    <p className="text-xs font-bold text-[#F95738] mt-0.5">
                      {activeSpotlight.priceNote}
                    </p>
                  </div>

                  <Link
                    href={activeSpotlight.href}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1E1B4B] hover:bg-[#110E38] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 group/btn"
                  >
                    <span>Customize Item</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Video Tour Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#1E1B4B] rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#F95738]" />
                <span className="font-bold text-sm">Inside MyPrintHub Factory Floor • Noida NCR</span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-white text-center">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80"
                  alt="Factory Floor"
                  fill
                  sizes="800px"
                  className="object-cover opacity-60"
                />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#F95738] text-white flex items-center justify-center shadow-xl mb-3">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  <span className="text-sm font-bold">10,000 Sq. Ft. Manufacturing & Laser Lab</span>
                  <span className="text-xs text-slate-300">Plot 42, Electronic City, Sector 62, Noida</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs text-left">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#F95738] font-bold">UV DTF Printers</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Mimaki Japanese 1200 DPI</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#F95738] font-bold">Laser Engravers</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Fiber laser rotary units</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#F95738] font-bold">Daily Output</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">5,000+ units dispatched</div>
                </div>
              </div>

              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="mt-2 px-6 py-2.5 bg-[#F95738] text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
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
