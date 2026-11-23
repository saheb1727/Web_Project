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
  Compass,
  Layers,
  Moon,
  ChevronLeft,
  ChevronRight,
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

interface BackgroundSlide {
  id: string;
  title: string;
  category: string;
  image: string;
  tag: string;
  href: string;
}

type HeroBgTheme = "blueprint" | "topo" | "obsidian";

export const HeroSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [bgTheme, setBgTheme] = useState<HeroBgTheme>("obsidian");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const keepsakeSlideRef = useRef<HTMLDivElement>(null);
  const prevKeepsakeIndexRef = useRef<number>(0);
  const slideDirectionRef = useRef<number>(1);

  // Curated flagship products for the background carousel
  const backgroundSlides: BackgroundSlide[] = [
    {
      id: "hamper",
      title: "OnePlus Buddha Corporate Wellness Hamper",
      category: "VIP Corporate Kit",
      image: "/images/products/corporate-oneplus-buddha-hamper.jpg",
      tag: "Trending Gift",
      href: "/products/prod-hamper-oneplus-buddha",
    },
    {
      id: "frame",
      title: "Anniversary & Memory Calendar Frame",
      category: "Photo Keepsakes",
      image: "/images/products/anniversary-calendar-frame.jpg",
      tag: "Customer Favorite",
      href: "/products/prod-frame-1",
    },
    {
      id: "lamp",
      title: "Laser Engraved 3D LED Acrylic Heart Lamp",
      category: "Ambient LED Lights",
      image: "/images/products/led-acrylic-heart-lamp.jpg",
      tag: "Romantic Keepsake",
      href: "/products/prod-lamp-1",
    },
    {
      id: "leather",
      title: "Executive 4-in-1 Personalized Leather Gift Set",
      category: "Personalized Leather",
      image: "/images/products/executive-leather-gift-set.jpg",
      tag: "Executive Hamper",
      href: "/products/prod-leather-1",
    },
    {
      id: "flask",
      title: "Executive Thermal Vacuum Flask & Cups Set",
      category: "Custom Drinkware",
      image: "/images/products/vacuum-flask-cup-gift-set.jpg",
      tag: "Best Seller",
      href: "/products/prod-kit-vacuum-flask-cups",
    },
    {
      id: "diary",
      title: "Vintage PU Leather Diary - Model H1047",
      category: "Corporate Notebooks",
      image: "/images/products/notebook-diary-h1047-main.jpg",
      tag: "New Launch",
      href: "/products/prod-corp-diary-clasp-h1047",
    },
  ];

  // Auto-advance background carousel every 5 seconds
  useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % backgroundSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isCarouselPaused, backgroundSlides.length]);

  // Restore user-selected background preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("myprinthub_hero_bg") as HeroBgTheme;
      if (saved && ["blueprint", "topo", "obsidian"].includes(saved)) {
        setBgTheme(saved);
      }
    } catch {
      // Ignore in private browsing
    }
  }, []);

  const handleThemeChange = (t: HeroBgTheme) => {
    setBgTheme(t);
    try {
      localStorage.setItem("myprinthub_hero_bg", t);
    } catch {
      // Ignore
    }
  };

  const isDark = bgTheme === "obsidian";

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

  const handleSelectKeepsake = (idx: number) => {
    slideDirectionRef.current = idx >= activeKeepsakeIndex ? 1 : -1;
    setActiveKeepsakeIndex(idx);
  };

  const goToNextKeepsake = () => {
    slideDirectionRef.current = 1;
    setActiveKeepsakeIndex((prev) => (prev + 1) % keepsakeItems.length);
  };

  const goToPrevKeepsake = () => {
    slideDirectionRef.current = -1;
    setActiveKeepsakeIndex((prev) => (prev === 0 ? keepsakeItems.length - 1 : prev - 1));
  };

  // GSAP Left/Right horizontal animation when keepsake changes
  useEffect(() => {
    if (!keepsakeSlideRef.current) return;
    const direction = slideDirectionRef.current;

    gsap.fromTo(
      keepsakeSlideRef.current,
      { opacity: 0, x: direction * 45 },
      { opacity: 1, x: 0, duration: 0.45, ease: "power2.out", clearProps: "all" }
    );
  }, [activeKeepsakeIndex]);

  // Master Hero GSAP Animations (Clean Staggered Entrance with Left/Right Card Animations)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

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
          ".hero-carousel-nav",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, clearProps: "all" },
          "-=0.2"
        )
        .fromTo(
          ".hero-bento-card-main",
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", clearProps: "all" },
          "-=0.3"
        )
        .fromTo(
          ".hero-bento-card-secondary",
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power3.out", clearProps: "all" },
          "-=0.5"
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
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
        className={`relative pt-6 pb-14 sm:pt-10 sm:pb-16 border-b transition-colors duration-500 overflow-hidden ${isDark
          ? "bg-[#0B0F19] text-white border-slate-800"
          : bgTheme === "topo"
            ? "bg-[#FAF8F5] text-[#0B0F19] border-amber-200/60"
            : "bg-[#F8FAFC] text-[#0B0F19] border-slate-200/90"
          }`}
      >
        {/* ========================================================== */}
        {/* BACKGROUND LAYER 1: DYNAMIC PRODUCT PHOTO CAROUSEL        */}
        {/* ========================================================== */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          {backgroundSlides.map((slide, idx) => {
            const isActive = activeSlideIndex === idx;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
                  }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className={`object-cover object-center transition-transform duration-7000 ease-out ${isActive ? "scale-105" : "scale-100"
                    }`}
                />
              </div>
            );
          })}

          {/* High-Legibility Frosted Overlay Layer */}
          <div
            className={`absolute inset-0 z-2 transition-colors duration-500 backdrop-blur-[4px] ${isDark ? "bg-[#0B0F19]/85" : "bg-white/85"
              }`}
            style={{
              background: isDark
                ? "radial-gradient(ellipse 95% 75% at 50% 25%, rgba(11, 15, 25, 0.82) 0%, rgba(11, 15, 25, 0.94) 85%)"
                : "radial-gradient(ellipse 95% 75% at 50% 25%, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.92) 85%)",
            }}
          />

          {/* Ethereal Coral & Amber Spotlight Aura */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full blur-[110px] pointer-events-none z-3"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(255, 77, 54, 0.16) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 75%)"
                : "radial-gradient(circle, rgba(255, 77, 54, 0.10) 0%, rgba(251, 146, 60, 0.05) 45%, transparent 75%)",
            }}
          />
        </div>

        {/* ========================================================== */}
        {/* BACKGROUND LAYER 2: THEMED ARCHITECTURAL ACCENTS           */}
        {/* ========================================================== */}
        {bgTheme === "blueprint" && (
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-3 animate-in fade-in duration-500">
            {/* Metric Calibration Ruler Strip at Top */}
            <div className="hidden md:flex items-center justify-between px-6 py-1 border-b border-slate-200/80 text-[9px] font-mono font-bold text-slate-400 select-none bg-white/40 backdrop-blur-xs">
              <span>0mm</span>
              <span>• • • 50mm</span>
              <span>• • • 100mm</span>
              <span>• • • 150mm</span>
              <span>• • • 200mm</span>
              <span>• • • 250mm</span>
              <span>• • • 300mm</span>
              <span>• • • 350mm</span>
              <span>• • • 400mm</span>
              <span>450mm</span>
            </div>

            {/* Architectural 40px Engineering Grid */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(15, 23, 42, 0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(15, 23, 42, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                maskImage: "radial-gradient(ellipse 90% 70% at 50% 25%, black 45%, transparent 88%)",
                WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 25%, black 45%, transparent 88%)",
              }}
            />

            {/* Left Circular Laser Reticle Target */}
            <svg
              className="hidden lg:block absolute -top-8 -left-12 w-96 h-96 text-slate-300/70"
              viewBox="0 0 200 200"
            >
              <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="100" cy="100" r="4" fill="#FF4D36" opacity="0.6" />
              <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
              <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
            </svg>

            {/* Right Circular Laser Reticle Target */}
            <svg
              className="hidden lg:block absolute top-1/4 -right-12 w-80 h-80 text-slate-300/60"
              viewBox="0 0 200 200"
            >
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="8 4" />
              <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
            </svg>

            {/* Precision Workshop Technical Registration */}
            <div className="hidden sm:flex absolute top-10 left-6 lg:left-12 items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-slate-400">
              <span className="text-[#FF4D36] font-black text-xs">+</span>
              <span>SPEC: 1,200 DPI JAPANESE MIMAKI</span>
            </div>
            <div className="hidden sm:flex absolute top-10 right-6 lg:right-12 items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-slate-400">
              <span>RANCHI STUDIO LAB // 24-48H</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        )}

        {bgTheme === "topo" && (
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-3 animate-in fade-in duration-500">
            <svg
              className="absolute inset-0 w-full h-full opacity-25 text-slate-500"
              preserveAspectRatio="none"
              viewBox="0 0 1440 800"
            >
              <path d="M0,140 C320,280, 420,80, 720,180 C1020,280, 1120,100, 1440,220 L1440,800 L0,800 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M0,200 C340,340, 440,140, 740,240 C1040,340, 1140,160, 1440,280 L1440,800 L0,800 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
              <path d="M0,270 C360,400, 460,200, 760,300 C1060,400, 1160,220, 1440,340 L1440,800 L0,800 Z" fill="none" stroke="#FF4D36" strokeWidth="1.2" opacity="0.4" />
            </svg>
            <div className="hidden sm:flex absolute top-8 left-8 items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-amber-700/60">
              <span>┌ ── HANDCRAFTED BESPOKE ATELIER ── ┐</span>
            </div>
            <div className="hidden sm:flex absolute top-8 right-8 items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-amber-700/60">
              <span>┌ ── ZERO MINIMUMS GUARANTEE ── ┐</span>
            </div>
          </div>
        )}

        {bgTheme === "obsidian" && (
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-3 animate-in fade-in duration-500">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF4D36]/70 to-transparent" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 77, 54, 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 77, 54, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                maskImage: "radial-gradient(ellipse 85% 65% at 50% 25%, black 40%, transparent 90%)",
                WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 50% 25%, black 40%, transparent 90%)",
              }}
            />
            <div className="hidden sm:flex absolute top-8 left-8 items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-slate-500">
              <span className="text-[#FF4D36] font-black text-xs">●</span>
              <span>OBSIDIAN_KEYNOTE_STAGE // 1200_DPI</span>
            </div>
          </div>
        )}

        {/* Foreground Content & Bento Showcase */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10 w-full">

          {/* Top Hero Header Block */}
          <div className="hero-header-block text-center max-w-3xl mx-auto space-y-3.5">

            {/* Live Studio Status Eyebrow */}
            <div className="hero-badge-pill flex items-center justify-center gap-2 text-xs font-bold text-[#FF4D36] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#FF4D36]" />
              <span>In-House Studio Manufacturing • Ranchi Studio Hub • 24–48h Dispatch</span>
            </div>

            {/* Bold Grand Headline */}
            <h1
              className={`hero-title-main text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] break-words transition-colors ${isDark ? "text-white" : "text-[#0B0F19]"
                }`}
            >
              Bespoke Custom Gifts & Merch.{" "}
              <span className="text-[#FF4D36] block sm:inline">
                Handcrafted With Zero Minimums.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`hero-subtitle-text text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto transition-colors ${isDark ? "text-slate-300" : "text-slate-600"
                }`}
            >
              Order 1 unique personalized keepsake or 1,000 corporate welcome kits. Direct in-house factory manufacturing, instant digital proofs, and Japanese 1,200 DPI precision.
            </p>

            {/* CTAs Group */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Link
                href="/products"
                className="hero-cta-btn px-6 py-3.5 bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs sm:text-sm font-black rounded-2xl shadow-lg shadow-[#FF4D36]/25 hover:shadow-xl hover:shadow-[#FF4D36]/35 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <span>Explore All {products.length} Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className={`hero-cta-btn px-5 py-3.5 text-xs sm:text-sm font-bold rounded-2xl border shadow-xs backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${isDark
                  ? "bg-slate-900/90 hover:bg-slate-800 text-white border-slate-700 hover:border-slate-600"
                  : "bg-white/95 hover:bg-white text-[#0B0F19] border-slate-200/90 hover:border-slate-300"
                  }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>Custom Bulk Inquiry</span>
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className={`hero-cta-btn px-4 py-3.5 text-xs sm:text-sm font-bold rounded-2xl border shadow-xs backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${isDark
                  ? "bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-600"
                  : "bg-white/95 hover:bg-white text-slate-700 border-slate-200/90 hover:border-slate-300"
                  }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#0B0F19] text-white flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                </div>
                <span>Studio Lab Tour</span>
              </button>
            </div>

            {/* Studio Background Carousel Controls & Navigation Pill */}
            <div className="hero-carousel-nav flex flex-wrap items-center justify-center gap-2 pt-2">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs shadow-xs backdrop-blur-md transition-all ${isDark
                  ? "bg-slate-900/90 border-slate-700/80 text-slate-300"
                  : "bg-white/95 border-slate-200/90 text-slate-700"
                  }`}
              >
                {/* Prev Button */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlideIndex((prev) => (prev - 1 + backgroundSlides.length) % backgroundSlides.length)
                  }
                  className="hover:text-[#FF4D36] transition-colors cursor-pointer p-0.5"
                  aria-label="Previous Slide"
                  title="Previous Keepsake"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Slide Indicators */}
                <div className="flex items-center gap-1.5 px-1">
                  {backgroundSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlideIndex === idx
                        ? "w-6 bg-[#FF4D36]"
                        : isDark
                          ? "w-2 bg-slate-700 hover:bg-slate-500"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                      aria-label={`Slide ${idx + 1}`}
                      title={slide.title}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => setActiveSlideIndex((prev) => (prev + 1) % backgroundSlides.length)}
                  className="hover:text-[#FF4D36] transition-colors cursor-pointer p-0.5"
                  aria-label="Next Slide"
                  title="Next Keepsake"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-slate-300 dark:text-slate-700">|</span>

                {/* Active Slide Product Link */}
                <Link
                  href={backgroundSlides[activeSlideIndex].href}
                  className="text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:text-[#FF4D36] transition-colors flex items-center gap-1 max-w-[190px] sm:max-w-[260px] truncate"
                >
                  <Sparkles className="w-3 h-3 text-[#FF4D36] shrink-0" />
                  <span className="truncate">{backgroundSlides[activeSlideIndex].title}</span>
                </Link>
              </div>

              {/* Theme Toggle Pill */}
              <div
                className={`inline-flex items-center gap-1 p-1 rounded-full border text-xs transition-all backdrop-blur-md shadow-xs ${isDark
                  ? "bg-slate-900/90 border-slate-800 text-slate-300"
                  : "bg-white/95 border-slate-200/90 text-slate-600"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => handleThemeChange("blueprint")}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${bgTheme === "blueprint"
                    ? "bg-[#FF4D36] text-white shadow-xs"
                    : isDark
                      ? "hover:text-white"
                      : "hover:text-slate-900"
                    }`}
                  title="Blueprint Grid Mode"
                >
                  <Compass className="w-3 h-3" />
                  <span>Blueprint</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange("topo")}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${bgTheme === "topo"
                    ? "bg-[#FF4D36] text-white shadow-xs"
                    : isDark
                      ? "hover:text-white"
                      : "hover:text-slate-900"
                    }`}
                  title="Topographic Waves Mode"
                >
                  <Layers className="w-3 h-3" />
                  <span>Topo</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange("obsidian")}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${bgTheme === "obsidian"
                    ? "bg-[#FF4D36] text-white shadow-xs"
                    : isDark
                      ? "hover:text-white"
                      : "hover:text-slate-900"
                    }`}
                  title="Obsidian Dark Keynote Mode"
                >
                  <Moon className="w-3 h-3" />
                  <span>Dark</span>
                </button>
              </div>
            </div>

          </div>

          {/* Panoramic Bento Grid Showcase (3 Real Products Simultaneously) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Bento Card 1: Curated Keepsakes Stage (7 Cols on LG - Single Unified Card, Zero Nested Boxes) */}
            <div
              className={`hero-bento-card-main lg:col-span-7 rounded-3xl border shadow-xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl ${isDark
                ? "bg-[#111726]/95 border-slate-800 text-white hover:border-slate-700"
                : "bg-white border-slate-200 text-[#0B0F19] hover:border-slate-300"
                }`}
            >
              {/* Card Header with Interactive Tab Switcher & Left-Right Arrow Controls */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${isDark ? "border-slate-800" : "border-slate-100"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FF4D36]/10 text-[#FF4D36] flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 fill-[#FF4D36]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Curated Keepsakes
                    </span>
                    <span className={`text-sm font-black ${isDark ? "text-white" : "text-[#0B0F19]"}`}>
                      Anniversary, Couples & Family
                    </span>
                  </div>
                </div>

                {/* Switcher & Left/Right Arrow Navigation */}
                <div className="flex items-center gap-2">
                  {/* Tab Switcher */}
                  <div
                    className={`flex items-center gap-1 p-1 rounded-xl overflow-x-auto scrollbar-none border ${isDark ? "bg-slate-800/80 border-slate-700" : "bg-slate-100 border-slate-200/50"
                      }`}
                  >
                    {keepsakeItems.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectKeepsake(idx)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeKeepsakeIndex === idx
                          ? isDark
                            ? "bg-slate-700 text-white shadow-xs"
                            : "bg-white text-[#0B0F19] shadow-xs"
                          : isDark
                            ? "text-slate-400 hover:text-white"
                            : "text-slate-600 hover:text-slate-900"
                          }`}
                      >
                        {item.tabLabel}
                      </button>
                    ))}
                  </div>

                  {/* Left / Right Arrows */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={goToPrevKeepsake}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${isDark
                        ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700"
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                        }`}
                      aria-label="Previous keepsake"
                      title="Previous keepsake (Left)"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNextKeepsake}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${isDark
                        ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700"
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                        }`}
                      aria-label="Next keepsake"
                      title="Next keepsake (Right)"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Un-Nested Interactive Showcase Stage with GSAP Left/Right Slide */}
              <div
                ref={keepsakeSlideRef}
                className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center my-4 flex-1"
              >
                {/* Left Column: Product Information & Direct CTA */}
                <div className="md:col-span-6 flex flex-col justify-between h-full space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF4D36]/15 text-[#FF4D36] text-[10px] font-black uppercase tracking-wider">
                        {currentKeepsake.tag}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${isDark
                          ? "bg-slate-800 text-slate-300 border-slate-700"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                      >
                        {currentKeepsake.specs}
                      </span>
                    </div>

                    <h3 className={`text-xl sm:text-2xl font-black tracking-tight leading-tight ${isDark ? "text-white" : "text-[#0B0F19]"
                      }`}>
                      {currentKeepsake.title}
                    </h3>

                    <p className={`text-xs leading-relaxed line-clamp-3 ${isDark ? "text-slate-400" : "text-slate-500"
                      }`}>
                      {currentKeepsake.subtitle}
                    </p>
                  </div>

                  <div
                    className={`pt-3 border-t flex items-center justify-between gap-3 ${isDark ? "border-slate-800" : "border-slate-100"
                      }`}
                  >
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
                        Direct In-House Pricing
                      </span>
                      <span className="text-xs sm:text-sm font-black text-[#FF4D36]">
                        {currentKeepsake.priceNote}
                      </span>
                    </div>

                    <Link
                      href={currentKeepsake.href}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs font-bold rounded-xl shadow-md shadow-[#FF4D36]/20 transition-all shrink-0 group/btn cursor-pointer"
                    >
                      <span>Customize</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Seamless Product Photo Visual (No Nested Card Border) */}
                <div className="md:col-span-6 relative aspect-4/3 w-full rounded-2xl overflow-hidden group shadow-md">
                  <Image
                    key={currentKeepsake.id}
                    src={currentKeepsake.image}
                    alt={currentKeepsake.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover group-hover:scale-104 transition-transform duration-700"
                  />

                  {/* High-Contrast Floating Badge */}
                  <div className="absolute top-2.5 right-2.5 z-10 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[10px] font-bold shadow-sm border border-white/10">
                    {currentKeepsake.badge}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Indicator Strip */}
              <div
                className={`pt-2.5 border-t flex items-center justify-between text-[11px] text-slate-400 font-medium ${isDark ? "border-slate-800" : "border-slate-100"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D36] animate-pulse" />
                  <span>Interactive Live Studio Preview</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold">
                  <span>{String(activeKeepsakeIndex + 1).padStart(2, "0")}</span>
                  <span className="text-slate-500">/</span>
                  <span className="text-slate-500">{String(keepsakeItems.length).padStart(2, "0")}</span>
                </div>
              </div>

            </div>

            {/* Right Column: 2 Secondary Bento Cards (5 Cols on LG) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">

              {/* Bento Card 2: Corporate & VIP Wellness Hamper */}
              <Link
                href="/products/prod-hamper-oneplus-buddha"
                className={`hero-bento-card-secondary group relative rounded-3xl overflow-hidden p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col justify-between border ${isDark
                  ? "bg-[#111726]/95 border-slate-800 text-white hover:border-slate-700"
                  : "bg-white border-slate-200 text-[#0B0F19] hover:border-slate-300"
                  }`}
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

                  <h3 className={`text-lg font-black group-hover:text-[#FF4D36] transition-colors leading-tight ${isDark ? "text-white" : "text-[#0B0F19]"
                    }`}>
                    OnePlus Buddha Corporate Wellness Hamper
                  </h3>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    500ml vacuum bottle with meditating Buddha idol & tea lights in a designer geometric gift box.
                  </p>
                </div>

                <div
                  className={`relative z-10 pt-4 border-t flex items-center justify-between ${isDark ? "border-slate-800" : "border-slate-100"
                    }`}
                >
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Boxed Gift Set</span>
                    <span className={`text-sm font-black ${isDark ? "text-white" : "text-[#0B0F19]"}`}>
                      ₹899 <span className="text-xs text-slate-400 font-normal">• Zero MOQ</span>
                    </span>
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
                className={`hero-bento-card-secondary group relative rounded-3xl overflow-hidden p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col justify-between border ${isDark
                  ? "bg-[#111726]/95 border-slate-800 text-white hover:border-slate-700"
                  : "bg-white border-slate-200 text-[#0B0F19] hover:border-slate-300"
                  }`}
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
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-2xs ${isDark
                      ? "bg-slate-800 text-slate-300 border-slate-700"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                  >
                    <Coffee className="w-3 h-3 text-[#FF4D36]" />
                    <span>Travel Drinkware</span>
                  </div>

                  <h3 className={`text-lg font-black group-hover:text-[#FF4D36] transition-colors leading-tight ${isDark ? "text-white" : "text-[#0B0F19]"
                    }`}>
                    Executive 3-Piece Thermal Flask & Cups Set
                  </h3>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    500ml double-wall steel vacuum flask with 2 matching insulated steel handle cups.
                  </p>
                </div>

                <div
                  className={`relative z-10 pt-4 border-t flex items-center justify-between ${isDark ? "border-slate-800" : "border-slate-100"
                    }`}
                >
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">12h Hot / 24h Cold</span>
                    <span className={`text-sm font-black ${isDark ? "text-white" : "text-[#0B0F19]"}`}>
                      ₹499 <span className="text-xs text-slate-400 font-normal">• 6 Colors</span>
                    </span>
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
          <div className="hero-guarantee-bar pt-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              <div
                className={`p-3.5 rounded-2xl border shadow-xs flex items-center gap-3 transition-colors ${isDark
                  ? "bg-[#111726]/95 border-slate-800 text-white"
                  : "bg-white border-slate-200/90 text-[#0B0F19]"
                  }`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-black ${isDark ? "text-white" : "text-[#0B0F19]"}`}>Zero Minimum MOQ</div>
                  <div className="text-[11px] text-slate-400 font-medium">Order 1 or 1,000 units</div>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border shadow-xs flex items-center gap-3 transition-colors ${isDark
                  ? "bg-[#111726]/95 border-slate-800 text-white"
                  : "bg-white border-slate-200/90 text-[#0B0F19]"
                  }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-black ${isDark ? "text-white" : "text-[#0B0F19]"}`}>Free Digital Proof</div>
                  <div className="text-[11px] text-slate-400 font-medium">Mockup approved before print</div>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border shadow-xs flex items-center gap-3 transition-colors ${isDark
                  ? "bg-[#111726]/95 border-slate-800 text-white"
                  : "bg-white border-slate-200/90 text-[#0B0F19]"
                  }`}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-black ${isDark ? "text-white" : "text-[#0B0F19]"}`}>In-House Studio</div>
                  <div className="text-[11px] text-slate-400 font-medium">Ranchi Studio production</div>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border shadow-xs flex items-center gap-3 transition-colors ${isDark
                  ? "bg-[#111726]/95 border-slate-800 text-white"
                  : "bg-white border-slate-200/90 text-[#0B0F19]"
                  }`}
              >
                <div className="w-9 h-9 rounded-xl bg-[#FF4D36]/10 text-[#FF4D36] flex items-center justify-center shrink-0 border border-[#FF4D36]/20">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs font-black ${isDark ? "text-white" : "text-[#0B0F19]"}`}>24–48h Dispatch</div>
                  <div className="text-[11px] text-slate-400 font-medium">Express padded shipping</div>
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
