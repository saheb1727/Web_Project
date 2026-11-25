"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  KeyRound,
  RotateCcw,
  Edit3,
  ShieldCheck,
  Loader2,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { UserProfileDashboard } from "@/components/profile/UserProfileDashboard";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

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

  // OTP Verification States
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);

  useBodyScrollLock(isOtpModalOpen);

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleDemoLogin = () => {
    login(
      "vikram.demo@myprinthub.in",
      "DemoPassword123!",
      "Vikram Malhotra",
      "+91 98765 43210"
    );
    showToast("Logged in as Vikram Malhotra (Demo Account)", "success");
  };

  // Dispatch OTP to user's email
  const handleSendOtp = async (targetEmail: string, targetName: string) => {
    setIsSendingOtp(true);
    setDevOtpHint(null);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, name: targetName }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.devOtp) {
          setDevOtpHint(data.devOtp);
        }
        throw new Error(data.error || "Failed to send verification email");
      }

      showToast(`Verification code dispatched to ${targetEmail}`, "success");
      setIsOtpModalOpen(true);
      setResendCooldown(60);
      setOtpCode("");
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to send verification email";
      showToast(errorMsg, "error");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify entered OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const cleanOtp = otpCode.trim();
    if (cleanOtp.length !== 6) {
      showToast("Please enter the complete 6-digit code", "error");
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: cleanOtp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid verification code");
      }

      // Success: Close modal, finalize signup, show celebration toast
      setIsOtpModalOpen(false);
      signup(name || "New Customer", email, phone || "+91 98765 43210", password);
      showToast("Email verified! Welcome to MyPrintHub.", "success");
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Verification failed";
      showToast(errorMsg, "error");
    } finally {
      setIsVerifyingOtp(false);
    }
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

      // Trigger Email OTP verification
      handleSendOtp(email, name);
    } else {
      // Standard login
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        login(email, password, name, phone);
        showToast("Logged in successfully! Welcome back.", "success");
      }, 400);
    }
  };

  const handleLogout = () => {
    logout();
    showToast("Signed out of your account", "info");
  };

  // If user is already logged in, render the Modern Studio Profile Dashboard
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
          {activeTab === "login"
            ? "Sign in to your account"
            : "Create a new account"}
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
              disabled={isSubmitting || isSendingOtp}
              className="w-full py-3 bg-[#FF4D36] hover:bg-[#e0351d] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSendingOtp ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dispatching Verification Code...</span>
                </>
              ) : (
                <>
                  <span>
                    {activeTab === "login"
                      ? "Sign In"
                      : "Verify Email & Create Account"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Modern Professional OTP Verification Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 pb-0 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF4D36] shrink-0">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B0F19] tracking-tight">
                    Verify Your Email
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enter the 6-digit code sent to your inbox
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOtpModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content & OTP Form */}
            <form onSubmit={handleVerifyOtp} className="p-6 space-y-5">
              {/* Recipient Email Chip */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#FF4D36] shrink-0" />
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOtpModalOpen(false)}
                  className="text-[11px] font-bold text-[#FF4D36] hover:underline flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Change</span>
                </button>
              </div>

              {/* 6-Digit OTP Input Box */}
              <div>
                <label className="text-xs font-bold text-slate-700 block text-center mb-2">
                  One-Time Password (OTP)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  autoFocus
                  required
                  value={otpCode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setOtpCode(val);
                  }}
                  placeholder="• • • • • •"
                  className="w-full py-3.5 text-center text-2xl font-black tracking-[0.4em] text-[#0B0F19] bg-slate-50 border-2 border-slate-200 focus:border-[#FF4D36] focus:bg-white rounded-xl focus:outline-none transition-all placeholder:tracking-[0.2em] placeholder:text-slate-300 font-mono"
                />
                <p className="text-[11px] text-slate-400 text-center mt-1.5">
                  Code expires in 10 minutes
                </p>
              </div>

              {/* Development Hint if SMTP was blocked */}
              {devOtpHint && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                  <span className="text-[11px] text-amber-800 font-bold">
                    Dev Code: <code className="font-mono text-xs">{devOtpHint}</code>
                  </span>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={isVerifyingOtp || otpCode.trim().length !== 6}
                className="w-full py-3 bg-[#0B0F19] hover:bg-[#FF4D36] text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isVerifyingOtp ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verify & Activate Account</span>
                  </>
                )}
              </button>

              {/* Resend OTP with Countdown */}
              <div className="text-center pt-1 border-t border-slate-100">
                {resendCooldown > 0 ? (
                  <p className="text-xs text-slate-400">
                    Resend verification code in{" "}
                    <span className="font-bold text-slate-700">
                      {resendCooldown}s
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp(email, name)}
                    disabled={isSendingOtp}
                    className="text-xs font-bold text-[#FF4D36] hover:underline inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Resend Verification Code</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
