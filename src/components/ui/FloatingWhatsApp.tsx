"use client";

import React from "react";
import { WhatsAppBadge } from "./WhatsAppIcon";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20MyPrintHub,%20I%20have%20an%20inquiry%20regarding%20custom%20merchandise%20and%20printing."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl border border-emerald-400/30 rounded-none transition-all duration-200 group cursor-pointer hover:scale-105 active:scale-95"
      aria-label="Chat on WhatsApp"
      title="Direct WhatsApp Support: +91 98765 43210"
    >
      <WhatsAppBadge className="w-5 h-5 shrink-0" />
      <span className="hidden sm:inline text-xs font-black tracking-wide uppercase">
        WhatsApp
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
