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
    <div className="bg-slate-50 rounded-2xl p-3 sm:p-4 border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-[#F95738]" />
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            Wholesale Volume Tiers
          </h4>
        </div>
        <span className="text-[10px] sm:text-xs text-[#F95738] font-bold bg-[#F95738]/10 px-2 py-0.5 rounded-md">
          Save Up To 55%
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tieredPricing.map((tier, idx) => {
          const isActive =
            currentQuantity >= tier.minQty &&
            (tier.maxQty === null || currentQuantity <= tier.maxQty);

          const label = tier.maxQty ? `${tier.minQty}–${tier.maxQty} pcs` : `${tier.minQty}+ pcs`;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectTier && onSelectTier(tier.minQty)}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all relative active:scale-98 cursor-pointer ${
                isActive
                  ? "bg-[#1E1B4B] text-white border-[#1E1B4B] shadow-md ring-2 ring-[#F95738]/40"
                  : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
              }`}
            >
              {isActive && (
                <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-md bg-[#F95738] flex items-center justify-center text-white">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
              <div
                className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                  isActive ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {label}
              </div>
              <div className="text-sm sm:text-base font-black mt-0.5 leading-tight">
                ₹{tier.price}
                <span className={`text-[10px] font-normal ml-0.5 ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                  /pc
                </span>
              </div>
              <div
                className={`text-[9px] sm:text-[10px] font-bold mt-0.5 ${
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
