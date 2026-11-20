"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export const EnterpriseInquirySection: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Custom Enterprise Inquiry Card */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-black text-[#1E1B4B]">
              Have a custom enterprise inquiry?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Talk directly to our print engineers for custom Pantone matches and specialized dimensions.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3.5 bg-[#1E1B4B] hover:bg-[#120F38] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-sm transition-all flex items-center gap-2.5 shrink-0 group cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#F95738] group-hover:scale-110 transition-transform" />
            <span>Chat With Support</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

