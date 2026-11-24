"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { UserProfileDashboard } from "@/components/profile/UserProfileDashboard";

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

  // If user is already logged in, render the Modern Studio Profile Dashboard (matching user screenshot)
  if (isLoggedIn && user) {
    return (
      <UserProfileDashboard
        user={user}
        orders={orders}
        onLogout={handleLogout}
      />
    );
  }

  // Otherwise, render modern rounded Login & Register form
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
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
          {/* Tab Selector */}
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0B0F19] focus:bg-white transition-all"
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
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0B0F19] focus:bg-white transition-all"
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0B0F19] focus:bg-white transition-all"
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0B0F19] focus:bg-white transition-all"
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
                    className={`w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none transition-colors ${
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
              className="w-full py-3 bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
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
