"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Video,
  MoveRight,
} from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface StudioReel {
  id: string;
  title: string;
  tag: string;
  category: string;
  description: string;
  videoSrc: string;
  productName: string;
  productLink: string;
  priceNote: string;
}

export const StudioReelsSection: React.FC = () => {
  const reels: StudioReel[] = [
    {
      id: "reel-1",
      title: "Precision UV DTF Color Printing",
      tag: "1200 DPI Micro-Drop",
      category: "Printing Lab",
      description: "Ultra-sharp micro-drop ink with vibrant CMYK + White + Varnish gloss coats.",
      videoSrc: "/videos/reel-1.mp4",
      productName: "100% Bio-Washed T-Shirts",
      productLink: "/products/prod-2",
      priceNote: "From ₹149/pc (Wholesale)",
    },
    {
      id: "reel-2",
      title: "Neodymium Magnetic Badge Assembly",
      tag: "Zero Pinholes",
      category: "Flagship Lab",
      description: "Brushed metallic acrylic laser cut and bonded to triple-point rare earth magnets.",
      videoSrc: "/videos/reel-2.mp4",
      productName: "Executive Magnetic Badges",
      productLink: "/products/prod-1",
      priceNote: "From ₹28/pc (Wholesale)",
    },
    {
      id: "reel-3",
      title: "Industrial Fabric Heat Press",
      tag: "Color-Fast Tested",
      category: "Apparel Studio",
      description: "Industrial pneumatic heat transfer cured to withstand 50+ wash cycles without fading.",
      videoSrc: "/videos/reel-3.mp4",
      productName: "Heavyweight 380 GSM Hoodies",
      productLink: "/products/prod-3",
      priceNote: "From ₹549/pc (Wholesale)",
    },
    {
      id: "reel-4",
      title: "3D Puff Embroidery On Twill Caps",
      tag: "Precision Stitching",
      category: "Embroidery Unit",
      description: "High-density foam 3D puff embroidery on structured 6-panel cotton twill caps.",
      videoSrc: "/videos/reel-4.mp4",
      productName: "Custom Embroidered Caps",
      productLink: "/products/prod-4",
      priceNote: "From ₹115/pc (Wholesale)",
    },
    {
      id: "reel-5",
      title: "Laser Engraved Drinkware & Pens",
      tag: "Micrometer Precision",
      category: "Laser Workshop",
      description: "Rotary fiber laser engraving permanent vector logos on matte powder-coated steel.",
      videoSrc: "/videos/reel-5.mp4",
      productName: "Ceramic & Insulated Mugs",
      productLink: "/products/prod-5",
      priceNote: "From ₹149/pc (Wholesale)",
    },
    {
      id: "reel-6",
      title: "Quality Inspection & Express Dispatch",
      tag: "24-48h Dispatch",
      category: "Ranchi Warehouse",
      description: "Individual unit checks, protective packaging, and instant BlueDart AWB generation.",
      videoSrc: "/videos/reel-6.mp4",
      productName: "Corporate Welcome Kits",
      productLink: "/products/prod-6",
      priceNote: "Zero Minimum Order Quantity",
    },
  ];

  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  useBodyScrollLock(activeModalIndex !== null);
  const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);
  const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({
    "reel-1": true,
    "reel-2": true,
    "reel-3": true,
    "reel-4": true,
    "reel-5": true,
    "reel-6": true,
  });
  const [playingStates, setPlayingStates] = useState<{ [key: string]: boolean }>({
    "reel-1": false,
    "reel-2": false,
    "reel-3": false,
    "reel-4": false,
    "reel-5": false,
    "reel-6": false,
  });

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP ScrollTrigger Entrance for Reels
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        ".studio-reel-header",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", clearProps: "all" }
      ).fromTo(
        ".studio-reel-card",
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "all",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Performance Scroll Guard: Pause all background videos immediately while actively scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Pause all playing videos when scroll starts to eliminate GPU contention
      Object.keys(videoRefs.current).forEach((id) => {
        const vid = videoRefs.current[id];
        if (vid && !vid.paused) {
          vid.pause();
          setPlayingStates((prev) => ({ ...prev, [id]: false }));
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") setActiveModalIndex(null);
      if (e.key === "ArrowRight") {
        setActiveModalIndex((prev) =>
          prev !== null ? (prev + 1) % reels.length : null
        );
      }
      if (e.key === "ArrowLeft") {
        setActiveModalIndex((prev) =>
          prev !== null ? (prev === 0 ? reels.length - 1 : prev - 1) : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, reels.length]);

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (vid) {
      vid.muted = !vid.muted;
      setMutedStates((prev) => ({ ...prev, [id]: vid.muted }));
    }
  };

  const handleCardMouseEnter = (id: string) => {
    setHoveredReelId(id);
    const vid = videoRefs.current[id];
    if (vid) {
      vid.play().catch(() => { });
      setPlayingStates((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleCardMouseLeave = (id: string) => {
    setHoveredReelId(null);
    const vid = videoRefs.current[id];
    if (vid) {
      vid.pause();
      setPlayingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const togglePlay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (vid) {
      if (vid.paused) {
        vid.play().catch(() => { });
        setPlayingStates((prev) => ({ ...prev, [id]: true }));
      } else {
        vid.pause();
        setPlayingStates((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  return (
    <>
      <section ref={sectionRef} className="py-20 bg-[#0B0F19] text-white border-b border-slate-800 overflow-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="studio-reel-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF4D36] uppercase tracking-wider mb-2">
                <Video className="w-4 h-4" />
                <span>Ranchi Workshop & Production Studio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Craftsmanship in Motion
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Real raw footage from our production lab. Watch 1200 DPI printing, laser cutting, and precision assembly.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="sm:hidden text-[11px] font-bold text-slate-400 flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-none">
                <span>Swipe reels</span>
                <MoveRight className="w-3.5 h-3.5 text-[#FF4D36] animate-pulse" />
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-slate-900 text-emerald-400 border border-slate-800">
                <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse" />
                <span>6 Production Reels</span>
              </span>
            </div>
          </div>

          {/* Video Reels: Horizontal Swipeable on Mobile, 3-Col Grid on Desktop */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-3 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {reels.map((reel, idx) => {
              const isMuted = mutedStates[reel.id] ?? true;
              const isPlaying = playingStates[reel.id] ?? false;

              return (
                <div
                  key={reel.id}
                  onClick={() => setActiveModalIndex(idx)}
                  onMouseEnter={() => handleCardMouseEnter(reel.id)}
                  onMouseLeave={() => handleCardMouseLeave(reel.id)}
                  style={{ transform: "translateZ(0)", willChange: "transform" }}
                  className="studio-reel-card group relative rounded-none overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col aspect-9/14 sm:aspect-9/13 w-[250px] sm:w-auto shrink-0 snap-center"
                >
                  {/* High-Performance Video Player */}
                  <video
                    ref={(el) => {
                      videoRefs.current[reel.id] = el;
                    }}
                    src={reel.videoSrc}
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    style={{ transform: "translateZ(0)", willChange: "transform" }}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />

                  {/* High-Performance Overlay (No live backdrop-blur on video surface) */}
                  <div className="absolute inset-0 bg-black/45 pointer-events-none" />

                  {/* Top Bar on Video Card */}
                  <div className="relative z-10 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-none bg-black/85 border border-white/20 text-white text-[10px] font-bold">
                        {reel.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-none bg-[#F95738] text-white text-[9px] font-extrabold uppercase">
                        {reel.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Mute/Unmute Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleMute(reel.id, e)}
                        className="w-8 h-8 rounded-none bg-black/85 hover:bg-[#F95738] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Expand Button */}
                      <div className="w-8 h-8 rounded-none bg-black/85 text-white flex items-center justify-center border border-white/20">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Center Floating Play/Pause Indicator */}
                  <div
                    className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-90"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => togglePlay(reel.id, e)}
                      className="w-12 h-12 rounded-none bg-black/85 hover:bg-[#F95738] text-white border border-white/30 flex items-center justify-center transition-all group-hover:scale-110 pointer-events-auto cursor-pointer shadow-lg"
                      title={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-white" />
                      ) : (
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Meta & Action */}
                  <div className="relative z-10 mt-auto p-5 text-white space-y-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <h3 className="text-base font-extrabold text-white tracking-tight leading-snug group-hover:text-[#F95738] transition-colors">
                      {reel.title}
                    </h3>

                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                      {reel.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-white/15">
                      <div>
                        <div className="text-[10px] text-slate-400 font-semibold">Featured Product</div>
                        <div className="text-xs font-bold text-white truncate max-w-[160px]">
                          {reel.productName}
                        </div>
                      </div>

                      <Link
                        href={reel.productLink}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-none bg-white/15 hover:bg-[#F95738] text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-white/20"
                      >
                        <span>Customize</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Lightbox Cinema Modal */}
      {activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-none overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalIndex(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-none bg-black/70 hover:bg-[#F95738] text-white transition-colors cursor-pointer border border-white/20"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Full Video Player (7 cols) */}
            <div className="md:col-span-7 bg-black flex items-center justify-center relative aspect-9/16 sm:aspect-auto sm:min-h-[480px]">
              <video
                key={reels[activeModalIndex].videoSrc}
                src={reels[activeModalIndex].videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-full max-h-[70vh] sm:max-h-[85vh] object-contain"
              />

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={() =>
                  setActiveModalIndex((prev) =>
                    prev !== null ? (prev === 0 ? reels.length - 1 : prev - 1) : null
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-none bg-black/60 hover:bg-[#F95738] text-white transition-colors cursor-pointer border border-white/20"
                aria-label="Previous reel"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveModalIndex((prev) =>
                    prev !== null ? (prev + 1) % reels.length : null
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-none bg-black/60 hover:bg-[#F95738] text-white transition-colors cursor-pointer border border-white/20"
                aria-label="Next reel"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Column: Merch Details & Quick Action (5 cols) */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between text-white bg-[#0B0F19] overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-none bg-[#F95738] text-white text-[10px] font-bold">
                    {reels[activeModalIndex].category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Reel {activeModalIndex + 1} of {reels.length}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {reels[activeModalIndex].title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {reels[activeModalIndex].description}
                </p>

                <div className="p-4 rounded-none bg-white/5 border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-slate-400">Featured In This Video</div>
                  <div className="text-sm font-extrabold text-white">
                    {reels[activeModalIndex].productName}
                  </div>
                  <div className="text-xs font-bold text-[#F95738]">
                    {reels[activeModalIndex].priceNote}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Direct Factory Manufacturing • Zero Minimum Quantity</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-2.5">
                <Link
                  href={reels[activeModalIndex].productLink}
                  onClick={() => setActiveModalIndex(null)}
                  className="w-full py-3.5 bg-[#F95738] hover:bg-[#e04526] text-white text-xs sm:text-sm font-bold rounded-none shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Customize This Merch</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveModalIndex(null)}
                  className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer text-center"
                >
                  Close Player (ESC)
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
