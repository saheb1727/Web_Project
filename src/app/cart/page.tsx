"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle2,
  X,
  CreditCard,
  Building,
  Smartphone,
  Sparkles,
  Package,
  MapPin,
  Loader2,
} from "lucide-react";
import { lookupOfflinePincode } from "@/lib/pincode";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/AuthContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    coupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    freeShippingRemaining,
  } = useCart();

  const { showToast } = useToast();
  const { user, addOrderToHistory } = useAuth();
  const [couponInput, setCouponInput] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  useBodyScrollLock(isCheckoutOpen);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "loading" | "detected" | "error">("idle");
  const [detectedLocation, setDetectedLocation] = useState<string>("");

  // Checkout form state (prefilled from Auth if available)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "upi",
  });

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const clean = rawVal.replace(/\D/g, "").slice(0, 6);
    
    setFormData((prev) => ({ ...prev, pincode: clean }));

    if (clean.length === 6) {
      // 1. Instant offline resolution for 0-latency feedback
      const offline = lookupOfflinePincode(clean);
      if (offline) {
        setFormData((prev) => ({
          ...prev,
          city: offline.city,
          state: offline.state,
        }));
        setDetectedLocation(`${offline.city}, ${offline.state}`);
        setPincodeStatus("detected");
      } else {
        setPincodeStatus("loading");
      }

      // 2. Query server endpoint for fine-grained district or postal area
      try {
        const res = await fetch(`/api/pincode/${clean}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.city && data.state) {
            setFormData((prev) => ({
              ...prev,
              city: data.city,
              state: data.state,
            }));
            setDetectedLocation(`${data.city}, ${data.state}`);
            setPincodeStatus("detected");
          }
        }
      } catch {
        // Keep offline detection if network is disconnected
      }
    } else {
      setPincodeStatus("idle");
      setDetectedLocation("");
    }
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name,
        email: prev.email || user.email,
        phone: prev.phone || user.phone,
        address: prev.address || user.savedAddress?.address || "",
        city: prev.city || user.savedAddress?.city || "",
        state: prev.state || user.savedAddress?.state || "",
        pincode: prev.pincode || user.savedAddress?.pincode || "",
      }));
    }
  }, [user]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput("");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      showToast("Please fill in all mandatory delivery fields", "error");
      return;
    }

    setIsSubmitting(true);
    const fallbackOrderId = `MPH-${Math.floor(100000 + Math.random() * 900000)}`;
    let finalOrderId = fallbackOrderId;

    try {
      // 1. Post to MongoDB Orders API
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          },
          shippingAddress: {
            address: formData.address,
            city: formData.city || "Ranchi",
            state: formData.state || "Jharkhand",
            pincode: formData.pincode,
          },
          items: items.map((it) => ({
            productId: it.product.id,
            name: it.product.name,
            image: it.product.image,
            category: it.product.category,
            unitPrice: it.unitPrice,
            quantity: it.quantity,
            selectedColor: it.selectedColor,
            selectedSize: it.selectedSize,
            customText: it.customText,
            customImage: it.customImage,
          })),
          subtotal,
          discount,
          shipping,
          total,
          couponCode: coupon?.code,
          paymentMethod: formData.paymentMethod,
        }),
      });

      if (res.ok) {
        const text = await res.text();
        if (text && text.trim().length > 0) {
          const data = JSON.parse(text);
          if (data?.order?.orderId) {
            finalOrderId = data.order.orderId;
          }
        }
      }
    } catch {
      // Fallback
    }

    // 2. Add to user order history in context & localStorage
    addOrderToHistory({
      orderId: finalOrderId,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      total,
      itemsCount: items.reduce((acc, i) => acc + i.quantity, 0),
      itemsSummary: `${items[0]?.product.name || "Custom Merchandise"}${items.length > 1 ? ` + ${items.length - 1} more items` : ""}`,
      status: "Order Placed & Confirmed",
      paymentMethod: formData.paymentMethod.toUpperCase(),
    });

    setOrderId(finalOrderId);
    setIsOrderPlaced(true);
    setIsSubmitting(false);
    clearCart();

    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#1E1B4B", "#F95738", "#10B981", "#FFD700"],
      });
    } catch {
      // ignore
    }

    showToast(`Order #${finalOrderId} placed successfully!`, "success");
  };

  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1E1B4B] tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review your custom merchandise items, applied discounts, and tiered volume savings.
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Cart Items (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free shipping progress alert */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-[#1E1B4B]">
                    <Truck className="w-4 h-4 text-[#F95738]" />
                    {freeShippingRemaining === 0 ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Congratulations! You&apos;ve unlocked FREE Pan-India Shipping!</span>
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#F95738]">₹{freeShippingRemaining}</strong> more to get FREE Express Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-slate-400">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
                {items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      {item.customImage && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2">
                          <span className="text-[10px] font-bold text-white bg-[#F95738] px-1.5 py-0.5 rounded-md">
                            Custom Logo
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#F95738] uppercase tracking-wider">
                        {item.product.category}
                      </span>
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="text-sm sm:text-base font-bold text-[#1E1B4B] hover:text-[#F95738] transition-colors truncate">
                          {item.product.name}
                        </h3>
                      </Link>

                      {/* Options & Customization Info */}
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                        {item.selectedColor && (
                          <span className="bg-slate-100 px-2.5 py-0.5 rounded-lg font-medium text-slate-700">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="bg-slate-100 px-2.5 py-0.5 rounded-lg font-medium text-slate-700">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.customText && (
                          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-lg font-semibold truncate max-w-xs">
                            Text: &quot;{item.customText}&quot;
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-[#1E1B4B] mt-2">
                        Unit Price: <span className="font-bold">₹{item.unitPrice}</span>
                      </div>
                    </div>

                    {/* Quantity Controls & Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      {/* Quantity */}
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center font-bold text-xs text-[#1E1B4B]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-20">
                        <div className="text-base font-black text-[#1E1B4B]">
                          ₹{(item.unitPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/products"
                  className="text-xs font-bold text-[#F95738] hover:underline flex items-center gap-1"
                >
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors"
                >
                  Empty Entire Cart
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Coupon Form */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Tag className="w-4 h-4 text-[#F95738]" />
                  <span>Have a Promo Code?</span>
                </div>

                {coupon ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Code {coupon.code} Applied</span>
                      </div>
                      <div className="text-[11px] text-emerald-600 font-medium">
                        {coupon.description}
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove coupon"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Try: PRINT15 or BULK25"
                      className="flex-1 px-3.5 py-2.5 text-xs uppercase bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1E1B4B] focus:bg-white transition-all"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#1E1B4B] hover:bg-[#110E38] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Order Calculation */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base font-black text-[#1E1B4B] border-b border-slate-100 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Coupon Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>Pan-India Express Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <strong className="text-emerald-600 font-bold">FREE</strong>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-500">
                    <span>GST (Included)</span>
                    <span>₹0 (Inclusive)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
                      Total Payable
                    </span>
                    <span className="text-2xl font-black text-[#1E1B4B]">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold">
                    Secure 256-Bit SSL
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 bg-[#F95738] hover:bg-[#E03A1B] text-white font-bold rounded-xl shadow-lg shadow-[#F95738]/25 transition-all flex items-center justify-center gap-2 text-sm active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Proceed to Checkout</span>
                </button>

                <div className="pt-2 text-center text-[10px] text-slate-400">
                  Accepting UPI, Debit/Credit Cards, NetBanking, and Corporate POs.
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 max-w-lg mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-[#1E1B4B] mb-2">
              Your cart is empty
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-sm mx-auto">
              Looks like you haven&apos;t added any custom merchandise to your cart yet. Explore our bestsellers and magnetic badges!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F95738] hover:bg-[#E03A1B] text-white font-bold rounded-xl shadow-lg shadow-[#F95738]/20 transition-all text-sm cursor-pointer"
            >
              <span>Explore Custom Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[120] overflow-y-auto bg-black/70 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          {/* Backdrop click to dismiss */}
          <div
            className="fixed inset-0"
            onClick={() => setIsCheckoutOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden max-h-[calc(100dvh-2rem)] sm:max-h-[88vh] flex flex-col my-auto z-10 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0B0F19] text-[#FF4D36] flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  MPH
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#0B0F19]">Express Doorstep Checkout</h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Order Total: <strong className="text-slate-900 font-bold">₹{total.toLocaleString()}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close checkout modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            {isOrderPlaced ? (
              <div className="p-6 sm:p-8 text-center space-y-4 my-auto">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#0B0F19]">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName || "Customer"}</strong>! Your official tracking order number is{" "}
                  <span className="font-mono font-bold text-[#FF4D36] bg-[#FF4D36]/10 px-2.5 py-0.5 rounded-lg">
                    {orderId}
                  </span>
                  . Saved in your account history and queued for digital vector proof verification.
                </p>

                {/* Direct Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href={`/track?orderId=${orderId}`}
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsOrderPlaced(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#FF4D36] hover:bg-[#E03A1B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-[#FF4D36]/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <Package className="w-4 h-4" />
                    <span>Track Order #{orderId}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/auth"
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsOrderPlaced(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#0B0F19] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>View in Account</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF4D36] focus:bg-white focus:ring-2 focus:ring-[#FF4D36]/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF4D36] focus:bg-white focus:ring-2 focus:ring-[#FF4D36]/15 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@company.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF4D36] focus:bg-white focus:ring-2 focus:ring-[#FF4D36]/15 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Office / Flat / Building, Street, Area"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF4D36] focus:bg-white focus:ring-2 focus:ring-[#FF4D36]/15 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700">PIN Code *</label>
                      {pincodeStatus === "loading" && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Loader2 className="w-2.5 h-2.5 animate-spin text-[#FF4D36]" />
                          Detecting...
                        </span>
                      )}
                      {pincodeStatus === "detected" && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          Auto-detected
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handlePincodeChange}
                        placeholder="834001"
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border rounded-xl focus:outline-none focus:bg-white focus:ring-2 transition-all font-semibold ${
                          pincodeStatus === "detected"
                            ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/15 text-slate-900"
                            : "border-slate-200 focus:border-[#FF4D36] focus:ring-[#FF4D36]/15 text-slate-900"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Ranchi"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF4D36] focus:bg-white focus:ring-2 focus:ring-[#FF4D36]/15 transition-all text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Jharkhand"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF4D36] focus:bg-white focus:ring-2 focus:ring-[#FF4D36]/15 transition-all text-slate-900"
                    />
                  </div>
                </div>

                {/* Auto-detected notification banner */}
                {detectedLocation && (
                  <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-800 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      Detected Delivery Region: <strong>{detectedLocation}</strong>
                    </span>
                  </div>
                )}

                {/* Payment Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Payment Option
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: "upi", label: "Instant UPI / QR", icon: Smartphone },
                      { id: "card", label: "Cards / NetBanking", icon: CreditCard },
                      { id: "cod", label: "Cash on Delivery", icon: Building },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = formData.paymentMethod === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: opt.id })}
                          className={`p-3.5 rounded-xl border-2 text-left flex sm:flex-col justify-between sm:justify-center items-center sm:items-start gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#0B0F19] text-white border-[#0B0F19] shadow-sm"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2 sm:block">
                            <Icon className={`w-4 h-4 sm:mb-2 ${isSelected ? "text-[#FF4D36]" : "text-slate-500"}`} />
                            <span className="text-xs font-bold">{opt.label}</span>
                          </div>
                          {isSelected && (
                            <span className="sm:hidden text-[10px] bg-[#FF4D36] text-white font-bold px-2 py-0.5 rounded-full">
                              Selected
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 sm:pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
                  <div className="text-xs text-slate-500 flex sm:flex-col justify-between sm:justify-start items-baseline">
                    <span className="text-[11px] font-medium text-slate-400">Total Payable</span>
                    <strong className="text-base sm:text-lg font-black text-[#0B0F19]">₹{total.toLocaleString()}</strong>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3.5 bg-[#FF4D36] hover:bg-[#E03A1B] text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-[#FF4D36]/25 transition-all disabled:opacity-50 cursor-pointer active:scale-98 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Processing Order..." : "Confirm & Place Order →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

