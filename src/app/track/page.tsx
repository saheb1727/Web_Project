"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  MapPin,
  PhoneCall,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface TrackingStep {
  title: string;
  desc: string;
  date: string;
  completed: boolean;
  active: boolean;
}

export default function TrackOrderPage() {
  const [orderInput, setOrderInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(3); // 1 to 5
  const { showToast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderInput.trim()) {
      showToast("Please enter a valid Order ID (e.g. MPH-582910)", "error");
      return;
    }
    setIsSearched(true);
    showToast(`Order details loaded for ${orderInput.toUpperCase()}`, "success");
  };

  const handleLoadDemo = (stage: number, orderId: string) => {
    setOrderInput(orderId);
    setPhoneInput("9876543210");
    setActiveStage(stage);
    setIsSearched(true);
    showToast(`Demo order loaded: #${orderId}`, "info");
  };

  const steps: TrackingStep[] = [
    {
      title: "Order Placed & Confirmed",
      desc: "Items verified and order queued for pre-press artwork checks.",
      date: "Nov 07, 2026 - 10:30 AM",
      completed: activeStage >= 1,
      active: activeStage === 1,
    },
    {
      title: "Vector Artwork & Pantone Approval",
      desc: "In-house graphic design team verified vector resolution and color profiles.",
      date: "Nov 07, 2026 - 02:45 PM",
      completed: activeStage >= 2,
      active: activeStage === 2,
    },
    {
      title: "Industrial Printing & Quality Inspection",
      desc: "Japanese UV direct-to-film printing completed. Passed 100% scratch and magnet pull strength test.",
      date: "Nov 08, 2026 - 11:15 AM",
      completed: activeStage >= 3,
      active: activeStage === 3,
    },
    {
      title: "Dispatched via Express Courier",
      desc: "Handed over to BlueDart Express. AWB: BD-928410294. In transit to destination hub.",
      date: "Nov 09, 2026 - 09:00 AM",
      completed: activeStage >= 4,
      active: activeStage === 4,
    },
    {
      title: "Delivered to Doorstep",
      desc: "Package safely delivered and signed by recipient.",
      date: "Expected by Tomorrow",
      completed: activeStage >= 5,
      active: activeStage === 5,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4D24]/10 text-[#FF4D24] text-xs font-bold uppercase tracking-wider mb-2">
            <Truck className="w-4 h-4" />
            <span>Live Courier Tracking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#142344] tracking-tight">
            Track Your Custom Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Enter your order reference ID (provided on checkout or SMS receipt) to view your printing and transit status.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Order ID Number *
              </label>
              <input
                type="text"
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
                placeholder="e.g. MPH-582910"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#142344] uppercase font-mono"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="10-digit registered mobile"
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#142344]"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#FF4D24] hover:bg-[#E03C14] text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Pre-fills */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Quick Test Demos:
            </span>
            <button
              type="button"
              onClick={() => handleLoadDemo(3, "MPH-482103")}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              #MPH-482103 (In Production)
            </button>
            <button
              type="button"
              onClick={() => handleLoadDemo(4, "MPH-789214")}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              #MPH-789214 (In Transit)
            </button>
            <button
              type="button"
              onClick={() => handleLoadDemo(5, "MPH-310492")}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              #MPH-310492 (Delivered)
            </button>
          </div>
        </div>

        {/* Tracking Details Result */}
        {isSearched && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Status Summary Banner */}
            <div className="p-6 rounded-3xl bg-[#142344] text-white shadow-xl border border-[#273B66] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-300 uppercase tracking-wider font-bold">
                  Order #{orderInput.toUpperCase() || "MPH-789214"}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {activeStage === 5
                    ? "Delivered Successfully"
                    : activeStage === 4
                    ? "Out for Delivery via BlueDart"
                    : activeStage === 3
                    ? "In Production (Quality Inspection)"
                    : "Artwork Approved by Designers"}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF4D24]" />
                    Destination: Bengaluru, Karnataka
                  </span>
                  <span>•</span>
                  <span>Courier AWB: <strong>BD-928410294</strong></span>
                </div>
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-center">
                <span className="text-[10px] text-slate-300 uppercase font-bold block">
                  Estimated Arrival
                </span>
                <span className="text-sm font-black text-[#FF4D24]">
                  Tomorrow, by 6:00 PM
                </span>
              </div>
            </div>

            {/* Step Timeline */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h4 className="text-base font-black text-[#142344] mb-6">
                Live Production & Courier Milestones
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {steps.map((st, i) => (
                  <div key={i} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white transition-all shadow-xs ${
                        st.completed
                          ? "bg-emerald-500 ring-4 ring-emerald-100"
                          : st.active
                          ? "bg-[#FF4D24] ring-4 ring-[#FF4D24]/20 animate-pulse"
                          : "bg-slate-300"
                      }`}
                    >
                      {st.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h5
                        className={`text-sm font-bold ${
                          st.completed || st.active ? "text-[#142344]" : "text-slate-400"
                        }`}
                      >
                        {st.title}
                      </h5>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {st.date}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Assistance Card */}
            <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#142344] text-[#FF4D24] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Need urgent address modification?</div>
                  <div className="text-slate-500">Contact our dispatch desk on +91 98765 43210 (Mon-Sat, 9 AM - 8 PM).</div>
                </div>
              </div>
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-[#142344] hover:bg-[#0D1830] text-white font-bold rounded-xl whitespace-nowrap transition-colors"
              >
                Contact Support Desk
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

