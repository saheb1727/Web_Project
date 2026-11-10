"use client";

import React, { useState, useMemo } from "react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Package,
} from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "all" || p.categorySlug === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = p.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "popular") return b.reviewsCount - a.reviewsCount;
        return 0; // featured default
      });
  }, [selectedCategory, searchQuery, sortBy, maxPrice]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("featured");
    setMaxPrice(1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider mb-1">
            Complete Catalog
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--color-primary)] tracking-tight">
            All Custom Merchandise
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Explore our industrial-grade custom products. Zero minimum order quantities, instant online mockup previews, and bulk tiered discounts.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, fabric, specs..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto max-w-xl scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[var(--color-primary)] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === c.slug
                    ? "bg-[var(--color-primary)] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Right Sort Controls */}
          <div className="w-full md:w-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-[var(--color-primary)] cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className="lg:hidden p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterDrawerOpen && (
          <div className="lg:hidden mb-6 p-5 bg-white rounded-2xl border border-slate-200 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-bold text-sm text-[var(--color-primary)]">Filter Products</span>
              <button
                onClick={resetFilters}
                className="text-xs text-[var(--color-accent)] font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="all">All Categories ({products.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Max Price</span>
                <span>₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "var(--color-accent)" }}
              />
            </div>
          </div>
        )}

        {/* Product Count & Active Filters Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-bold text-slate-500">
            Showing <strong className="text-[var(--color-primary)]">{filteredProducts.length}</strong> products
          </div>

          {(selectedCategory !== "all" || searchQuery || maxPrice < 1000) && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-[var(--color-accent)] hover:opacity-85 flex items-center gap-1 transition-opacity cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1">
              No matching merchandise found
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Try adjusting your search query, price limit, or category filter to discover more products.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[var(--color-primary)] hover:opacity-90 text-white text-xs font-bold rounded-xl shadow-md transition-opacity cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
