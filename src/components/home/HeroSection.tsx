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
  Heart,
  Briefcase,
  Coffee,
  Truck,
  MessageCircle,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { products } from "@/data/products";

interface KeepsakeItem {
  id: string;
  tabLabel: string;
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
  const keepsakePreviewRef = useRef<HTMLDivElement>(null);

  // Curated keepsake spotlight items for the main hero card
  const keepsakeItems: KeepsakeItem[] = [
    {
      id: "frame",
      tabLabel: "Anniversary Frame",
      category: "Photo Keepsakes",
      title: "Anniversary & Memory Calendar Frame",
      subtitle: "Bespoke photo collage with custom month calendar and special heart date marker.",
      priceNote: "₹499 • Free Custom Personalization",
      badge: "Heart Date Marker",
      tag: "Trending Keepsake",
      image: "/images/products/anniversary-calendar-frame.jpg",
      href: "/products/prod-frame-1",
      specs: "1,200 DPI Matte Glass",
    },
    {
      id: "lamp",
      tabLabel: "3D LED Lamp",
      category: "Ambient Lighting",
      title: "Laser Engraved 3D LED Acrylic Heart Lamp",
      subtitle: "Optical cast acrylic laser etched with couple names on a warm solid wood base.",
      priceNote: "₹699 • Warm Golden Glow",
      badge: "Warm 3000K LED",
      tag: "Romantic Gift",
      image: "/images/products/led-acrylic-heart-lamp.jpg",
      href: "/products/prod-lamp-1",
      specs: "Laser Calligraphy",
    },
    {
      id: "wallet",
      tabLabel: "Photo Charm Wallet",
      category: "Leather Gifts",
      title: "Personalized Dual-Side Photo & Charm Wallet",
      subtitle: "Veg-tanned tan leather with front couple charm plus back laser photo engraving.",
      priceNote: "₹499 • Dual-Side Engraved",
      badge: "Brass Nameplate",
      tag: "Heirloom Gift",
      image: "/images/products/personalized-photo-charm-leather-wallet.jpg",
      href: "/products/prod-wallet-photo-charm-tan",
      specs: "Veg-Tanned Tan Leather",
    },
  ];

  const [activeKeepsakeIndex, setActiveKeepsakeIndex] = useState(0);
  const currentKeepsake = keepsakeItems[activeKeepsakeIndex];

  // Animate preview on keepsake change
  useEffect(() => {
    if (keepsakePreviewRef.current) {
      gsap.fromTo(
        keepsakePreviewRef.current,
        { opacity: 0.35, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out", clearProps: "all" }
      );
    }
  }, [activeKeepsakeIndex]);

  // Master Hero GSAP Animations (Clean Staggered Entrance)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered Entrance with all transforms cleared upon completion
      tl.fromTo(
        ".hero-badge-pill",
        { opacity: 0, scale: 0.9, y: -15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)", clearProps: "all" }
      )
        .fromTo(
          ".hero-title-main",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          ".hero-subtitle-text",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta-btn",
          { opacity: 0, scale: 0.92, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)", clearProps: "all" },
          "-=0.3"
        )
        .fromTo(
          ".hero-bento-card-main",
          { opacity: 0, scale: 0.96, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out", clearProps: "all" },
          "-=0.3"
        )
        .fromTo(
          ".hero-bento-card-secondary",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          ".hero-guarantee-bar",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, clearProps: "all" },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative bg-[#FAFAFC] text-[#0B0F19] pt-8 pb-14 sm:pt-12 sm:pb-16 border-b border-slate-200/90 overflow-hidden"
      >
        {/* Precision Engineering Studio Background Layer */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          {/* Architectural 40px Engineering Grid */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(15, 23, 42, 0.045) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(15, 23, 42, 0.045) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse 90% 70% at 50% 25%, black 40%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 25%, black 40%, transparent 85%)",
            }}
          />

          {/* Micro Laser-Cut Dot Matrix Grid */}
          <div
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage: "radial-gradient(rgba(15, 23, 42, 0.12) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              maskImage: "radial-gradient(ellipse 75% 55% at 50% 30%, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 30%, black 30%, transparent 80%)",
            }}
          />

          {/* Ethereal Coral & Amber Studio Radial Aura behind Headline */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[440px] rounded-full blur-[110px] pointer-events-none -z-10"
            style={{
              background: "radial-gradient(circle, rgba(255, 77, 54, 0.08) 0%, rgba(251, 146, 60, 0.03) 45%, transparent 75%)",
            }}
          />
          <div
            className="absolute -top-12 left-1/4 -translate-x-1/2 w-[400px] h-[300px] rounded-full blur-[90px] pointer-events-none -z-10"
            style={{
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.04) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-10 right-1/4 translate-x-1/2 w-[420px] h-[300px] rounded-full blur-[90px] pointer-events-none -z-10"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%)",
            }}
          />

