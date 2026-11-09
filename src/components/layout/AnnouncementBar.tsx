"use client";

import React, { useState } from "react";
import { Star, ArrowLeft, ArrowRight, X } from "lucide-react";
import Link from "next/link";

export const AnnouncementBar: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const messages = [
    "Trusted by 81,000+ Customers Across India",
    "Extra 15% OFF on first order with code SPECIAL15",
    "Zero Minimum Order Quantity on all Badges & Merch",
    "Made in our own factory in Noida NCR • 24-48h Dispatch",
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#142344] text-white text-xs border-b border-[#23355C] relative z-40 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="p-1 text-slate-400 hover:text-white transition-colors"
          aria-label="Previous announcement"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        {/* Center Message */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden px-4">
          <Star className="w-3.5 h-3.5 text-[#FF4D24] fill-[#FF4D24] shrink-0" />
          <span className="font-semibold text-xs text-slate-100 tracking-wide transition-all">
            {messages[currentSlide]}
          </span>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="p-1 text-slate-400 hover:text-white transition-colors"
          aria-label="Next announcement"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
