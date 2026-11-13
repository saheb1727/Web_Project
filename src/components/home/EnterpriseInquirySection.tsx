"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export const EnterpriseInquirySection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid corporate or personal email", "error");
      return;
    }

    setIsSubmitted(true);
    showToast("Voucher activated! Use coupon code FIRST200 at checkout.", "success");
    setEmail("");
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Custom Enterprise Inquiry Card (Top White Card Matching Reference) */}
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

        {/* 2. Newsletter / First Order Discount Banner (Bottom Dark Indigo Section) */}
        <div className="rounded-3xl bg-gradient-to-b from-[#1E1B4B] via-[#1B1845] to-[#120F35] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F95738]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            
            {/* Centered Translucent Mail Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-[#F95738] mx-auto shadow-inner">
              <Mail className="w-6 h-6" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Get ₹200 Off Your First Custom Order
            </h2>

            {/* Subheading */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
              Join 25,000+ businesses receiving secret flash sales, product launch previews, and exclusive print discounts.
            </p>

            {/* Form / Success State */}
            {isSubmitted ? (
              <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/20 max-w-md mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Success! Coupon code <strong className="text-[#F95738] font-black">FIRST200</strong> is ready for checkout.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5 items-stretch"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate or personal email"
                  required
                  className="flex-1 px-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#F95738] shadow-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#F95738] hover:bg-[#e04526] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-98 cursor-pointer"
                >
                  <span>Get ₹200 Off</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

