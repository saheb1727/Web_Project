"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Tag, Sparkles, Star } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matched = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    setResults(matched);
  }, [query]);

  if (!isOpen) return null;

  const popularSearches = [
    "Magnetic Badges",
    "Cotton T-Shirts",
    "Fleece Hoodies",
    "Embroidered Caps",
    "Coffee Mugs",
    "Lanyards",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search custom t-shirts, magnetic badges, hoodies, mugs..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 bg-slate-200 hover:bg-slate-300 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags when query is empty */}
        {!query && (
          <div className="p-6">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#F95738]" />
              Popular Searches
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-[#F95738]/10 hover:text-[#F95738] text-slate-700 rounded-lg transition-colors border border-slate-200/60"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="text-xs text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Tip: You can order sample prototypes with zero minimum quantity.</span>
                </span>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="text-[#F95738] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  View All Products <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 divide-y divide-slate-100">
            {results.length > 0 ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-[#F95738] uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h5 className="text-sm font-semibold text-slate-900 truncate group-hover:text-[#1E1B4B]">
                      {product.name}
                    </h5>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-bold text-[#1E1B4B]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                        <span>{product.rating}</span>
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#F95738] group-hover:translate-x-1 transition-all" />
                </Link>
              ))
            ) : (
              <div className="py-12 text-center text-slate-500">
                <p className="text-sm">No custom products found matching &quot;{query}&quot;</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try searching for &quot;T-Shirts&quot;, &quot;Badges&quot;, or &quot;Hoodies&quot;
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

