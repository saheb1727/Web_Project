"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Star,
  CornerDownLeft,
  IdCard,
  Shirt,
  Flame,
  Award,
} from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [results, setResults] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Category filter tabs
  const categoryFilters = [
    { label: "All", value: "all" },
    { label: "Badges", value: "Magnetic Badges" },
    { label: "T-Shirts", value: "T-Shirts & Polos" },
    { label: "Hoodies", value: "Hoodies & Sweatshirts" },
    { label: "Caps", value: "Caps & Headwear" },
    { label: "Corporate", value: "Corporate Kits & ID Cards" },
  ];

  const trendingTags = [
    "Magnetic Badges",
    "Cotton Polo T-Shirts",
    "Fleece Hoodies",
    "Embroidered Caps",
    "Satin Lanyards",
    "Ceramic Mugs",
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      setSelectedIndex(-1);
    } else {
      document.body.style.overflow = "auto";
      setQuery("");
      setResults([]);
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

  // Live search filtering with category tab support
  useEffect(() => {
    if (!query.trim() && selectedCategory === "all") {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    const q = query.toLowerCase().trim();
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (q) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.features && p.features.some((f) => f.toLowerCase().includes(q)))
      );
    }

    setResults(filtered);
    setSelectedIndex(-1);
  }, [query, selectedCategory]);

  // Keyboard navigation through results
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      router.push(`/products/${results[selectedIndex].id}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-slate-950/65 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-soft)] flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-[#F95738]" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search custom badges, tees, hoodies, caps..."
              className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-sm sm:text-base font-semibold focus:outline-none"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 text-[11px] font-mono font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-200 transition-colors shadow-2xs shrink-0 cursor-pointer"
              title="Close modal (Esc)"
            >
              ESC
            </button>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 overflow-x-auto scrollbar-none pb-0.5">
            {categoryFilters.map((tab) => {
              const isActive = selectedCategory === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSelectedCategory(tab.value)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#1E1B4B] text-white shadow-2xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto">
          {/* State 1: Discovery Skeleton (Empty Query) */}
          {!query && selectedCategory === "all" ? (
            <div className="p-4 sm:p-6 space-y-6">
              {/* Quick Category Discovery Tiles */}
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-extrabold text-[#1E1B4B] uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#F95738]" />
                    Featured Categories
                  </span>
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="text-[#F95738] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    View All <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {categories.slice(0, 4).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={onClose}
                      className="group p-3 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-3"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-200/70">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="48px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate group-hover:text-[#F95738] transition-colors">
                          {cat.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                          {cat.itemCount}+ designs
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Trending Searches Tags */}
              <div>
                <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#F95738]" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-[#F95738]/10 hover:text-[#F95738] hover:border-[#F95738]/30 text-slate-700 rounded-xl transition-all border border-slate-200/80 shadow-2xs active:scale-95 cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pro Tip Callout */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 flex items-center gap-3 text-xs text-amber-900">
                <Sparkles className="w-4 h-4 text-[#F95738] shrink-0" />
                <span className="font-medium">
                  <strong>Zero Minimum Orders:</strong> Order 1 sample piece to inspect print quality before bulk ordering.
                </span>
              </div>
            </div>
          ) : (
            /* State 2: Live Results List Skeleton */
            <div className="p-3 divide-y divide-slate-100">
              {results.length > 0 ? (
                <>
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Found {results.length} {results.length === 1 ? "product" : "products"}
                  </div>
                  {results.map((product, idx) => {
                    const isKeyboardSelected = selectedIndex === idx;
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={onClose}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center gap-3.5 p-3 rounded-xl transition-all group ${
                          isKeyboardSelected
                            ? "bg-slate-100/90 shadow-2xs"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80 shadow-2xs">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="56px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] font-bold text-[#F95738] uppercase tracking-wider">
                            {product.category}
                          </div>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-[#1E1B4B]">
                            {product.name}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sm font-black text-[#1E1B4B]">
                              ₹{product.price}
                            </span>
                            <span className="text-xs text-slate-400 line-through">
                              ₹{product.originalPrice}
                            </span>
                            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                              <span>{product.rating}</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {isKeyboardSelected && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                              <span>Press</span>
                              <CornerDownLeft className="w-3 h-3" />
                            </span>
                          )}
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-[#F95738] group-hover:border-[#F95738]/40 transition-colors shadow-2xs">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </>
              ) : (
                <div className="py-14 text-center text-slate-500 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-slate-800">
                    No custom products found matching &quot;{query}&quot;
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Try searching for &quot;T-Shirts&quot;, &quot;Magnetic Badges&quot;, or &quot;Hoodies&quot;
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setSelectedCategory("all");
                    }}
                    className="mt-2 text-xs font-bold text-[#F95738] hover:underline cursor-pointer"
                  >
                    Clear search and explore categories
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Command Palette Keyboard Hints Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] shadow-2xs">
                ↑↓
              </kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] shadow-2xs">
                ↵
              </kbd>
              <span>to open</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] shadow-2xs">
                esc
              </kbd>
              <span>to close</span>
            </span>
          </div>

          <Link
            href="/products"
            onClick={onClose}
            className="text-[#F95738] font-bold hover:underline flex items-center gap-1 ml-auto"
          >
            <span>Browse Complete Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
