"use client";

import { useEffect } from "react";

/**
 * Custom hook to completely freeze document body & html scrolling
 * when a modal, popup, or mobile side menu is open.
 * Handles desktop, iOS, Android touchmove, and keyboard scroll events.
 */
export function useBodyScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    // Save previous styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const scrollY = window.scrollY;

    // Apply strict scroll locking across all browsers and mobile devices
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "relative";
    document.body.style.touchAction = "none";

    // Clean up when modal/menu closes
    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      document.body.style.touchAction = "";
    };
  }, [isLocked]);
}
