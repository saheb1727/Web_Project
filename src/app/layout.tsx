import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Star } from "lucide-react";
import Link from "next/link";

export const viewport: Viewport = {
  themeColor: "#1E1B4B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://myprinthub.in"),
  title: {
    default: "MyPrintHub.in | Custom Printing, Magnetic Badges & Premium Merch",
    template: "%s | MyPrintHub.in",
  },
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
  authors: [{ name: "MyPrintHub.in" }],
  creator: "MyPrintHub.in",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://myprinthub.in",
    siteName: "MyPrintHub.in",
    title: "MyPrintHub.in | Custom Printing, Magnetic Badges & Premium Merch",
    description:
      "India's premier on-demand custom printing hub. 24-48h dispatch, zero minimum orders, and direct factory pricing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyPrintHub.in | Custom Printing, Magnetic Badges & Premium Merch",
    description:
      "India's premier on-demand custom printing hub. 24-48h dispatch, zero minimum orders, and direct factory pricing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://myprinthub.in/#organization",
        "name": "MyPrintHub.in",
        "url": "https://myprinthub.in",
        "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80",
        "description":
          "India's premier on-demand custom printing platform for executive magnetic badges, bio-washed apparel, and corporate welcome kits.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Sector 62",
          "addressLocality": "Noida",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201309",
          "addressCountry": "IN",
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9876543210",
          "contactType": "customer service",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://myprinthub.in/#website",
        "url": "https://myprinthub.in",
        "name": "MyPrintHub.in",
        "publisher": {
          "@id": "https://myprinthub.in/#organization",
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://myprinthub.in/products?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

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
          rel="dns-prefetch"
          href="https://images.unsplash.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#0F172A]">
        <ToastProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <AnnouncementBar />
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />

                {/* Floating Reviews Side Tab (Hidden on mobile to prevent content overlap) */}
                <Link
                  href="/#testimonials"
                  className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white px-2.5 py-4 rounded-l-xl shadow-xl flex-col items-center gap-1.5 transition-colors cursor-pointer group"
                  title="Read Customer Reviews"
                >
                  <Star className="w-3.5 h-3.5 text-[var(--color-accent)] group-hover:text-white fill-[var(--color-accent)] group-hover:fill-white" />
                  <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-bold tracking-widest uppercase">
                    Reviews
                  </span>
                </Link>
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
