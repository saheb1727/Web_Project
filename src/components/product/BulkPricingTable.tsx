"use client";

import React from "react";
import { TieredPrice } from "@/types";
import { Check, Tag } from "lucide-react";

interface BulkPricingTableProps {
  tieredPricing: TieredPrice[];
  currentQuantity: number;
  onSelectTier?: (minQty: number) => void;
}

export const BulkPricingTable: React.FC<BulkPricingTableProps> = ({
  tieredPricing,
  currentQuantity,
  onSelectTier,
}) => {
  if (!tieredPricing || tieredPricing.length === 0) return null;

  return (
    <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#F95738]" />
          <h4 className="text-sm font-bold text-slate-900">
            Tiered Wholesale Pricing
          </h4>
        </div>
        <span className="text-xs text-[#F95738] font-bold bg-[#F95738]/10 px-2.5 py-0.5 rounded-md">
          Instant Bulk Discounts
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {tieredPricing.map((tier, idx) => {
          const isActive =
            currentQuantity >= tier.minQty &&
            (tier.maxQty === null || currentQuantity <= tier.maxQty);

          const label = tier.maxQty ? `${tier.minQty} - ${tier.maxQty} pcs` : `${tier.minQty}+ pcs`;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectTier && onSelectTier(tier.minQty)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                isActive
                  ? "bg-[#1E1B4B] text-white border-[#1E1B4B] shadow-md ring-2 ring-[#F95738]/40"
                  : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
              }`}
            >
              {isActive && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-md bg-[#F95738] flex items-center justify-center text-white">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
              <div
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  isActive ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {label}
              </div>
              <div className="text-base sm:text-lg font-black mt-1">
                ₹{tier.price}
                <span className={`text-[11px] font-normal ml-0.5 ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                  /pc
                </span>
              </div>
              <div
                className={`text-[10px] font-bold mt-0.5 ${
                  isActive ? "text-[#F95738]" : "text-emerald-600"
                }`}
              >
                {tier.savings}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

