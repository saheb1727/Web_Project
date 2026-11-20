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
  Truck,
  MessageCircle,
  Video,
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardStageRef = useRef<HTMLDivElement>(null);
  const keepsakePreviewRef = useRef<HTMLDivElement>(null);

  const availableReels = [
    { src: "/videos/reel-2.mp4", label: "Laser & Magnetic Studio" },
    { src: "/videos/reel-1.mp4", label: "1200 DPI UV Printing" },
    { src: "/videos/reel-5.mp4", label: "Laser Rotary Engraving" },
  ];

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

  // Toggle video playback
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Toggle video audio
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // 3D Perspective Tilt on Mouse Movement
  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardStageRef.current) return;
    const rect = cardStageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardStageRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 900,
      ease: "power1.out",
      duration: 0.4,
    });
  };

  const handleStageMouseLeave = () => {
    if (!cardStageRef.current) return;
    gsap.to(cardStageRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: "power2.out",
      duration: 0.6,
    });
  };

  // Animate preview on keepsake change
  useEffect(() => {
    if (keepsakePreviewRef.current) {
      gsap.fromTo(
        keepsakePreviewRef.current,
        { opacity: 0.35, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out", clearProps: "all" }
      );
    }
  }, [activeKeepsakeIndex]);

  // Master Hero GSAP Animations (Cinematic Timeline + Continuous Physics)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered Entrance
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
          { opacity: 0, scale: 0.96, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "all" },
          "-=0.3"
        )
        .fromTo(
          ".hero-bento-card-secondary",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          ".hero-guarantee-bar",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, clearProps: "all" },
          "-=0.2"
        );

      // Continuous Idle Floating Physics (Micro-levitation)
      gsap.to(".hero-bento-card-main", {
        y: -6,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(".hero-bento-card-secondary", {
        y: -4,
        duration: 4,
        stagger: 0.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Ambient Orbs Breathing
      gsap.to(".hero-ambient-orb-1", {
        scale: 1.25,
        opacity: 0.25,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(".hero-ambient-orb-2", {
        scale: 1.3,
        opacity: 0.22,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-black text-white pt-10 pb-14 sm:pt-14 sm:pb-16 border-b border-white/10"
      >
        {/* =========================================================================
            1. FULL COVER BACKGROUND VIDEO
            ========================================================================= */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
          <video
            ref={videoRef}
            key={availableReels[activeReelIndex].src}
            src={availableReels[activeReelIndex].src}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover scale-102 transition-opacity duration-700"
          />

          {/* Cinematic Dark Vignette & Scrim for Pristine Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/95 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/85 z-10" />
        </div>

        {/* Ambient Subtle Glow Orbs */}
        <div className="hero-ambient-orb-1 absolute -top-32 -right-32 w-96 h-96 bg-[#FF4D36]/15 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="hero-ambient-orb-2 absolute top-1/2 -left-32 w-96 h-96 bg-[#6366F1]/15 rounded-full blur-3xl pointer-events-none z-10" />

        {/* =========================================================================
            2. FOREGROUND CONTENT & BENTO SHOWCASE (z-20)
            ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-20 w-full my-auto">
          
          {/* Top Hero Header Block */}
          <div className="hero-header-block text-center max-w-3xl mx-auto space-y-4">
            
            {/* Live Studio Status Pill */}
            <div className="hero-badge-pill inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ring-4 ring-emerald-400/30" />
              <span className="font-bold text-white">In-House Studio Manufacturing</span>
              <span className="text-white/40">•</span>
              <span>Ranchi Studio Hub</span>
              <span className="text-white/40">•</span>
              <span className="text-[#FF4D36] font-bold">24–48h Dispatch</span>
            </div>

            {/* Bold Grand Headline with Glowing Gradient */}
            <h1 className="hero-title-main text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] break-words drop-shadow-md">
              Bespoke Custom Gifts & Merch.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D36] via-[#FF6E52] to-[#FFA07A] block sm:inline">
                Handcrafted With Zero Minimums.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle-text text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
              Order 1 unique personalized keepsake or 1,000 corporate welcome kits. Direct in-house factory manufacturing, instant digital proofs, and Japanese 1,200 DPI precision.
            </p>

            {/* CTAs & Video Controls Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/products"
                className="hero-cta-btn px-6 py-3.5 bg-gradient-to-r from-[#FF4D36] to-[#FF6B4A] hover:from-[#E0351D] hover:to-[#FF4D36] text-white text-xs sm:text-sm font-black rounded-2xl shadow-xl shadow-[#FF4D36]/30 hover:shadow-2xl hover:shadow-[#FF4D36]/40 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <span>Explore All 56 Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="hero-cta-btn px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-2xl border border-white/20 backdrop-blur-md shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Custom Bulk Inquiry</span>
              </Link>

              {/* Cover Video Controls (Audio Toggle & Play/Pause) */}
              <div className="hero-video-controls flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  title={isPlaying ? "Pause Background Video" : "Play Background Video"}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white" />
                  )}
                  <span className="hidden sm:inline text-[11px]">{isPlaying ? "Pause" : "Play"}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2 rounded-xl hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  title={isMuted ? "Unmute Background Sound" : "Mute Background Sound"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-slate-300" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span className="hidden sm:inline text-[11px]">{isMuted ? "Sound Off" : "Sound On"}</span>
                </button>

                {/* Video Scene Switcher */}
                <div className="hidden md:flex items-center gap-1 border-l border-white/15 pl-1.5">
                  {availableReels.map((reel, idx) => (
                    <button
                      key={reel.src}
                      type="button"
                      onClick={() => setActiveReelIndex(idx)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        activeReelIndex === idx
                          ? "bg-[#FF4D36] text-white shadow-xs"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                      title={reel.label}
                    >
                      Scene {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Panoramic Glassmorphism Bento Grid Showcase Floating Over Video */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Bento Card 1: Curated Keepsakes Stage (7 Cols on LG) with 3D Tilt */}
            <div
              ref={cardStageRef}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              className="hero-bento-card-main lg:col-span-7 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-5 sm:p-6 flex flex-col justify-between text-white transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(255,77,54,0.15)]"
            >
              
              {/* Card Header with Interactive Tab Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FF4D36]/20 text-[#FF4D36] flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-[#FF4D36]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 block">
                      Curated Keepsakes
                    </span>
                    <span className="text-sm font-black text-white">
                      Anniversary, Couples & Family
                    </span>
                  </div>
                </div>

                {/* Interactive Keepsake Switcher Tabs */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl overflow-x-auto scrollbar-none border border-white/10">
                  {keepsakeItems.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveKeepsakeIndex(idx)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        activeKeepsakeIndex === idx
                          ? "bg-[#FF4D36] text-white shadow-xs"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
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
                className="relative aspect-16/10 w-full rounded-2xl overflow-hidden bg-black/50 my-4 border border-white/15 group"
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
                  <span className="px-2.5 py-1 rounded-lg bg-black/80 text-white text-[10px] font-bold backdrop-blur-md shadow-sm border border-white/10">
                    {currentKeepsake.tag}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FF4D36] text-white text-[10px] font-bold shadow-sm">
                    {currentKeepsake.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm border border-white/10">
                  {currentKeepsake.specs}
                </div>
              </div>

              {/* Keepsake Footer & Direct Action */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/15">
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {currentKeepsake.title}
                  </h3>
                  <p className="text-xs font-bold text-[#FF4D36] mt-0.5">
                    {currentKeepsake.priceNote}
                  </p>
                </div>

                <Link
                  href={currentKeepsake.href}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF4D36] hover:bg-[#E0351D] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF4D36]/25 transition-all shrink-0 group/btn"
                >
                  <span>Customize Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>

            {/* Right Column: 2 Secondary Bento Cards (5 Cols on LG) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              
              {/* Bento Card 2: Corporate & VIP Wellness Hamper (Frosted Dark Glass) */}
              <Link
                href="/products/prod-hamper-oneplus-buddha"
                className="hero-bento-card-secondary group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl text-white p-5 sm:p-6 shadow-2xl hover:bg-white/15 transition-all duration-300 flex-1 flex flex-col justify-between border border-white/20"
              >
                {/* Background Image Accent */}
                <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden opacity-40 group-hover:opacity-55 transition-opacity pointer-events-none">
                  <Image
                    src="/images/products/corporate-oneplus-buddha-hamper.jpg"
                    alt="OnePlus Buddha Wellness Hamper"
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                </div>

                <div className="relative z-10 space-y-2 max-w-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF4D36] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    <Briefcase className="w-3 h-3" />
                    <span>VIP Corporate Hamper</span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-[#FF4D36] transition-colors leading-tight">
                    OnePlus Buddha Corporate Wellness Hamper
                  </h3>

                  <p className="text-xs text-slate-200 leading-relaxed line-clamp-2">
                    500ml vacuum bottle with meditating Buddha idol & tea lights in a designer geometric gift box.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-300 block font-medium">Boxed Gift Set</span>
                    <span className="text-sm font-black text-white">₹899 <span className="text-xs text-slate-300 font-normal">• Zero MOQ</span></span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4D36] group-hover:translate-x-1 transition-transform">
                    <span>Order Hamper</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>

              {/* Bento Card 3: SG 21 Travel Drinkware Gift Set (Frosted Glass) */}
              <Link
                href="/products/prod-kit-vacuum-flask-cups"
                className="hero-bento-card-secondary group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl text-white p-5 sm:p-6 shadow-2xl hover:bg-white/15 transition-all duration-300 flex-1 flex flex-col justify-between border border-white/20"
              >
                {/* Background Image Accent */}
                <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden opacity-40 group-hover:opacity-55 transition-opacity pointer-events-none">
                  <Image
                    src="/images/products/vacuum-flask-cup-gift-set.jpg"
                    alt="SG 21 Vacuum Flask Set"
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                </div>

                <div className="relative z-10 space-y-2 max-w-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider border border-white/20 shadow-2xs">
                    <Coffee className="w-3 h-3 text-[#FF4D36]" />
                    <span>Travel Drinkware</span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-[#FF4D36] transition-colors leading-tight">
                    Executive 3-Piece Thermal Flask & Cups Set
                  </h3>

                  <p className="text-xs text-slate-200 leading-relaxed line-clamp-2">
                    500ml double-wall steel vacuum flask with 2 matching insulated steel handle cups.
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-300 block font-medium">12h Hot / 24h Cold</span>
                    <span className="text-sm font-black text-white">₹499 <span className="text-xs text-slate-300 font-normal">• 6 Colors</span></span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4D36] group-hover:translate-x-1 transition-transform">
                    <span>View Flask Set</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>

            </div>

          </div>

          {/* Bottom Hero Studio Guarantee Bar (4 Frosted Glass Pillars) */}
          <div className="hero-guarantee-bar pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">Zero Minimum MOQ</div>
                  <div className="text-[11px] text-slate-300 font-medium">Order 1 or 1,000 units</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">Free Digital Proof</div>
                  <div className="text-[11px] text-slate-300 font-medium">Mockup approved before print</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 border border-indigo-500/30">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">In-House Studio</div>
                  <div className="text-[11px] text-slate-300 font-medium">Ranchi Studio production</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF4D36]/20 text-[#FF4D36] flex items-center justify-center shrink-0 border border-[#FF4D36]/30">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">24–48h Dispatch</div>
                  <div className="text-[11px] text-slate-300 font-medium">Express padded shipping</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Video Tour Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
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
                className="mt-2 px-6 py-2.5 bg-gradient-to-r from-[#FF4D36] to-[#FF6B4A] text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-md"
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
