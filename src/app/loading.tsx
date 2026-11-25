import React from "react";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white shadow-2xl border border-slate-200/90 text-center mx-4 max-w-[280px] w-full animate-in zoom-in-95 duration-200">
        <div className="relative mb-3.5 flex items-center justify-center">
          {/* Ambient Glow */}
          <div className="absolute w-16 h-16 rounded-2xl bg-[#FF4D36]/25 blur-lg animate-pulse" />

          {/* Outer Rotating Dual Ring */}
          <div className="w-15 h-15 rounded-2xl border-[2.5px] border-slate-100 border-t-[#FF4D36] border-r-[#FF4D36] animate-spin" />

          {/* Central Brand Monogram Box */}
          <div className="absolute inset-1.5 rounded-xl bg-[#0B0F19] flex items-center justify-center text-white font-black text-base shadow-sm">
            <span className="text-[#FF4D36]">MP</span>
          </div>
        </div>

        <p className="text-base font-black text-[#0B0F19] tracking-tight">
          MyPrintHub
        </p>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Loading studio experience...
        </p>

        {/* Shimmer loading bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3.5 overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-[#FF4D36] via-[#FF7A66] to-[#FFA07A] rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
