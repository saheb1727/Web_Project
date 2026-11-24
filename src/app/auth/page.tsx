"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Package,
  MapPin,
  LogOut,
  Calendar,
  Building,
  ShoppingBag,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function AuthPage() {
  const router = useRouter();
  const { user, orders, isLoggedIn, login, signup, logout } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoLogin = () => {
    login("vikram.demo@myprinthub.in", "DemoPassword123!", "Vikram Malhotra", "+91 98765 43210");
    showToast("Logged in as Vikram Malhotra (Demo Account)", "success");
    router.push("/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "signup") {
      if (password !== confirmPassword) {
        showToast("Passwords do not match. Please verify.", "error");
        return;
      }
      if (password.length < 6) {
        showToast("Password must be at least 6 characters long.", "error");
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (activeTab === "login") {
        login(email, password, name, phone);
        showToast("Logged in successfully! Welcome back.", "success");
        router.push("/");
      } else {
        signup(name || "New Customer", email, phone || "+91 98765 43210", password);
        showToast("Account created successfully! Welcome to MyPrintHub.", "success");
        router.push("/");
      }
    }, 400);
  };

  const handleLogout = () => {
    logout();
    showToast("Signed out of your account", "info");
  };

  // If user is already logged in, render the Executive Studio Client Portal
  if (isLoggedIn && user) {
    const totalSpent = orders.reduce((sum, ord) => sum + ord.total, 0);

    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Navigation Bar / Quick Return */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0B0F19] transition-colors py-1 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Store & Products</span>
            </Link>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              CLIENT PORTAL // ID: #{user.email ? user.email.slice(0, 8).toUpperCase() : "USR-01"}
            </div>
          </div>

          {/* Executive Studio Profile Hero */}
          <div className="bg-[#0B0F19] text-white rounded-none p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* User Identity */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-none bg-[#111827] text-white flex items-center justify-center font-black text-2xl sm:text-3xl shrink-0 border-2 border-[#FF4D36] shadow-md">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {user.name}
                    </h1>
                    <span className="px-2 py-0.5 rounded-none bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 uppercase tracking-wider">
                      Verified Client
                    </span>
                    {user.company && (
                      <span className="px-2 py-0.5 rounded-none bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/30 uppercase tracking-wider">
                        Corporate Tier
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {user.email}
                    </span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {user.phone}
                    </span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Member since {user.joinedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                <Link
                  href="/products"
                  className="px-4 py-2.5 bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs font-bold rounded-none shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shop Catalog</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3.5 py-2.5 rounded-none border border-slate-700 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Ribbon */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80">
              <div className="bg-white/5 p-3 rounded-none border border-white/5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Total Orders
                </div>
                <div className="text-lg font-black text-white mt-0.5">
                  {orders.length} Placed
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-none border border-white/5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Lifetime Value
                </div>
                <div className="text-lg font-black text-white mt-0.5">
                  ₹{totalSpent.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-none border border-white/5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  MOQ Benefit
                </div>
                <div className="text-lg font-black text-emerald-400 mt-0.5">
                  Zero Minimum
                </div>
              </div>
              <div className="bg-white/5 p-3 rounded-none border border-white/5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Factory Hub
                </div>
                <div className="text-lg font-black text-[#FF4D36] mt-0.5">
                  Ranchi Studio
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left 8 Cols: Orders & Live Dispatch Status */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-none p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#FF4D36]" />
                    <h2 className="text-base font-black text-[#0B0F19]">
                      My Orders &amp; Package Tracking ({orders.length})
                    </h2>
                  </div>
                  <Link
                    href="/products"
                    className="text-xs font-bold text-[#FF4D36] hover:text-[#e0351d] transition-colors"
                  >
                    Order More Prints →
                  </Link>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-3">
                    {orders.map((ord) => (
                      <div
                        key={ord.orderId}
                        className="p-4 rounded-none border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-sm text-[#0B0F19]">
                                #{ord.orderId}
                              </span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-500 font-medium">
                                {ord.date}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-slate-800 mt-1">
                              {ord.itemsSummary}
                            </p>
                          </div>

                          <div className="text-left sm:text-right">
                            <span className="text-sm font-black text-[#0B0F19]">
                              ₹{ord.total.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium block">
                              Paid via {ord.paymentMethod}
                            </span>
                          </div>
                        </div>

                        <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2.5 h-2.5 rounded-none ${
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

                          <div className="flex items-center gap-2">
                            <Link
                              href={`/track?orderId=${ord.orderId}`}
                              className="px-3.5 py-1.5 rounded-none bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                            >
                              <span>Track Package</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-500 space-y-3">
                    <Package className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm font-bold text-slate-800">No active orders placed</p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Explore our factory catalog for custom magnetic badges, bio-washed apparel, and corporate welcome kits.
                    </p>
                    <Link
                      href="/products"
                      className="inline-block mt-2 px-5 py-2.5 rounded-none bg-[#FF4D36] text-white text-xs font-bold"
                    >
                      Start Customizing
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Right 4 Cols: Address, GST & VIP Studio Concierge */}
            <div className="lg:col-span-4 space-y-4">
              {/* Shipping Address Card */}
              <div className="bg-white rounded-none p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#0B0F19]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#FF4D36]" />
                    <span>Primary Delivery Address</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded-none font-bold uppercase">
                    Default
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3.5 rounded-none border border-slate-100">
                  <p className="font-bold text-slate-900">{user.name}</p>
                  <p>{user.savedAddress?.address || "Dangra toli chowk Purulia road, opposite hyderabadi zaika"}</p>
                  <p>
                    {user.savedAddress?.city || "Ranchi"},{" "}
                    {user.savedAddress?.state || "Jharkhand"} -{" "}
                    <strong>{user.savedAddress?.pincode || "834001"}</strong>
                  </p>
                  <p className="text-slate-400 pt-1 font-mono">{user.phone}</p>
                </div>
              </div>

              {/* Corporate Billing Info Card */}
              {user.company && (
                <div className="bg-white rounded-none p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B0F19]">
                    <Building className="w-4 h-4 text-[#FF4D36]" />
                    <span>Corporate Billing Info</span>
                  </div>
                  <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-none border border-slate-100">
                    <p className="font-bold text-slate-900">{user.company}</p>
                    {user.gstNumber && (
                      <p className="text-[11px] text-slate-500 font-mono mt-1">
                        GSTIN: <strong>{user.gstNumber}</strong>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Factory Concierge Card with WhatsApp Direct */}
              <div className="p-5 rounded-none bg-[#0B0F19] text-white space-y-3 border border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-xs text-[#FF4D36]">
                  <Sparkles className="w-4 h-4" />
                  <span>VIP Studio Concierge</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Need custom Pantone color matching, 1-on-1 prototype proofs, or bulk tiered pricing for your company?
                </p>
                <div className="pt-1 flex flex-col gap-2">
                  <a
                    href="https://wa.me/919876543210?text=Hi%20MyPrintHub,%20I%20am%20logged%20in%20and%20need%20assistance%20with%20a%20corporate%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-none flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Direct WhatsApp Chat</span>
                  </a>
                  <Link
                    href="/contact"
                    className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-none flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    <span>Submit Enterprise Ticket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render Login & Register form
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col justify-start pt-6 sm:pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B0F19] tracking-tight">
          {activeTab === "login" ? "Sign in to your account" : "Create a new account"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
          Access your custom artwork files, saved mockups, and corporate GST invoices.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-none border border-slate-200/90 shadow-xl space-y-6">
          {/* Tab Selector */}
          <div className="flex rounded-none bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 rounded-none text-xs font-bold transition-all cursor-pointer ${
                activeTab === "login"
                  ? "bg-white text-[#0B0F19] shadow-xs"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2 rounded-none text-xs font-bold transition-all cursor-pointer ${
                activeTab === "signup"
                  ? "bg-white text-[#0B0F19] shadow-xs"
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
            className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-none text-xs font-bold text-amber-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-[#0B0F19]"
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
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-[#0B0F19]"
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-[#0B0F19]"
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:border-[#0B0F19]"
                />
              </div>
            </div>

            {activeTab === "signup" && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border rounded-none focus:outline-none transition-colors ${
                      confirmPassword && confirmPassword !== password
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-200 focus:border-[#0B0F19]"
                    }`}
                  />
                </div>
                {confirmPassword && confirmPassword !== password && (
                  <p className="text-[11px] text-red-500 font-medium mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs font-bold rounded-none shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
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
