import React from "react";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Skeleton */}
      <div className="bg-slate-50/70 border-b border-slate-200/60 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="w-12 h-3.5 rounded bg-slate-200 skeleton-shimmer" />
            <div className="w-3 h-3 text-slate-300">/</div>
            <div className="w-16 h-3.5 rounded bg-slate-200 skeleton-shimmer" />
            <div className="w-3 h-3 text-slate-300">/</div>
            <div className="w-24 h-3.5 rounded bg-slate-200 skeleton-shimmer" />
            <div className="w-3 h-3 text-slate-300">/</div>
            <div className="w-32 h-3.5 rounded bg-slate-200 skeleton-shimmer" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Gallery Skeleton (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Image Box */}
            <div className="relative aspect-square sm:aspect-4/3 w-full rounded-2xl bg-slate-100 skeleton-shimmer border border-slate-200/60" />

            {/* Thumbnail Row */}
            <div className="flex items-center gap-2.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-xl bg-slate-100 skeleton-shimmer border border-slate-200/60 shrink-0"
                />
              ))}
            </div>

            {/* Trust Badges */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 grid grid-cols-2 gap-3">
              <div className="h-4 rounded bg-slate-200 skeleton-shimmer" />
              <div className="h-4 rounded bg-slate-200 skeleton-shimmer" />
            </div>
          </div>

          {/* Right Column: Details Skeleton (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Category & Share */}
            <div className="flex items-center justify-between">
              <div className="w-28 h-4 rounded bg-slate-200 skeleton-shimmer" />
              <div className="w-14 h-4 rounded bg-slate-200 skeleton-shimmer" />
            </div>

            {/* Title (2 lines) */}
            <div className="space-y-2">
              <div className="w-4/5 h-8 rounded-lg bg-slate-200 skeleton-shimmer" />
              <div className="w-1/2 h-8 rounded-lg bg-slate-200 skeleton-shimmer" />
            </div>

            {/* Rating & Stock */}
            <div className="flex items-center gap-3">
              <div className="w-20 h-6 rounded-md bg-slate-200 skeleton-shimmer" />
              <div className="w-36 h-6 rounded-md bg-slate-200 skeleton-shimmer" />
            </div>

            {/* Pricing Card Skeleton */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <div className="w-24 h-8 rounded bg-slate-200 skeleton-shimmer" />
                  <div className="w-16 h-5 rounded bg-slate-200 skeleton-shimmer" />
                  <div className="w-16 h-5 rounded-full bg-slate-200 skeleton-shimmer" />
                </div>
                <div className="w-24 h-6 rounded bg-slate-200 skeleton-shimmer" />
              </div>
              <div className="w-48 h-3 rounded bg-slate-200 skeleton-shimmer" />
            </div>

            {/* Bulk Volume Tiers Skeleton */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-36 h-4 rounded bg-slate-200 skeleton-shimmer" />
                <div className="w-20 h-4 rounded bg-slate-200 skeleton-shimmer" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 rounded-xl bg-white border border-slate-200 skeleton-shimmer"
                  />
                ))}
              </div>
            </div>

            {/* Color Swatches Skeleton */}
            <div className="space-y-2">
              <div className="w-28 h-4 rounded bg-slate-200 skeleton-shimmer" />
              <div className="flex items-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-slate-200 skeleton-shimmer"
                  />
                ))}
              </div>
            </div>

            {/* Size Skeleton */}
            <div className="space-y-2">
              <div className="w-20 h-4 rounded bg-slate-200 skeleton-shimmer" />
              <div className="flex items-center gap-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-14 h-9 rounded-xl bg-slate-200 skeleton-shimmer"
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-32 h-12 rounded-xl bg-slate-200 skeleton-shimmer" />
              <div className="flex-1 h-12 rounded-xl bg-slate-200 skeleton-shimmer" />
              <div className="w-32 h-12 rounded-xl bg-slate-200 skeleton-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

