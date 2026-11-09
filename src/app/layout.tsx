import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
      <body className="min-h-full flex flex-col font-sans bg-[#F8FAFC] text-[#0F172A]">
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
