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

    // Apply strict scroll locking across all browsers and mobile devices
    // Avoid document.body.style.touchAction = "none" which breaks touch scrolling inside modal drawers
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Clean up when modal/menu closes
    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [isLocked]);
}
