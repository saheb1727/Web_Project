"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag, ArrowRight, Star } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product: (typeof products)[0]) => {
    addToCart({
      product,
      quantity: 1,
      selectedColor: product.colors[0]?.name,
      selectedSize: product.sizes ? product.sizes[0] : undefined,
    });
    toggleWishlist(product.id);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F95738] uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-[#F95738]" />
            <span>Saved Merchandise</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
            My Wishlist ({wishlistProducts.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep track of your favorite custom products and order prototypes whenever you are ready.
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id, product.name)}
                      className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-red-500 rounded-xl shadow-xs transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#F95738] font-bold uppercase tracking-wider text-[10px]">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-bold text-sm text-[#1E1B4B] hover:text-[#F95738] transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-black text-[#1E1B4B]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Move to Cart button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-2.5 bg-[#1E1B4B] hover:bg-[#110E38] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 group"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#F95738]" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 max-w-md mx-auto my-12 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-400 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-[#1E1B4B] mb-1">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
              Tap the heart icon on any product to save it here for later.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E1B4B] hover:bg-[#110E38] text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F95738]" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

