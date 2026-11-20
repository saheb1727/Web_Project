"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  ArrowRight,
  Building2,
  X,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  Heart,
  Briefcase,
  IdCard,
  Coffee,
  Shirt,
} from "lucide-react";
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
  specs: string;
}

export const HeroSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Spotlight stage items showcasing real user products
  const spotlightItems: SpotlightItem[] = [
    {
      id: "frames",
      category: "Photo Frames",
      title: "Anniversary & Memory Calendar Frame",
      subtitle: "Bespoke photo collage with custom month calendar and special heart date marker.",
      priceNote: "₹499 • Free Custom Personalization",
      badge: "Heart Date Marker",
      tag: "Trending Gift",
      image: "/images/products/anniversary-calendar-frame.jpg",
      href: "/products/prod-frame-1",
      specs: "1200 DPI Matte Glass",
    },
    {
      id: "lamps",
      category: "3D LED Lamps",
      title: "Laser Engraved 3D LED Acrylic Heart Lamp",
      subtitle: "Optical cast acrylic laser etched with couple names on a warm ambient solid wood base.",
      priceNote: "₹699 • Warm Golden Ambient Glow",
      badge: "Laser Calligraphy",
      tag: "Couple Special",
      image: "/images/products/led-acrylic-heart-lamp.jpg",
      href: "/products/prod-lamp-1",
      specs: "Warm 3000K LED Base",
    },
    {
      id: "hamper-oneplus",
      category: "VIP Hampers",
      title: "OnePlus Buddha Corporate Wellness Hamper",
      subtitle: "Stealth matte black laser-engraved 500ml vacuum bottle with meditating Buddha idol and tea lights.",
      priceNote: "₹899 • Designer Boxed Set",
      badge: "OnePlus Engraved",
      tag: "Executive Hamper",
      image: "/images/products/corporate-oneplus-buddha-hamper.jpg",
      href: "/products/prod-hamper-oneplus-buddha",
      specs: "Grade 304 Steel Flask",
    },
    {
      id: "wallet",
      category: "Leather Wallets",
      title: "Personalized Dual-Side Photo & Charm Wallet",
      subtitle: "Veg-tanned tan leather with front couple charm & brass nameplate plus back laser photo engraving.",
      priceNote: "₹499 • Dual-Side Engraved",
      badge: "Brass Nameplate",
      tag: "Heirloom Gift",
      image: "/images/products/personalized-photo-charm-leather-wallet.jpg",
      href: "/products/prod-wallet-photo-charm-tan",
      specs: "Veg-Tanned Tan Leather",
    },
    {
      id: "drinkware",
      category: "Travel Flasks",
      title: "Executive 3-Piece 500ml Thermal Flask Set",
      subtitle: "Double-wall vacuum flask with cup lid plus 2 additional matching insulated steel cups (SG 21).",
      priceNote: "₹499 • 6 Color Options",
      badge: "3-Piece Gift Set",
      tag: "12h Hot / 24h Cold",
      image: "/images/products/vacuum-flask-cup-gift-set.jpg",
      href: "/products/prod-kit-vacuum-flask-cups",
      specs: "SG 21 Travel Edition",
    },
    {
      id: "badges",
      category: "Event Badges",
      title: "Haldi 'Ladkiwale' Floral Wedding Badges",
      subtitle: "Festive 58mm turmeric-yellow button badges with cartoon caricatures and floral wreaths.",
      priceNote: "₹39/pc • Bulk Savings",
      badge: "Turmeric Yellow",
      tag: "Wedding Special",
      image: "/images/products/haldi-wedding-pin-badges.jpg",
      href: "/products/prod-badge-haldi-floral",
      specs: "58mm Gloss Mylar Face",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeSpotlight = spotlightItems[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % spotlightItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? spotlightItems.length - 1 : prev - 1));
  };

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
          ".hero-value-pills",
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
          ".hero-craft-strip",
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

  return (
    <>
      <section
        ref={heroRef}
        className="relative bg-gradient-to-b from-slate-50/90 via-white to-white pt-8 pb-14 lg:pt-12 lg:pb-16 border-b border-slate-200/80 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left Column: Heading, Subtitle, Value Checklist, CTAs, Studio Tech Strip (6 cols) */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-5">

              {/* 1. Live Studio Dispatch Indicator */}
              <div className="hero-badge-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-[#1E1B4B]">Ranchi & Noida Studio</span>
                <span className="text-slate-300">•</span>
                <span>24–48h Pan-India Dispatch</span>
              </div>

              {/* 2. Executive Headline */}
              <div>
                <h1 className="hero-main-title text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight leading-[1.1] text-[#1E1B4B] break-words">
                  Personalized Gifts &{" "}
                  <span className="text-[#F95738] block sm:inline">Custom Merchandise.</span>
                </h1>
                <p className="hero-main-desc text-sm sm:text-base text-slate-600 mt-3 font-medium leading-relaxed max-w-xl">
                  Bespoke anniversary calendar photo frames, 3D LED acrylic lamps, executive 4-in-1 leather gift sets, floating 24K gold pens, and zero-pinhole magnetic badges. Direct in-house factory manufacturing with instant digital proofs.
                </p>
              </div>

              {/* 3. Sleek Value Proposition Checklist Pills */}
              <div className="hero-value-pills flex flex-wrap items-center gap-2 pt-1 text-xs font-bold text-slate-700">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero MOQ (Order 1 or 1,000)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free Instant Digital Proof</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct Factory Pricing</span>
                </span>
              </div>

              {/* 4. Action CTAs */}
              <div className="hero-cta-group flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                {/* Primary CTA */}
                <Link
                  href="/products"
                  className="px-6 py-3.5 bg-[#F95738] hover:bg-[#e04526] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98 w-full sm:w-auto"
                >
                  <span>Explore All 56 Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Secondary Factory Tour CTA */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-5 py-3.5 bg-white hover:bg-slate-50 text-[#1E1B4B] text-xs sm:text-sm font-bold rounded-2xl border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 w-full sm:w-auto"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center shrink-0">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                  <span>Studio Tour (1 min)</span>
                </button>
              </div>

              {/* 5. Modern Studio Technology Mini-Strip (Fills skeleton cleanly) */}
              <div className="hero-craft-strip pt-3 border-t border-slate-200/80 max-w-xl">
                <div className="grid grid-cols-3 gap-2 text-left">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <div className="text-[11px] font-black text-[#1E1B4B]">1,200 DPI</div>
                    <div className="text-[10px] text-slate-500 font-medium">Japanese UV DTF</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <div className="text-[11px] font-black text-[#1E1B4B]">Neodymium</div>
                    <div className="text-[10px] text-slate-500 font-medium">Zero-Pinhole Magnets</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <div className="text-[11px] font-black text-[#1E1B4B]">Fiber Rotary</div>
                    <div className="text-[10px] text-slate-500 font-medium">Laser Engraving</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: New Interactive Studio Stage Skeleton (6 cols) */}
            <div className="lg:col-span-6 xl:col-span-6 w-full max-w-full overflow-hidden">
              <div className="hero-stage-container w-full max-w-full bg-white rounded-3xl border border-slate-200 shadow-2xl p-4 sm:p-6 overflow-hidden">

                {/* Stage Header: Category Pills with Active Highlight & Controls */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none min-w-0">
                    {spotlightItems.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          activeIndex === idx
                            ? "bg-[#1E1B4B] text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                        }`}
                      >
                        {item.category}
                      </button>
                    ))}
                  </div>

                  {/* Previous / Next Arrow Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                      aria-label="Previous product"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                      aria-label="Next product"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Showcase Viewport */}
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/70 group">
                  <Image
                    key={activeSpotlight.id}
                    src={activeSpotlight.image}
                    alt={activeSpotlight.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
                    className="object-cover group-hover:scale-104 transition-transform duration-700 animate-in fade-in"
                  />

                  {/* Floating Floating Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#1E1B4B]/95 text-white text-[10px] font-bold backdrop-blur-md shadow-sm">
                      {activeSpotlight.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-800 text-[10px] font-bold backdrop-blur-md shadow-sm">
                      {activeSpotlight.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-700 shadow-sm">
                    {activeSpotlight.specs}
                  </div>
                </div>

                {/* Interactive Multi-Product Thumbnail Switcher Bar */}
                <div className="grid grid-cols-6 gap-2 pt-3 pb-1">
                  {spotlightItems.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                        activeIndex === idx
                          ? "border-[#F95738] shadow-sm scale-102 ring-1 ring-[#F95738]"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      title={item.title}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Product Meta & Direct Action Link */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E1B4B] hover:bg-[#F95738] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 group/btn"
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
                <span className="font-bold text-sm">Inside MyPrintHub Factory Studio • Ranchi Lab</span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-white text-center">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center shadow-inner">
                <video
                  src="/videos/reel-2.mp4"
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <span className="text-sm font-bold block text-white">Manufacturing Lab & Assembly Studio</span>
                <span className="text-xs text-slate-300">Hosir, Kargil Colony, Kanke, Ranchi-834006</span>
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
