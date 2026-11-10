import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Sign In & Registration | MyPrintHub.in",
  description:
    "Log in to your MyPrintHub account to access saved vector artwork proofs, view previous order invoices, reorder corporate merch, and track active deliveries.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

