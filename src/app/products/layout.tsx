import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Custom Merchandise & Corporate Kits | MyPrintHub.in",
  description:
    "Explore India's premier collection of custom neodymium magnetic badges, bio-washed t-shirts, 380 GSM fleece hoodies, embroidered caps, and corporate welcome kits with zero minimum orders.",
  keywords: [
    "custom t-shirts india",
    "magnetic name badges online",
    "custom hoodies printing",
    "embroidered caps ncr",
    "corporate gift kits delhi",
  ],
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

