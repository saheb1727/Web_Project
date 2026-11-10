import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Wishlist & Custom Designs | MyPrintHub.in",
  description:
    "View your saved custom merchandise items, magnetic badges, apparel, and corporate gifts ready for instant configuration and ordering.",
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

