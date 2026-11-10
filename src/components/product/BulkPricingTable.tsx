"use client";

import React from "react";
import { TieredPrice } from "@/types";
import { Check, Sparkles } from "lucide-react";

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
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <Sparkles className="w-3.5 h-3.5 text-[#F95738]" />
          <span>Wholesale Volume Discounts</span>
        </div>
        <span className="text-[11px] font-semibold text-[#F95738] bg-[#F95738]/10 px-2 py-0.5 rounded-full">
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
              className={`p-3 rounded-xl border text-left transition-all duration-150 relative active:scale-97 cursor-pointer ${
                isActive
                  ? "bg-white border-[#1E1B4B] shadow-sm ring-2 ring-[#1E1B4B]/15"
                  : "bg-slate-50/70 hover:bg-white text-slate-700 border-slate-200/80 hover:border-slate-300"
              }`}
            >
              {isActive && (
                <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
              <div className="text-[11px] font-semibold text-slate-500">
                {label}
              </div>
              <div className="text-base font-black text-[#1E1B4B] mt-0.5 leading-tight flex items-baseline gap-0.5">
                <span>₹{tier.price}</span>
                <span className="text-[10px] font-normal text-slate-400">/pc</span>
              </div>
              <div
                className={`text-[10px] font-bold mt-1 inline-block ${
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

export default BulkPricingTable;
