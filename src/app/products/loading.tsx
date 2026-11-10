import React from "react";

export default function CatalogLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-3">
          <div className="w-48 h-8 rounded-lg bg-slate-200 skeleton-shimmer" />
          <div className="w-80 h-4 rounded bg-slate-200 skeleton-shimmer" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="h-14 rounded-2xl bg-white border border-slate-200/80 mb-6 p-3 flex items-center gap-3">
          <div className="w-32 h-8 rounded-xl bg-slate-100 skeleton-shimmer" />
          <div className="w-32 h-8 rounded-xl bg-slate-100 skeleton-shimmer" />
          <div className="w-32 h-8 rounded-xl bg-slate-100 skeleton-shimmer" />
        </div>

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 space-y-3 shadow-2xs"
            >
              <div className="aspect-square rounded-xl bg-slate-100 skeleton-shimmer" />
              <div className="w-20 h-3 rounded bg-slate-200 skeleton-shimmer" />
              <div className="w-full h-4 rounded bg-slate-200 skeleton-shimmer" />
              <div className="flex items-center justify-between pt-2">
                <div className="w-16 h-5 rounded bg-slate-200 skeleton-shimmer" />
                <div className="w-8 h-8 rounded-full bg-slate-200 skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

