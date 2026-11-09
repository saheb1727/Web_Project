"use client";

import React, { useState } from "react";
import { Sparkles, Truck, PhoneCall, X } from "lucide-react";
import Link from "next/link";

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#142344] text-white text-xs border-b border-[#23355C] relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        {/* Left: Help / Hotline */}
        <div className="hidden lg:flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-[#FF4D24]" />
            <span>Support: +91 98765 43210</span>
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">bulk@myprinthub.in</span>
        </div>

        {/* Center: Dynamic Announcement */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4D24] shrink-0 animate-pulse" />
          <span className="font-medium text-slate-100">
            Flat <strong className="text-[#FF4D24]">15% OFF</strong> on First Custom Order! Use Code:{" "}
            <span className="bg-[#FF4D24]/20 border border-[#FF4D24]/40 text-[#FF4D24] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">
              PRINT15
            </span>
          </span>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:flex items-center gap-1 text-slate-300">
            <Truck className="w-3.5 h-3.5 text-[#FF4D24]" />
            Free Pan-India Delivery on orders above ₹999
          </span>
        </div>

        {/* Right: Quick Links & Close */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="text-slate-300 hover:text-white transition-colors hidden sm:inline"
          >
            Track Order
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-white transition-colors p-0.5"
            aria-label="Close Announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

