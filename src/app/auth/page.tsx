"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Printer,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Package,
  MapPin,
  LogOut,
  Calendar,
  Building,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function AuthPage() {
  const { user, orders, isLoggedIn, login, signup, logout } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoLogin = () => {
    login("vikram.demo@myprinthub.in", "DemoPassword123!", "Vikram Malhotra", "+91 98765 43210");
    showToast("Logged in as Vikram Malhotra (Demo Account)", "success");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (activeTab === "login") {
        login(email, password, name, phone);
        showToast("Logged in successfully! Welcome back.", "success");
      } else {
        signup(name || "New Customer", email, phone || "+91 98765 43210", password);
        showToast("Account created successfully! Welcome to MyPrintHub.", "success");
      }
    }, 400);
  };

  const handleLogout = () => {
    logout();
    showToast("Signed out of your account", "info");
  };

  // If user is already logged in, render the Complete Account Dashboard!
  if (isLoggedIn && user) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Profile Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1E1B4B] text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-[var(--color-accent-border)]">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-[#1E1B4B]">
                    {user.name}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Verified Buyer
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {user.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {user.phone}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Member since {user.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Orders & Tracking History */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#F95738]" />
                  <h2 className="text-lg font-black text-[#1E1B4B]">
                    My Orders &amp; Package Tracking ({orders.length})
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="text-xs font-bold text-[#F95738] hover:underline"
                >
                  Browse Catalog →
                </Link>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-sm text-[#1E1B4B]">
                              #{ord.orderId}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500 font-medium">
                              {ord.date}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-800 mt-0.5">
                            {ord.itemsSummary}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-sm font-black text-[#1E1B4B]">
                            ₹{ord.total.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Paid via {ord.paymentMethod}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              ord.status.includes("Delivered")
                                ? "bg-emerald-500"
                                : ord.status.includes("Dispatched")
                                ? "bg-blue-500 animate-pulse"
                                : "bg-amber-500"
                            }`}
                          />
                          <span className="text-xs font-bold text-slate-700">
                            {ord.status}
                          </span>
                        </div>

                        <Link
                          href={`/track?orderId=${ord.orderId}`}
                          className="px-3.5 py-1.5 rounded-xl bg-[#F95738] hover:bg-[#E03A1B] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 active:scale-95 cursor-pointer"
                        >
                          <span>Track Package</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 text-slate-500 space-y-3">
                  <Package className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-800">No orders placed yet</p>
                  <p className="text-xs text-slate-400">
                    Your custom prints, polo t-shirts, and magnetic badges will appear here.
                  </p>
                  <Link
                    href="/products"
                    className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-[#F95738] text-white text-xs font-bold"
                  >
                    Start Customizing
                  </Link>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Saved Address & Business GST */}
            <div className="lg:col-span-4 space-y-5">
              {/* Shipping Address Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#1E1B4B]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#F95738]" />
                    <span>Primary Delivery Address</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                    Default
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <p className="font-bold text-slate-900">{user.name}</p>
                  <p>{user.savedAddress?.address || "Plot 42, Electronic City, Sector 62"}</p>
                  <p>
                    {user.savedAddress?.city || "Noida"},{" "}
                    {user.savedAddress?.state || "Uttar Pradesh"} -{" "}
                    <strong>{user.savedAddress?.pincode || "201301"}</strong>
                  </p>
                  <p className="text-slate-400 pt-1 font-mono">{user.phone}</p>
                </div>
              </div>

              {/* Corporate GST Card */}
              {user.company && (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E1B4B]">
                    <Building className="w-4 h-4 text-[#F95738]" />
                    <span>Corporate Billing Info</span>
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <p className="font-bold text-slate-900">{user.company}</p>
                    {user.gstNumber && (
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        GSTIN: <strong>{user.gstNumber}</strong>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Factory Contact Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1E1B4B] to-[#110E38] text-white text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-[var(--color-accent)]">
                  <Sparkles className="w-4 h-4" />
                  <span>VIP Corporate Print Desk</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  Need a personal account manager for bulk orders above 500 units?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F95738] hover:underline pt-1"
                >
                  <span>Connect with Print Engineer</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render Login & Register form
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-[#1E1B4B] text-[#F95738] flex items-center justify-center shadow-md">
            <Printer className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-[#1E1B4B]">
            MyPrintHub<span className="text-[#F95738]">.in</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black text-[#1E1B4B] tracking-tight">
          {activeTab === "login" ? "Sign in to your account" : "Create a new account"}
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Access your custom artwork files, saved mockups, and corporate GST invoices.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {/* Tab Selector */}
          <div className="flex rounded-2xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "login"
                  ? "bg-white text-[#1E1B4B] shadow-xs"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "signup"
                  ? "bg-white text-[#1E1B4B] shadow-xs"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Quick Demo Login Option */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-xl text-xs font-bold text-amber-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Fill Demo Account (1-Click Login)</span>
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "signup" && (
              <>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Vikram Malhotra"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1E1B4B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1E1B4B]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1E1B4B]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1E1B4B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#F95738] hover:bg-[#E03A1B] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span>{activeTab === "login" ? "Sign In" : "Create Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
