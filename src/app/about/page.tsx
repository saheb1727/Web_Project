import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Cpu,
  Heart,
  Award,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Our Factory & Quality Guarantee | MyPrintHub.in",
  description:
    "Learn about MyPrintHub's 10,000 sq ft manufacturing hub in Noida NCR, Japanese UV DTF printing technology, neodymium magnetic badges, and zero minimum order policy.",
};

export default function AboutPage() {
  const stats = [
    { label: "Custom Merch Delivered", value: "50,000+" },
    { label: "Corporate Clients", value: "2,500+" },
    { label: "Print Accuracy Guarantee", value: "99.8%" },
    { label: "Pan-India Dispatch", value: "24-48 Hours" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Hero Header */}
      <div className="bg-[#1E1B4B] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="text-xs font-bold text-[#F95738] uppercase tracking-wider block mb-2">
            Our Mission & Craftsmanship
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Building India&apos;s Most Reliable Custom Printing Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            We started MyPrintHub.in with a simple purpose: give every founder, startup, college club, and enterprise access to world-class custom merchandise without forced 50-piece minimums or cheap flimsy materials.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Stats Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="p-3">
              <div className="text-3xl sm:text-4xl font-black text-[#1E1B4B] mb-1">
                {s.value}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#F95738] uppercase tracking-wider block">
              The MyPrintHub Difference
            </span>
            <h2 className="text-3xl font-black text-[#1E1B4B] tracking-tight">
              Why We Invented the Rare-Earth Magnetic Badge
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional pin-backed badges ruin expensive formal shirts, lab coats, and tailored blazers. We engineered our signature brushed metallic name badges with a triple-point neodymium magnetic system that holds firmly with zero fabric punctures.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              From our factory in Noida NCR, we operate Japanese Mimaki UV Direct-to-Film printers and fiber laser engravers that reproduce your brand pantones with micrometer accuracy.
            </p>

            <div className="space-y-2 pt-2 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F95738]" />
                <span>Zero Pinholes on suits, blazers, and luxury fabrics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F95738]" />
                <span>100% Super-Combed 180-380 GSM Cotton with bio-wash</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F95738]" />
                <span>Zero Minimum Order Quantity on all apparel and badges</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80"
              alt="MyPrintHub Factory & Printing Facility"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-black text-[#1E1B4B]">
              Our Guiding Principles
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Quality you can feel, delivered on the timeline your event demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F95738]/10 text-[#F95738] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1E1B4B]">Print Perfection Guarantee</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your order arrives with any misprint, color discrepancy, or defective stitching, we replace it immediately with priority courier shipping.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1E1B4B] text-[#F95738] flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1E1B4B]">Industrial Micro-Drop Tech</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We print with non-toxic, eco-friendly Oeko-Tex certified inks that withstand 50+ wash cycles without fading, cracking, or flaking.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F95738]/10 text-[#F95738] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1E1B4B]">No MOQ Democratization</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Whether you need 1 custom hoodie for a birthday gift or 5,000 badges for a national medical conference, every customer receives VIP care.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#1E1B4B] text-white text-center shadow-xl relative overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            Ready to bring your brand to life?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6">
            Join thousands of successful businesses across India. Browse our catalog and upload your vector logo in seconds.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F95738] hover:bg-[#E03A1B] text-white font-bold rounded-xl shadow-lg transition-all text-sm cursor-pointer"
          >
            <span>Start Customizing Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
