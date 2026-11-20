"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product,
      quantity: 1,
      selectedColor: product.colors[0]?.name,
      selectedSize: product.sizes ? product.sizes[0] : undefined,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-400 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image & Badges */}
      <Link href={`/products/${product.id}`} className="relative aspect-square w-full bg-slate-50 overflow-hidden block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 z-10">
          {product.badgeText && (
            <span className="px-2 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-wide uppercase bg-[#0B0F19] text-white rounded-md shadow-sm">
              {product.badgeText}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold tracking-wide bg-[#FF4D36] text-white rounded-md shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-xl backdrop-blur-md transition-all z-10 cursor-pointer ${
            inWishlist
              ? "bg-[#FF4D36] text-white shadow-md"
              : "bg-white/80 hover:bg-white text-slate-600 hover:text-[#FF4D36] shadow-xs"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? "fill-white" : ""}`} />
        </button>

        {/* Customizable Badge */}
        {product.customizable && (
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 z-10 bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FF4D36]" />
            <span className="hidden xs:inline">Customizable</span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[#FF4D36] font-semibold uppercase tracking-wider text-[9px] sm:text-[11px] truncate max-w-[100px]">
              {product.category}
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 font-bold text-[10px] sm:text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal hidden sm:inline">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-slate-900 group-hover:text-[#FF4D36] text-xs sm:text-sm md:text-base line-clamp-2 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-1 sm:gap-2">
          <div>
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-sm sm:text-lg font-black text-[#0B0F19]">
                ₹{product.price}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                ₹{product.originalPrice}
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-emerald-600 font-bold truncate max-w-[100px] xs:max-w-none">
              From ₹{product.tieredPricing[product.tieredPricing.length - 1]?.price || product.price} bulk
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-1.5 sm:p-2.5 bg-slate-100 hover:bg-[#0B0F19] text-slate-700 hover:text-white rounded-lg sm:rounded-xl transition-all shadow-xs group-hover:bg-[#FF4D36] group-hover:text-white cursor-pointer shrink-0"
            title="Quick Add to Cart"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