          {/* Precision Workshop Technical Crosshairs & Corner Registrations */}
          <div className="hidden sm:flex absolute top-6 left-6 lg:left-12 items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-slate-300">
            <span className="text-[#FF4D36]/80 font-black text-xs">+</span>
            <span>SPEC: 1,200 DPI JAPANESE MIMAKI</span>
          </div>
          <div className="hidden sm:flex absolute top-6 right-6 lg:right-12 items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-slate-300">
            <span>RANCHI STUDIO LAB // 24-48H</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* Subtle Studio Geometry Accents in Margins */}
          <div className="hidden xl:block absolute top-1/3 left-6 text-[9px] font-mono text-slate-300/80 tracking-widest vertical-rl rotate-180">
            + FACTORY DIRECT • ZERO MINIMUMS +
          </div>
          <div className="hidden xl:block absolute top-1/3 right-6 text-[9px] font-mono text-slate-300/80 tracking-widest vertical-rl">
            + LASER ENGRAVED • UV DTF • BESPOKE +
          </div>
        </div>

        {/* Foreground Content & Bento Showcase */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10 w-full">
          
          {/* Top Hero Header Block */}
          <div className="hero-header-block text-center max-w-3xl mx-auto space-y-4">
            
            {/* Live Studio Status Pill */}
            <div className="hero-badge-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs text-xs font-semibold text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
              <span className="font-bold text-[#0B0F19]">In-House Studio Manufacturing</span>
              <span className="text-slate-300">•</span>
              <span>Ranchi Studio Hub</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#FF4D36] font-bold">24–48h Dispatch</span>
            </div>

            {/* Bold Grand Headline */}
            <h1 className="hero-title-main text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B0F19] tracking-tight leading-[1.08] break-words">
              Bespoke Custom Gifts & Merch.{" "}
              <span className="text-[#FF4D36] block sm:inline">
                Handcrafted With Zero Minimums.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle-text text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Order 1 unique personalized keepsake or 1,000 corporate welcome kits. Direct in-house factory manufacturing, instant digital proofs, and Japanese 1,200 DPI precision.
            </p>

            {/* CTAs Group */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/products"
                className="hero-cta-btn px-6 py-3.5 bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs sm:text-sm font-black rounded-2xl shadow-lg shadow-[#FF4D36]/25 hover:shadow-xl hover:shadow-[#FF4D36]/35 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <span>Explore All {products.length} Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="hero-cta-btn px-5 py-3.5 bg-white/95 hover:bg-white text-[#0B0F19] text-xs sm:text-sm font-bold rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Custom Bulk Inquiry</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="hero-cta-btn px-4 py-3.5 bg-white/95 hover:bg-white text-slate-700 text-xs sm:text-sm font-bold rounded-2xl border border-slate-200/90 shadow-xs hover:border-slate-300 backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <div className="w-5 h-5 rounded-full bg-[#0B0F19] text-white flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                </div>
                <span>Studio Lab Tour</span>
              </button>
            </div>

          </div>

          {/* Panoramic Bento Grid Showcase (3 Real Products Simultaneously) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Bento Card 1: Curated Keepsakes Stage (7 Cols on LG) */}
            <div
              className="hero-bento-card-main lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl p-5 sm:p-6 flex flex-col justify-between text-[#0B0F19] transition-all duration-300 hover:shadow-2xl hover:border-slate-300"
            >
              
              {/* Card Header with Interactive Tab Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FF4D36]/10 text-[#FF4D36] flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-[#FF4D36]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Curated Keepsakes
                    </span>
                    <span className="text-sm font-black text-[#0B0F19]">
                      Anniversary, Couples & Family
                    </span>
                  </div>
                </div>

                {/* Interactive Keepsake Switcher Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto scrollbar-none border border-slate-200/50">
                  {keepsakeItems.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveKeepsakeIndex(idx)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        activeKeepsakeIndex === idx
                          ? "bg-white text-[#0B0F19] shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {item.tabLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport for Active Keepsake */}
              <div
                ref={keepsakePreviewRef}
                className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-slate-100 my-4 border border-slate-200/70 group"
              >
                <Image
                  key={currentKeepsake.id}
                  src={currentKeepsake.image}
                  alt={currentKeepsake.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover group-hover:scale-104 transition-transform duration-700 animate-in fade-in"
                />

                {/* Floating Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-black/80 text-white text-[10px] font-bold backdrop-blur-md shadow-sm">
                    {currentKeepsake.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FF4D36] text-white text-[10px] font-bold shadow-sm">
                    {currentKeepsake.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#0B0F19] shadow-sm border border-slate-200/80">
                  {currentKeepsake.specs}
                </div>
              </div>

              {/* Keepsake Footer & Direct Action */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-[#0B0F19]">
                    {currentKeepsake.title}
                  </h3>
                  <p className="text-xs font-bold text-[#FF4D36] mt-0.5">
                    {currentKeepsake.priceNote}
                  </p>
                </div>

                <Link
                  href={currentKeepsake.href}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs font-bold rounded-xl shadow-md shadow-[#FF4D36]/20 transition-all shrink-0 group/btn"
                >
                  <span>Customize Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>

            {/* Right Column: 2 Secondary Bento Cards (5 Cols on LG) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              
              {/* Bento Card 2: Corporate & VIP Wellness Hamper */}
              <Link
                href="/products/prod-hamper-oneplus-buddha"
                className="hero-bento-card-secondary group relative rounded-3xl overflow-hidden bg-white text-[#0B0F19] p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col justify-between border border-slate-200 hover:border-slate-300"
              >
                {/* Background Image Accent */}
                <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden opacity-30 group-hover:opacity-45 transition-opacity pointer-events-none">
                  <Image
                    src="/images/products/corporate-oneplus-buddha-hamper.jpg"
                    alt="OnePlus Buddha Wellness Hamper"
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="relative z-10 space-y-2 max-w-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF4D36] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    <Briefcase className="w-3 h-3" />
                    <span>VIP Corporate Hamper</span>
                  </div>

                  <h3 className="text-lg font-black text-[#0B0F19] group-hover:text-[#FF4D36] transition-colors leading-tight">
                    OnePlus Buddha Corporate Wellness Hamper
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    500ml vacuum bottle with meditating Buddha idol & tea lights in a designer geometric gift box.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Boxed Gift Set</span>
                    <span className="text-sm font-black text-[#0B0F19]">₹899 <span className="text-xs text-slate-400 font-normal">• Zero MOQ</span></span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4D36] group-hover:translate-x-1 transition-transform">
                    <span>Order Hamper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>

              {/* Bento Card 3: SG 21 Travel Drinkware Gift Set */}
              <Link
                href="/products/prod-kit-vacuum-flask-cups"
                className="hero-bento-card-secondary group relative rounded-3xl overflow-hidden bg-white text-[#0B0F19] p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col justify-between border border-slate-200 hover:border-slate-300"
              >
                {/* Background Image Accent */}
                <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden opacity-30 group-hover:opacity-45 transition-opacity pointer-events-none">
                  <Image
                    src="/images/products/vacuum-flask-cup-gift-set.jpg"
                    alt="SG 21 Vacuum Flask Set"
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="relative z-10 space-y-2 max-w-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider border border-slate-200 shadow-2xs">
                    <Coffee className="w-3 h-3 text-[#FF4D36]" />
                    <span>Travel Drinkware</span>
                  </div>

                  <h3 className="text-lg font-black text-[#0B0F19] group-hover:text-[#FF4D36] transition-colors leading-tight">
                    Executive 3-Piece Thermal Flask & Cups Set
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    500ml double-wall steel vacuum flask with 2 matching insulated steel handle cups.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">12h Hot / 24h Cold</span>
                    <span className="text-sm font-black text-[#0B0F19]">₹499 <span className="text-xs text-slate-400 font-normal">• 6 Colors</span></span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4D36] group-hover:translate-x-1 transition-transform">
                    <span>View Flask Set</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>

            </div>

          </div>

          {/* Bottom Hero Studio Guarantee Bar (4 Cards) */}
          <div className="hero-guarantee-bar pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0B0F19]">Zero Minimum MOQ</div>
                  <div className="text-[11px] text-slate-500 font-medium">Order 1 or 1,000 units</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0B0F19]">Free Digital Proof</div>
                  <div className="text-[11px] text-slate-500 font-medium">Mockup approved before print</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0B0F19]">In-House Studio</div>
                  <div className="text-[11px] text-slate-500 font-medium">Ranchi Studio production</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF4D36]/10 text-[#FF4D36] flex items-center justify-center shrink-0 border border-[#FF4D36]/20">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0B0F19]">24–48h Dispatch</div>
                  <div className="text-[11px] text-slate-500 font-medium">Express padded shipping</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Video Tour Modal (Available when user explicitly clicks "Studio Lab Tour") */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0B0F19] rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#FF4D36]" />
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
                  <div className="text-[#FF4D36] font-bold">UV DTF Printers</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Mimaki Japanese 1200 DPI</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#FF4D36] font-bold">Laser Engravers</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Fiber laser rotary units</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#FF4D36] font-bold">Quality Check</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">100% manual inspection</div>
                </div>
              </div>

              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="mt-2 px-6 py-2.5 bg-[#FF4D36] hover:bg-[#E0351D] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md"
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
