import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Shopping Cart & Wholesale Discount | MyPrintHub.in",
  description:
    "Review your customized merchandise, apply promotional discount coupons, calculate wholesale tiered pricing, and proceed with secure pan-India checkout.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

