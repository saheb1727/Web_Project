"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  Building2,
  X,
  CheckCircle2,
  Sparkles,
  Heart,
  Briefcase,
  Coffee,
  ShieldCheck,
  Truck,
  MessageCircle,
  Video,
  Camera,
} from "lucide-react";
import { gsap } from "@/lib/gsap";

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
  const [activeMediaTab, setActiveMediaTab] = useState<"photo" | "video">("photo");
  const [isSideVideoPlaying, setIsSideVideoPlaying] = useState(true);
  const [isSideVideoMuted, setIsSideVideoMuted] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const sideVideoRef = useRef<HTMLVideoElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

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

  // Toggle side ambient video play/pause
  const toggleSidePlay = () => {
    if (sideVideoRef.current) {
      if (isSideVideoPlaying) {
        sideVideoRef.current.pause();
        setIsSideVideoPlaying(false);
      } else {
        sideVideoRef.current.play();
        setIsSideVideoPlaying(true);
      }
    }
  };

  // Toggle side ambient video sound
  const toggleSideMute = () => {
    if (sideVideoRef.current) {
      sideVideoRef.current.muted = !isSideVideoMuted;
      setIsSideVideoMuted(!isSideVideoMuted);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".hero-header-block",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, clearProps: "all" }
      )
        .fromTo(
          ".hero-bento-card-main",
          { opacity: 0, scale: 0.98, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, clearProps: "all" },
          "-=0.3"
        )
        .fromTo(
          ".hero-bento-card-secondary",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          ".hero-guarantee-bar",
          { opacity: 0, y: 12 },
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
        className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 pt-8 pb-14 sm:pt-10 sm:pb-16 border-b border-slate-200/80 overflow-hidden"
      >
        {/* Subtle Cool Ambient Glow Orbs */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#FF4D36]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-[#6366F1]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          
          {/* Top Hero Header Block */}
          <div className="hero-header-block text-center max-w-3xl mx-auto space-y-4">
            
            {/* Live Studio Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 text-xs font-semibold text-slate-800 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
              <span className="font-bold text-[#0B0F19]">In-House Studio Manufacturing</span>
              <span className="text-slate-300">•</span>
              <span>Ranchi & Noida</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#FF4D36] font-bold">24–48h Dispatch</span>
            </div>

            {/* Bold Headline with Cool Vibrant Gradient Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B0F19] tracking-tight leading-[1.08] break-words">
              Bespoke Custom Gifts & Merch.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D36] via-[#FF6046] to-[#FF7A59] block sm:inline">
                Made In Our Studio.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Order 1 unique personalized keepsake or 1,000 corporate welcome kits. Direct in-house factory manufacturing, instant digital proofs, and zero minimum order quantity.
            </p>

            {/* CTAs Group */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/products"
                className="px-6 py-3.5 bg-gradient-to-r from-[#FF4D36] to-[#FF6046] hover:from-[#E0351D] hover:to-[#FF4D36] text-white text-xs sm:text-sm font-black rounded-2xl shadow-lg shadow-[#FF4D36]/25 hover:shadow-xl hover:shadow-[#FF4D36]/35 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <span>Explore All 56 Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="px-5 py-3.5 bg-[#0B0F19] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Custom Bulk Inquiry</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="px-4 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold rounded-2xl border border-slate-200/90 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <div className="w-5 h-5 rounded-full bg-[#0B0F19] text-white flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                </div>
                <span>Studio Tour (1 min)</span>
              </button>
            </div>

          </div>

          {/* Panoramic Bento Grid Showcase with LIVE VIDEO IN HERO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Bento Card 1: Keepsake Stage with Photo / Video View Toggle (7 Cols on LG) */}
            <div className="hero-bento-card-main lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-5 sm:p-6 flex flex-col justify-between">
              
              {/* Card Header with Interactive Tab Switcher & Media Mode Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FF4D36]/10 text-[#FF4D36] flex items-center justify-center">
                    <Heart className="w-4 h-4" />
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

                {/* Tab Switcher & Video Switcher */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto scrollbar-none">
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

                  {/* Photo vs Video Mode Switcher */}
                  <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-xl border border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab("photo")}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold ${
                        activeMediaTab === "photo"
                          ? "bg-white text-[#0B0F19] shadow-2xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                      title="Photo View"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMediaTab("video")}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold ${
                        activeMediaTab === "video"
                          ? "bg-[#FF4D36] text-white shadow-2xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                      title="Watch UV Printing Video"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">UV Print</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Viewport for Active Keepsake (Photo OR Live Video) */}
              <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-slate-950 my-4 border border-slate-200/80 group">
                {activeMediaTab === "photo" ? (
                  <>
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
                      <span className="px-2.5 py-1 rounded-lg bg-[#0B0F19]/95 text-white text-[10px] font-bold backdrop-blur-md shadow-sm">
                        {currentKeepsake.tag}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-white/95 text-slate-800 text-[10px] font-bold backdrop-blur-md shadow-sm">
                        {currentKeepsake.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 shadow-sm">
                      {currentKeepsake.specs}
                    </div>
                  </>
                ) : (
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    <video
                      ref={mainVideoRef}
                      src="/videos/reel-1.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover animate-in fade-in"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>1,200 DPI UV DTF Printing In Studio</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Keepsake Footer & Direct Action */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0B0F19] hover:bg-[#FF4D36] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 group/btn"
                >
                  <span>Customize Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>

            {/* Right Column: 2 Secondary Bento Cards with LIVE EMBEDDED VIDEO (5 Cols on LG) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              
              {/* Bento Card 2: LIVE IN-HOUSE STUDIO PRODUCTION VIDEO (Embedded & Autoplaying) */}
              <div className="hero-bento-card-secondary group relative rounded-3xl overflow-hidden bg-black text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col justify-between border border-slate-800 min-h-[260px]">
                
                {/* Embedded Video Element */}
                <video
                  ref={sideVideoRef}
                  src="/videos/reel-2.mp4"
                  autoPlay
                  loop
                  muted={isSideVideoMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity"
                />

                {/* Subtle Gradient Vignette Over Video for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

                {/* Top Video Header & Controls */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/10 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live Studio Video</span>
                  </div>

                  {/* Play/Pause & Sound Toggles */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={toggleSidePlay}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-[#FF4D36] text-white backdrop-blur-md transition-colors cursor-pointer"
                      title={isSideVideoPlaying ? "Pause Video" : "Play Video"}
                    >
                      {isSideVideoPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-white" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={toggleSideMute}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-[#FF4D36] text-white backdrop-blur-md transition-colors cursor-pointer"
                      title={isSideVideoMuted ? "Unmute Sound" : "Mute Sound"}
                    >
                      {isSideVideoMuted ? (
                        <VolumeX className="w-3.5 h-3.5" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Bottom Video Meta & Action */}
                <div className="relative z-10 p-5 space-y-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                      Laser Engraving & UV DTF
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                      Craftsmanship In Motion
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      Watch how personalized gifts and executive merch are produced inside our Ranchi studio.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/15">
                    <span className="text-xs text-slate-300 font-medium">In-House Manufacturing</span>
                    <button
                      type="button"
                      onClick={() => setIsVideoModalOpen(true)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4D36] hover:text-white transition-colors cursor-pointer"
                    >
                      <span>Full Studio Tour</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Bento Card 3: SG 21 Travel Flask & Hamper Duo (Obsidian Theme) */}
              <Link
                href="/products/prod-kit-vacuum-flask-cups"
                className="hero-bento-card-secondary group relative rounded-3xl overflow-hidden bg-[#0B0F19] text-white p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col justify-between border border-slate-800"
              >
                {/* Background Image Accent */}
                <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden opacity-35 group-hover:opacity-45 transition-opacity pointer-events-none">
                  <Image
                    src="/images/products/vacuum-flask-cup-gift-set.jpg"
                    alt="SG 21 Vacuum Flask Set"
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/80 to-transparent" />
                </div>

                <div className="relative z-10 space-y-2 max-w-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF4D36] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    <Coffee className="w-3 h-3" />
                    <span>Executive Drinkware</span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-[#FF4D36] transition-colors leading-tight">
                    Executive 3-Piece Thermal Flask & Cups Set
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    500ml double-wall steel vacuum flask with 2 matching insulated steel handle cups.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">12h Hot / 24h Cold</span>
                    <span className="text-sm font-black text-white">₹499 <span className="text-xs text-slate-400 font-normal">• 6 Colors</span></span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4D36] group-hover:translate-x-1 transition-transform">
                    <span>View Flask Set</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>

            </div>

          </div>

          {/* Bottom Hero Studio Guarantee Bar (4 Clean Pillars with Modern Colors) */}
          <div className="hero-guarantee-bar pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3 hover:border-slate-300 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0B0F19]">Zero Minimum MOQ</div>
                  <div className="text-[11px] text-slate-500 font-medium">Order 1 or 1,000 units</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3 hover:border-slate-300 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0B0F19]">Free Digital Proof</div>
                  <div className="text-[11px] text-slate-500 font-medium">Mockup approved before print</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3 hover:border-slate-300 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#6366F1] flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[#0B0F19]">In-House Studio</div>
                  <div className="text-[11px] text-slate-500 font-medium">Ranchi & Noida production</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3 hover:border-slate-300 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#FF4D36] flex items-center justify-center shrink-0">
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

      {/* Video Tour Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
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
                className="mt-2 px-6 py-2.5 bg-gradient-to-r from-[#FF4D36] to-[#FF6046] text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-md"
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
