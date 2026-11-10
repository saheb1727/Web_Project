import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Corporate Bulk Inquiries | MyPrintHub.in",
  description:
    "Get in touch with our expert print engineers and dedicated account managers for bulk corporate quotations, urgent rush dispatches, or custom PMS color matches.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

