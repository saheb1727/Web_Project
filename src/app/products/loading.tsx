import React from "react";
import { ProductGridSkeleton, PageHeaderSkeleton } from "@/components/ui/Skeleton";

export default function CatalogLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-8 animate-in fade-in duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Skeleton */}
        <PageHeaderSkeleton />

        {/* Filter Bar Skeleton */}
        <div className="h-14 rounded-2xl bg-white border border-slate-200/80 mb-6 p-3 flex items-center gap-3">
          <div className="w-32 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-32 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-32 h-8 rounded-xl skeleton-shimmer" />
        </div>

        {/* Product Cards Grid Skeleton */}
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
