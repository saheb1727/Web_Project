import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Base atomic Skeleton component with smooth shimmer wave
 */
export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer rounded-xl ${className}`}
      {...props}
    />
  );
}

/**
 * Product Card Skeleton matching MyPrintHub rounded card aesthetic
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 space-y-3 shadow-2xs">
      {/* Product Image Skeleton */}
      <Skeleton className="aspect-square w-full rounded-xl" />

      {/* Category Pill Skeleton */}
      <Skeleton className="w-20 h-3 rounded-md" />

      {/* Title Lines */}
      <div className="space-y-1.5">
        <Skeleton className="w-full h-4 rounded-md" />
        <Skeleton className="w-3/4 h-3.5 rounded-md" />
      </div>

      {/* Bottom Pricing & CTA */}
      <div className="flex items-center justify-between pt-2">
        <div className="space-y-1">
          <Skeleton className="w-16 h-4 rounded-md" />
          <Skeleton className="w-10 h-3 rounded-md" />
        </div>
        <Skeleton className="w-8 h-8 rounded-xl" />
      </div>
    </div>
  );
}

/**
 * Grid of Product Card Skeletons
 */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Page Header Skeleton
 */
export function PageHeaderSkeleton() {
  return (
    <div className="mb-8 space-y-2.5">
      <Skeleton className="w-44 h-8 rounded-xl" />
      <Skeleton className="w-72 h-4 rounded-lg" />
    </div>
  );
}

/**
 * Cart Page Skeleton
 */
export function CartSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeaderSkeleton />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List Skeleton */}
          <div className="lg:col-span-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 flex gap-4 items-center"
              >
                <Skeleton className="w-20 h-20 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-48 h-4 rounded-md" />
                  <Skeleton className="w-24 h-3 rounded-md" />
                  <Skeleton className="w-16 h-4 rounded-md" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-24 h-8 rounded-xl" />
                  <Skeleton className="w-8 h-8 rounded-xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar Skeleton */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4 shadow-2xs">
            <Skeleton className="w-32 h-5 rounded-lg" />
            <div className="space-y-3 pt-2">
              <div className="flex justify-between">
                <Skeleton className="w-20 h-4 rounded-md" />
                <Skeleton className="w-16 h-4 rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="w-24 h-4 rounded-md" />
                <Skeleton className="w-16 h-4 rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="w-16 h-4 rounded-md" />
                <Skeleton className="w-16 h-4 rounded-md" />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-24 h-6 rounded-md" />
            </div>
            <Skeleton className="w-full h-11 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Category Page Skeleton
 */
export function CategorySkeleton() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Banner Skeleton */}
      <div className="bg-[#0B0F19] text-white py-14 px-4">
        <div className="max-w-7xl mx-auto space-y-3">
          <Skeleton className="w-32 h-4 rounded-md bg-slate-800" />
          <Skeleton className="w-64 h-9 rounded-xl bg-slate-800" />
          <Skeleton className="w-96 h-4 rounded-md bg-slate-800" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Filter bar Skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 mb-8 flex items-center justify-between shadow-2xs">
          <Skeleton className="w-28 h-7 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="w-24 h-7 rounded-lg" />
            <Skeleton className="w-24 h-7 rounded-lg" />
          </div>
        </div>

        {/* Product Grid */}
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}

/**
 * Track Order Page Skeleton
 */
export function TrackOrderSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="w-48 h-8 rounded-xl mx-auto" />
          <Skeleton className="w-80 h-4 rounded-md mx-auto" />
        </div>

        {/* Search input card skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
          <Skeleton className="w-full h-11 rounded-xl" />
        </div>

        {/* Status Tracker Stepper skeleton */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs">
          <div className="flex justify-between items-center">
            <Skeleton className="w-32 h-5 rounded-md" />
            <Skeleton className="w-24 h-6 rounded-full" />
          </div>
          <div className="grid grid-cols-4 gap-4 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center space-y-2">
                <Skeleton className="w-10 h-10 rounded-full mx-auto" />
                <Skeleton className="w-16 h-3 rounded-md mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Branded Full Page or Container Loader with MyPrintHub Monogram
 */
export function BrandedPageLoader({ text = "Loading MyPrintHub..." }: { text?: string }) {
  return (
    <div className="min-h-[55vh] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
      <div className="relative mb-5">
        {/* Outer glowing pulsing ring */}
        <div className="w-16 h-16 rounded-2xl bg-[#FF4D36]/15 animate-ping absolute inset-0 -m-1" />
        
        {/* Center Logo Box */}
        <div className="relative w-16 h-16 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-center font-black text-xl shadow-lg border border-slate-800">
          <span className="bg-gradient-to-tr from-[#FF4D36] to-white bg-clip-text text-transparent">
            MP
          </span>
          {/* Subtle spinning accent border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-[#FF4D36] animate-spin" />
        </div>
      </div>

      <p className="text-sm font-bold text-[#0B0F19] tracking-tight">{text}</p>
      <p className="text-xs text-slate-400 mt-1">Direct Factory Printing • Ranchi Studio</p>
    </div>
  );
}
