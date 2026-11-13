"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

interface ProductOption {
  id: string;
  name: string;
  basePrice: number;
  tiers: { minQty: number; maxQty: number; price: number; discount: number }[];
  slug: string;
}

export const VolumeDiscountCalculator: React.FC = () => {
  const products: ProductOption[] = [
    {
      id: "badges",
      name: "Magnetic Badges",
      basePrice: 89,
      slug: "magnetic-badges",
      tiers: [
        { minQty: 10, maxQty: 49, price: 49, discount: 45 },
        { minQty: 50, maxQty: 199, price: 35, discount: 60 },
        { minQty: 200, maxQty: 499, price: 28, discount: 68 },
        { minQty: 500, maxQty: 1000, price: 22, discount: 75 },
      ],
    },
    {
      id: "tshirts",
      name: "Custom T-Shirts",
      basePrice: 449,
      slug: "custom-t-shirts",
      tiers: [
        { minQty: 10, maxQty: 49, price: 249, discount: 44 },
        { minQty: 50, maxQty: 199, price: 199, discount: 55 },
        { minQty: 200, maxQty: 499, price: 169, discount: 62 },
        { minQty: 500, maxQty: 1000, price: 149, discount: 67 },
      ],
    },
    {
      id: "hoodies",
      name: "Winter Hoodies",
      basePrice: 1299,
      slug: "hoodies-sweatshirts",
      tiers: [
        { minQty: 10, maxQty: 49, price: 799, discount: 38 },
        { minQty: 50, maxQty: 199, price: 699, discount: 46 },
        { minQty: 200, maxQty: 499, price: 599, discount: 54 },
        { minQty: 500, maxQty: 1000, price: 549, discount: 58 },
      ],
    },
    {
      id: "caps",
      name: "Embroidered Caps",
      basePrice: 299,
      slug: "custom-caps",
      tiers: [
        { minQty: 10, maxQty: 49, price: 179, discount: 40 },
        { minQty: 50, maxQty: 199, price: 149, discount: 50 },
        { minQty: 200, maxQty: 499, price: 129, discount: 57 },
        { minQty: 500, maxQty: 1000, price: 115, discount: 61 },
      ],
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState<ProductOption>(products[0]);
  const [quantity, setQuantity] = useState<number>(100);

  // Calculate matching tier
  const currentTier =
    selectedProduct.tiers.find(
      (t) => quantity >= t.minQty && quantity <= t.maxQty
    ) || selectedProduct.tiers[selectedProduct.tiers.length - 1];

  const unitPrice = currentTier.price;
  const originalTotal = selectedProduct.basePrice * quantity;
  const discountedTotal = unitPrice * quantity;
  const totalSaved = originalTotal - discountedTotal;
  const savingsPercent = Math.round((totalSaved / originalTotal) * 100);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-indigo-50/20 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F95738]/10 text-[#F95738] text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Direct Factory Wholesale Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
            Interactive Bulk Savings Calculator
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Scale your team order and watch unit costs drop automatically. No middlemen, no negotiation required.
          </p>
        </div>

        {/* Calculator Interactive Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Product Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-100 bg-slate-50/70 p-2 gap-1.5">
            {products.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProduct(p)}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedProduct.id === p.id
                    ? "bg-white text-[#1E1B4B] shadow-sm border border-slate-200/90"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Sliders & Controls (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Select Order Quantity
                  </span>
                  <span className="text-xl font-black text-[#1E1B4B]">
                    {quantity} <span className="text-xs font-semibold text-slate-400">units</span>
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="5"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#F95738]"
                />
              </div>

              {/* Quick Pick Quantity Buttons */}
              <div className="flex flex-wrap gap-2">
                {[25, 50, 100, 250, 500, 1000].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setQuantity(qty)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      quantity === qty
                        ? "bg-[#1E1B4B] text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {qty} pcs
                  </button>
                ))}
              </div>

              {/* Tier Information */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {selectedProduct.tiers.map((tier, idx) => {
                  const isActive = quantity >= tier.minQty && quantity <= tier.maxQty;
                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isActive
                          ? "bg-[#F95738]/5 border-[#F95738] ring-1 ring-[#F95738]"
                          : "bg-slate-50 border-slate-200/70"
                      }`}
                    >
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        {tier.minQty}-{tier.maxQty} pcs
                      </div>
                      <div className="text-xs font-black text-[#1E1B4B] mt-0.5">
                        ₹{tier.price}/pc
                      </div>
                      <span className="text-[9px] font-bold text-emerald-600 block mt-0.5">
                        {tier.discount}% Off
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Quality Proof Tag */}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Includes free digital vector proof & custom Pantone check before print</span>
              </div>
            </div>

            {/* Right Column: Price Output Card (5 cols) */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#1E1B4B] to-[#110E38] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-5">
              
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 pb-3 border-b border-white/10">
                  <span>Unit Wholesale Price</span>
                  <div className="flex items-center gap-1.5">
                    <span className="line-through text-slate-400 text-xs">
                      ₹{selectedProduct.basePrice}
                    </span>
                    <span className="text-base font-extrabold text-[#F95738]">
                      ₹{unitPrice}
                    </span>
                    <span className="text-[10px] text-slate-400">/ pc</span>
                  </div>
                </div>

                <div className="py-4 space-y-1">
                  <div className="text-xs text-slate-300 font-medium">Estimated Order Total</div>
                  <div className="text-3xl font-black text-white tracking-tight">
                    ₹{discountedTotal.toLocaleString("en-IN")}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-bold mt-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>You save ₹{totalSaved.toLocaleString("en-IN")} ({savingsPercent}%)</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 text-[11px] text-slate-300">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#F95738]" />
                    <span>Free BlueDart Express Air Pan-India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>GST Tax Invoice with Input Tax Credit</span>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <Link
                href={`/category/${selectedProduct.slug}`}
                className="w-full py-3 bg-[#F95738] hover:bg-[#e04526] text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Customize {selectedProduct.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

