"use client";

import React from "react";
import Image from "next/image";
import { Check, ShieldCheck, Cpu, Clock, DollarSign, HeartHandshake } from "lucide-react";
import Link from "next/link";

export const WhyChooseUs: React.FC = () => {
  const perks = [
    {
      icon: Cpu,
      title: "State-of-the-Art Japanese DTF & Laser Printers",
      desc: "We use Mimaki and Roland UV printers offering 1200+ DPI micro-drop ink precision. Gradients, fine micro-text, and pantone brand colors reproduce flawlessly.",
    },
    {
      icon: ShieldCheck,
      title: "Zero-Pinhole Neodymium Magnetic Badges",
      desc: "Our 3-point rare-earth magnet fasteners hold with 2.5 kg pull strength through formal blazers, shirts, and lab coats without damaging fibers.",
    },
    {
      icon: DollarSign,
      title: "Direct Factory Wholesale Tiered Pricing",
      desc: "No middlemen or brokers. We manufacture in-house, giving you up to 55% wholesale savings automatically calculated as your quantity increments.",
    },
    {
      icon: Clock,
      title: "Lightning Fast Turnaround & Live Tracking",
      desc: "Need 500 badges or T-shirts for an upcoming corporate summit this Friday? We offer priority 24-hour rush production dispatch.",
    },
    {
      icon: HeartHandshake,
      title: "Dedicated Corporate Account Managers",
      desc: "Orders over 50 pieces receive a personal merch specialist who sends digital pre-production proofs and custom packaging options.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Perks List */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#FF4D24] uppercase tracking-wider block mb-2">
                Uncompromising Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#142344] tracking-tight leading-tight">
                Why Top Companies & Creators Choose MyPrintHub.in
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Unlike ordinary print shops that compromise with flimsy vinyl stickers and dull screen prints, we build merchandise meant to last years.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {perks.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-[#142344]/30 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#142344] text-[#FF4D24] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#142344]">{p.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4D24] hover:bg-[#E03C14] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                <span>Read Our Quality Story</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Infographic Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-[#142344] p-6 text-white shadow-2xl border border-[#273B66]">
              {/* Badge */}
              <div className="flex items-center justify-between border-b border-[#273B66] pb-4 mb-6">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Print Lab Standards
                  </span>
                  <h3 className="text-lg font-black text-white">MyPrintHub vs. Local Vendors</h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#FF4D24] flex items-center justify-center font-bold text-white text-xs">
                  A+
                </div>
              </div>

              {/* Comparison table */}
              <div className="space-y-3.5 text-xs">
                {[
                  {
                    feature: "Fastener Quality",
                    us: "Triple-point NdFeB Rare Earth Magnets",
                    them: "Safety pins that tear expensive fabric",
                  },
                  {
                    feature: "Apparel Fabric",
                    us: "180-380 GSM 100% Combed Cotton Fleece",
                    them: "Cheap polyester blends prone to bobbling",
                  },
                  {
                    feature: "Minimum Order",
                    us: "0 Minimum Order (Order 1 piece)",
                    them: "Requires 50-100 pcs minimum upfront",
                  },
                  {
                    feature: "Print Longevity",
                    us: "50+ Wash Cycles Scratch-Proof DTF & Laser",
                    them: "Peels and cracks after 3-5 home washes",
                  },
                  {
                    feature: "Live Mockup Tool",
                    us: "Instant Real-Time Browser Customizer",
                    them: "Manual email back-and-forth for days",
                  },
                ].map((row, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#1C2E56] border border-[#2B4174]">
                    <div className="font-bold text-slate-200 mb-1">{row.feature}</div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />
                        <span>{row.us}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#273B66] text-center">
                <span className="text-xs text-slate-400">
                  Trusted by 2,500+ Indian Startups, Colleges & Enterprises
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

