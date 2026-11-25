import React from "react";
import { ProductGridSkeleton, PageHeaderSkeleton } from "@/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-8 animate-in fade-in duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top subtle brand loading badge */}
        <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs max-w-md mx-auto">
          <div className="relative w-10 h-10 rounded-xl bg-[#0B0F19] text-white flex items-center justify-center font-black text-sm shrink-0">
            <span className="text-[#FF4D36]">MP</span>
            <div className="absolute inset-0 rounded-xl border border-t-[#FF4D36] border-transparent animate-spin" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0B0F19]">Loading MyPrintHub...</p>
            <p className="text-[10px] text-slate-400">Loading custom apparel & merchandise</p>
          </div>
        </div>

        {/* Page Header Skeleton */}
        <PageHeaderSkeleton />

        {/* Filter bar Skeleton */}
        <div className="h-14 rounded-2xl bg-white border border-slate-200/80 p-3 flex items-center gap-3">
          <div className="w-28 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-28 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-28 h-8 rounded-xl skeleton-shimmer" />
        </div>

        {/* Product Cards Grid Skeleton */}
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
