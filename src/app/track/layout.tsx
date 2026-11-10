import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order Live | MyPrintHub.in",
  description:
    "Track the live progress of your custom print order from pre-press digital proofing to factory laser printing, packaging, and door-to-door courier dispatch.",
};

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

