"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    setIsSubmitted(true);
    showToast("Thank you for subscribing! Your discount code is PRINT15.", "success");
    setEmail("");
  };

  return (
    <section className="py-16 bg-[#142344] text-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF4D24]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-[#FF4D24]/20 border border-[#FF4D24]/40 flex items-center justify-center text-[#FF4D24] mx-auto mb-4">
          <Mail className="w-7 h-7" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Get ₹200 Off Your First Custom Order
        </h2>
        <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2">
          Join 25,000+ businesses receiving secret flash sales, product launch previews, and exclusive print discounts.
        </p>

        {isSubmitted ? (
          <div className="mt-8 p-4 rounded-2xl bg-white/10 border border-white/20 max-w-md mx-auto flex items-center justify-center gap-2 text-sm font-bold text-white">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Success! Use coupon code <strong className="text-[#FF4D24]">PRINT15</strong> at checkout.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your corporate or personal email..."
              required
              className="flex-1 px-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4D24]"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#FF4D24] hover:bg-[#E03C14] text-white text-sm font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <span>Get ₹200 Off</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-slate-400 mt-4">
          🔒 Zero spam policy. Unsubscribe anytime with 1 click.
        </p>
      </div>
    </section>
  );
};

