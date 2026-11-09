"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import confetti from "canvas-confetti";

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
  const [couponInput, setCouponInput] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Checkout form state
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

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
    setCouponInput("");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      showToast("Please fill in all mandatory delivery fields", "error");
      return;
    }

    const newOrderId = `MPH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setIsOrderPlaced(true);
    clearCart();

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#142344", "#FF4D24", "#10B981", "#FFD700"],
      });
    } catch {
      // ignore
    }

    showToast(`Order #${newOrderId} placed successfully!`, "success");
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
          <h1 className="text-3xl sm:text-4xl font-black text-[#142344] tracking-tight">
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
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-[#142344]">
                    <Truck className="w-4 h-4 text-[#FF4D24]" />
                    {freeShippingRemaining === 0 ? (
                      <span className="text-emerald-600">
                        🎉 Congratulations! You&apos;ve unlocked FREE Pan-India Shipping!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#FF4D24]">₹{freeShippingRemaining}</strong> more to get FREE Express Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-slate-400">{freeShippingProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-md bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF4D24] to-emerald-500 rounded-md transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
                {items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      {item.customImage && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2">
                          <span className="text-[10px] font-bold text-white bg-[#FF4D24] px-1.5 py-0.5 rounded">
                            Custom Logo
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#FF4D24] uppercase tracking-wider">
                        {item.product.category}
                      </span>
                      <Link href={`/products/${item.product.id}`}>
                        <h3 className="text-sm sm:text-base font-bold text-[#142344] hover:text-[#FF4D24] transition-colors truncate">
                          {item.product.name}
                        </h3>
                      </Link>

                      {/* Options & Customization Info */}
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                        {item.selectedColor && (
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.customText && (
                          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-md font-semibold truncate max-w-xs">
                            Text: &quot;{item.customText}&quot;
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-semibold text-[#142344] mt-2">
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
                        <span className="w-10 text-center font-bold text-xs text-[#142344]">
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
                        <div className="text-base font-black text-[#142344]">
                          ₹{(item.unitPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
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
                  className="text-xs font-bold text-[#FF4D24] hover:underline flex items-center gap-1"
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
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Tag className="w-4 h-4 text-[#FF4D24]" />
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
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
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
                      className="flex-1 px-3 py-2 text-xs uppercase bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#142344]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#142344] hover:bg-[#0D1830] text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Order Calculation */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-base font-black text-[#142344] border-b border-slate-100 pb-3">
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
                    <span className="text-2xl font-black text-[#142344]">
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
                  className="w-full py-4 bg-[#FF4D24] hover:bg-[#E03C14] text-white font-bold rounded-2xl shadow-lg shadow-[#FF4D24]/25 transition-all flex items-center justify-center gap-2 text-sm active:scale-98"
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
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 max-w-lg mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-[#142344] mb-2">
              Your cart is empty
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-sm mx-auto">
              Looks like you haven&apos;t added any custom merchandise to your cart yet. Explore our bestsellers and magnetic badges!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF4D24] hover:bg-[#E03C14] text-white font-bold rounded-xl shadow-lg shadow-[#FF4D24]/20 transition-all text-sm"
            >
              <span>Explore Custom Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#142344] text-[#FF4D24] flex items-center justify-center font-bold text-xs">
                  MPH
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#142344]">Express Doorstep Checkout</h3>
                  <p className="text-[11px] text-slate-500">Order Total: ₹{total.toLocaleString()}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            {isOrderPlaced ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#142344]">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName || "Customer"}</strong>! Your order ID is{" "}
                  <span className="font-mono font-bold text-[#FF4D24]">{orderId}</span>.
                  A digital proof and tracking link will be sent to your email.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsOrderPlaced(false);
                    }}
                    className="px-8 py-3 bg-[#142344] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#0D1830]"
                  >
                    Close & Return to Home
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#142344]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#142344]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@company.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#142344]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Office / Flat / Building, Street, Area"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#142344]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Bengaluru"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Karnataka"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="560001"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Payment Option
                  </label>
                  <div className="grid grid-cols-3 gap-2">
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
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                            isSelected
                              ? "bg-[#142344] text-white border-[#142344] shadow-xs"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          <Icon className={`w-4 h-4 mb-2 ${isSelected ? "text-[#FF4D24]" : "text-slate-500"}`} />
                          <span className="text-[11px] font-bold">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Total: <strong className="text-sm font-black text-[#142344]">₹{total.toLocaleString()}</strong>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#FF4D24] hover:bg-[#E03C14] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                  >
                    Confirm & Place Order
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

