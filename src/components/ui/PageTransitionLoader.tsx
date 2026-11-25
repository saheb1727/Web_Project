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
        className="fixed top-0 left-0 right-0 h-[3px] z-[99999] pointer-events-none transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-[#FF4D36] via-[#FF7A66] to-[#FFA07A] page-loader-glow" />
        
        {/* Trailing bright flare */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-white/70 blur-[1px]" />
      </div>

      {/* Subtle floating spinner indicator at top-right */}
      {isVisible && progress < 100 && (
        <div className="fixed top-3.5 right-4 z-[99999] pointer-events-none animate-in fade-in duration-200">
          <div className="w-5 h-5 rounded-full border-2 border-[#FF4D36]/30 border-t-[#FF4D36] animate-spin shadow-sm" />
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
