"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, SlidersHorizontal, ArrowLeft, Package } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params?.category as string;
  const [sortBy, setSortBy] = useState("featured");

  const category = categories.find((c) => c.slug === categorySlug);

  const categoryProducts = useMemo(() => {
    const list = products.filter((p) => p.categorySlug === categorySlug);
    return list.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [categorySlug, sortBy]);

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-[#1E1B4B] mb-2">Category Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">The requested category does not exist.</p>
        <Link
          href="/products"
          className="px-6 py-2.5 bg-[#F95738] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#E03A1B]"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Category Hero Banner */}
      <div className="relative bg-[#1E1B4B] text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="100vw"
            className="object-cover blur-xs"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-white">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-white">{category.name}</span>
          </nav>

          <div className="max-w-2xl">
            {category.badge && (
              <span className="inline-block px-3 py-1 rounded-full bg-[#F95738] text-white text-xs font-bold uppercase tracking-wider mb-3">
                {category.badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Controls & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-bold text-slate-600">
            Showing <strong className="text-[#1E1B4B]">{categoryProducts.length}</strong> items in{" "}
            {category.name}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-[#1E1B4B]"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#1E1B4B] mb-1">
              No products found in this category yet
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Check out our complete merchandise catalog.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F95738] text-white text-xs font-bold rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Products</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

