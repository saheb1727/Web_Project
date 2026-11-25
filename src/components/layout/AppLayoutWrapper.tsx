"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionLoader } from "@/components/ui/PageTransitionLoader";

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  // Determine if the current route is a dedicated workspace/portal
  // 1. /admin route (Full-Featured Store Administration Dashboard)
  // 2. /account or /auth when logged in (Full-Screen Studio Customer Hub)
  const isAdmin = pathname?.startsWith("/admin");
  const isDedicatedPortal =
    isAdmin ||
    pathname?.startsWith("/account") ||
    (pathname === "/auth" && isLoggedIn);

  // If in dedicated workspace/portal mode, omit the consumer storefront header & footer
  // so the dashboard gets 100% of the viewport without the "Header Inception" double navbar
  if (isDedicatedPortal) {
    return (
      <main className="flex-1 w-full max-w-full min-h-screen bg-[#F8FAFC]">
        <PageTransitionLoader />
        {children}
      </main>
    );
  }

  // Otherwise, render normal e-commerce storefront layout with header and footer
  return (
    <>
      <PageTransitionLoader />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
}
