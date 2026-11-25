"use client";

import React, { Suspense, useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PageTransitionLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // When the route or search parameters change, complete and hide the progress bar
    if (isVisible) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Find the closest anchor tag
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");

      // Only handle internal relative links that do not open in new tab or jump to hash
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("#") &&
        target !== "_blank" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        const currentUrl = window.location.pathname + window.location.search;
        if (href !== currentUrl) {
          startTransition(() => {
            setIsVisible(true);
            setProgress(25);
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, []);

  // Animate progress smoothly forward while loading
  useEffect(() => {
    if (!isVisible) return;

    const intervals: NodeJS.Timeout[] = [];

    // Increment 1
    intervals.push(
      setTimeout(() => {
        setProgress((prev) => (prev < 60 ? 60 : prev));
      }, 150)
    );

    // Increment 2
    intervals.push(
      setTimeout(() => {
        setProgress((prev) => (prev < 80 ? 80 : prev));
      }, 400)
    );

    // Increment 3
    intervals.push(
      setTimeout(() => {
        setProgress((prev) => (prev < 92 ? 92 : prev));
      }, 800)
    );

    // Safety timeout: auto-complete after 6 seconds in case navigation is interrupted
    intervals.push(
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          setProgress(0);
        }, 300);
      }, 6000)
    );

    return () => {
      intervals.forEach((timer) => clearTimeout(timer));
    };
  }, [isVisible]);

  if (!isVisible && progress === 0) return null;

  return (
    <>
      {/* Top glowing progress line */}
      <div
        className="fixed top-0 left-0 right-0 h-[3.5px] z-[999999] pointer-events-none transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-[#FF4D36] via-[#FF7A66] to-[#FFA07A] page-loader-glow" />
        
        {/* Trailing bright flare */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-white/70 blur-[1px]" />
      </div>

      {/* Screen Center Loader Modal - Optimized for mobile phone screens & desktop */}
      {isVisible && progress < 100 && (
        <div className="fixed inset-0 z-[999998] flex items-center justify-center p-4 bg-slate-950/25 backdrop-blur-xs pointer-events-none animate-in fade-in duration-200">
          <div className="flex flex-col items-center justify-center p-6 sm:p-7 rounded-3xl bg-white shadow-2xl border border-slate-200/90 text-center max-w-[260px] w-full animate-in zoom-in-95 duration-200">
            <div className="relative mb-3 flex items-center justify-center">
              {/* Ambient Glow */}
              <div className="absolute w-14 h-14 rounded-2xl bg-[#FF4D36]/25 blur-md animate-pulse" />

              {/* Spinning Outer Ring */}
              <div className="w-13 h-13 rounded-2xl border-2 border-slate-100 border-t-[#FF4D36] border-r-[#FF4D36] animate-spin" />

              {/* Central Brand Monogram Box */}
              <div className="absolute inset-1.5 rounded-xl bg-[#0B0F19] flex items-center justify-center text-white font-black text-sm shadow-xs">
                <span className="text-[#FF4D36]">MP</span>
              </div>
            </div>

            <p className="text-sm font-black text-[#0B0F19] tracking-tight">
              MyPrintHub
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              Loading page...
            </p>

            {/* Progress Bar in center card */}
            <div className="w-full h-1 bg-slate-100 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF4D36] to-[#FFA07A] transition-all duration-300 rounded-full"
                style={{ width: `${Math.max(progress, 20)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function PageTransitionLoader() {
  return (
    <Suspense fallback={null}>
      <PageTransitionLoaderContent />
    </Suspense>
  );
}
