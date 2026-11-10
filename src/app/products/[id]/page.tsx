"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Share2,
  Plus,
  Minus,
  ArrowRight,
  Info,
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { BulkPricingTable } from "@/components/product/BulkPricingTable";
import { ProductCustomizer } from "@/components/product/ProductCustomizer";
import { ProductCard } from "@/components/product/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const productId = params?.id as string;
  const product = products.find((p) => p.id === productId);

  // States
  const [selectedImage, setSelectedImage] = useState<string>(product?.image || "");
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes ? product.sizes[0] : "");
  const [quantity, setQuantity] = useState<number>(product?.minQuantity || 1);
  const [customImage, setCustomImage] = useState<string | undefined>(undefined);
  const [customText, setCustomText] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "shipping">("features");

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-[#1E1B4B] mb-2">Product Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">The requested product could not be found.</p>
        <Link
          href="/products"
          className="px-6 py-2.5 bg-[#F95738] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#E03A1B]"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  // Calculate dynamic unit price based on tiered bulk pricing
  const unitPrice = useMemo(() => {
    if (!product.tieredPricing || product.tieredPricing.length === 0) return product.price;
    const tier = product.tieredPricing.find(
      (t) => quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
    );
    return tier ? tier.price : product.price;
  }, [product, quantity]);

  const totalPrice = unitPrice * quantity;
  const standardPrice = product.originalPrice * quantity;
  const totalSavings = standardPrice - totalPrice;
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      selectedColor,
      selectedSize: selectedSize || undefined,
      customText,
      customImage,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!", "success");
    }
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#1E1B4B]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-[#1E1B4B]">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/category/${product.categorySlug}`} className="hover:text-[#1E1B4B]">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Active Image Display */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-md">
              <Image
                src={selectedImage || product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.badgeText && (
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#1E1B4B] text-white rounded-md shadow-md">
                    {product.badgeText}
                  </span>
                )}
                {product.isNew && (
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#F95738] text-white rounded-md shadow-md">
                    New Arrival
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id, product.name)}
                className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md transition-all shadow-md z-10 ${
                  inWishlist
                    ? "bg-[#F95738] text-white"
                    : "bg-white/80 hover:bg-white text-slate-600 hover:text-[#F95738]"
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                      (selectedImage || product.image) === img
                        ? "border-[#F95738] shadow-md ring-2 ring-[#F95738]/20"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees Box */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#F95738] shrink-0" />
                <span><strong>Print Perfection Guarantee:</strong> Free reprint if damaged or misprinted.</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#F95738] shrink-0" />
                <span><strong>Pan-India Express:</strong> Dispatches within 24-48 business hours.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Category, Rating, Share */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#F95738] uppercase tracking-wider">
                  {product.category}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1E1B4B] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-[#1E1B4B] tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-500 font-medium">
                  Based on {product.reviewsCount} verified reviews
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Ready to Print
                </span>
              </div>
            </div>

            {/* Dynamic Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-0.5">
                  Unit Price (for {quantity} {quantity === 1 ? "pc" : "pcs"})
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#1E1B4B]">
                    ₹{unitPrice}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-xs font-bold text-[#F95738] bg-[#F95738]/10 px-2 py-0.5 rounded">
                    {Math.round(((product.originalPrice - unitPrice) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-semibold block">Total Estimated Price</span>
                <span className="text-xl sm:text-2xl font-black text-[#F95738]">
                  ₹{totalPrice.toLocaleString()}
                </span>
                {totalSavings > 0 && (
                  <span className="text-[11px] text-emerald-600 font-bold block">
                    You save ₹{totalSavings.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Tiered Bulk Pricing Table */}
            <BulkPricingTable
              tieredPricing={product.tieredPricing}
              currentQuantity={quantity}
              onSelectTier={(minQty) => setQuantity(minQty)}
            />

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-2">
                  Color / Finish: <span className="text-[#F95738] font-semibold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedColor === c.name
                          ? "bg-[#1E1B4B] text-white border-[#1E1B4B] shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800">
                    Size / Dimensions: <span className="text-[#F95738] font-semibold">{selectedSize}</span>
                  </label>
                  <span className="text-[11px] text-slate-500 cursor-pointer hover:underline">
                    Size Chart Guide
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === s
                          ? "bg-[#1E1B4B] text-white border-[#1E1B4B] shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Order Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-2xs p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-center font-bold text-sm bg-transparent focus:outline-none text-[#1E1B4B]"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-xs text-slate-500">
                  Tier: <strong className="text-[#F95738]">₹{unitPrice}/pc</strong> (Increases discount automatically with volume)
                </div>
              </div>
            </div>

            {/* Interactive Live Mockup Customizer */}
            {product.customizable && (
              <ProductCustomizer
                product={product}
                selectedColorHex={
                  product.colors.find((c) => c.name === selectedColor)?.hex || "#FFFFFF"
                }
                onCustomizationChange={({ customImage, customText }) => {
                  setCustomImage(customImage);
                  setCustomText(customText);
                }}
              />
            )}

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full sm:flex-1 py-4 bg-[#F95738] hover:bg-[#E03A1B] text-white font-bold rounded-2xl shadow-lg shadow-[#F95738]/25 transition-all flex items-center justify-center gap-2 text-base active:scale-98"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add {quantity} to Cart (₹{totalPrice.toLocaleString()})</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full sm:w-auto px-8 py-4 bg-[#1E1B4B] hover:bg-[#110E38] text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-base active:scale-98"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#F95738]" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Description, Specs, Features) */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-6 border-b border-slate-100 pb-4 mb-6">
            <button
              onClick={() => setActiveTab("features")}
              className={`text-sm font-bold pb-2 transition-all relative ${
                activeTab === "features"
                  ? "text-[#1E1B4B] border-b-2 border-[#F95738]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Key Features & Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`text-sm font-bold pb-2 transition-all relative ${
                activeTab === "specs"
                  ? "text-[#1E1B4B] border-b-2 border-[#F95738]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`text-sm font-bold pb-2 transition-all relative ${
                activeTab === "shipping"
                  ? "text-[#1E1B4B] border-b-2 border-[#F95738]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Dispatch & Doorstep Delivery
            </button>
          </div>

          <div className="text-slate-700 text-sm leading-relaxed">
            {activeTab === "features" && (
              <div className="space-y-4">
                <p className="text-slate-600">{product.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-[#F95738] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="font-bold text-slate-500">Category</span>
                  <span className="font-semibold text-slate-800">{product.category}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-bold text-slate-500">Print Area</span>
                  <span className="font-semibold text-slate-800">{product.printArea || "Full Custom Face"}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-bold text-slate-500">Minimum Order</span>
                  <span className="font-semibold text-emerald-600 font-bold">{product.minQuantity} Piece (Zero MOQ)</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="font-bold text-slate-500">Customization Supported</span>
                  <span className="font-semibold text-slate-800">High-Resolution Vector Logo / Custom Text</span>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-3 text-xs text-slate-600">
                <p>
                  <strong>Production Time:</strong> 24 to 48 hours from artwork submission.
                </p>
                <p>
                  <strong>Delivery Timelines:</strong> Metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata): 2-3 business days. Rest of India: 3-5 business days.
                </p>
                <p>
                  <strong>Packaging:</strong> Shipped in shockproof eco-friendly corrugated mailer boxes to ensure 0 transit breakage.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[#1E1B4B]">
                You May Also Like
              </h2>
              <Link
                href={`/category/${product.categorySlug}`}
                className="text-xs font-bold text-[#F95738] hover:underline flex items-center gap-1"
              >
                More in {product.category} →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

