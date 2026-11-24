import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard // MyPrintHub Studio",
  description: "Live store management console for MyPrintHub: product catalog, stock inventory, and email desk.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#F8FAFC]">{children}</div>;
}
