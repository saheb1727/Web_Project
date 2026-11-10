import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Star } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MyPrintHub.in | Custom Printing, Magnetic Badges & Premium Merch",
  description:
    "India's premier on-demand custom printing platform. Neodymium magnetic name badges, bio-washed cotton t-shirts, 380 GSM fleece hoodies, and corporate welcome kits with zero minimum orders.",
  keywords: [
    "custom t-shirts india",
    "magnetic name badges",
    "custom hoodies printing",
    "corporate merchandise ncr delhi",
    "custom caps embroidery",
    "myprinthub",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#0F172A]">
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />

              {/* Floating Reviews Side Tab (Matching Reference Screenshot) */}
              <Link
                href="/#testimonials"
                className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white px-2.5 py-4 rounded-l-xl shadow-xl flex flex-col items-center gap-1.5 transition-colors cursor-pointer group"
                title="Read Customer Reviews"
              >
                <Star className="w-3.5 h-3.5 text-[var(--color-accent)] group-hover:text-white fill-[var(--color-accent)] group-hover:fill-white" />
                <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-bold tracking-widest uppercase">
                  Reviews
                </span>
              </Link>
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
