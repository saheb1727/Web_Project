"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  BarChart3,
  Users,
  Wallet,
  FileText,
  Percent,
  Search,
  Bell,
  Share2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  LogOut,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  User,
  Menu,
  X,
  Printer,
} from "lucide-react";
import { UserProfile, UserOrder } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface UserProfileDashboardProps {
  user: UserProfile;
  orders: UserOrder[];
  onLogout: () => void;
}

type DashboardTab =
  | "order"
  | "dashboard"
  | "products"
  | "analytics"
  | "customers"
  | "finances"
  | "invoices"
  | "discounts";

export const UserProfileDashboard: React.FC<UserProfileDashboardProps> = ({
  user,
  orders,
  onLogout,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<DashboardTab>("order");
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    orders.length > 0 ? orders[0].orderId : ""
  );
  const [isOrderItemOpen, setIsOrderItemOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useBodyScrollLock(isMobileMenuOpen);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Active selected order details (only if orders exist)
  const activeOrder =
    orders.find((o) => o.orderId === selectedOrderId) ||
    orders[0] ||
    null;

  const totalSpent = orders.reduce((sum, ord) => sum + ord.total, 0);

  const handleCopy = (text: string, label: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard!`, "success");
    }
  };

  const navItems: { id: DashboardTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "order", label: "Orders", icon: ShoppingBag, badge: `${orders.length}` },
    { id: "products", label: "Catalog", icon: Package },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "customers", label: "Profile", icon: Users },
    { id: "finances", label: "Finances", icon: Wallet },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "discounts", label: "Vouchers", icon: Percent, badge: "2 Active" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row antialiased">
      {/* 1. UNIFIED MOBILE TOP APP BAR (Single clean header on mobile) */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-3 sm:px-4 py-2.5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
          {/* Hamburger / Menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-1 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0B0F19] text-[#FF4D36] flex items-center justify-center font-black text-xs shadow-xs shrink-0">
              <Printer className="w-4 h-4 text-[#FF4D36]" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-[#0B0F19] truncate">
              MyPrintHub
            </span>
          </Link>
        </div>

        {/* Mobile Right Controls: Back to Store & Avatar */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:text-[#0B0F19] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all shadow-2xs"
            title="Return to Storefront"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="text-[11px]">Store</span>
          </Link>

          {/* Notification Button */}
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF4D36]" />
          </button>

          {/* User Avatar */}
          <div className="w-7 h-7 rounded-full bg-[#0B0F19] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
        </div>
      </div>

      {/* Mobile Backdrop for Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 lg:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar Navigation (Desktop Fixed, Mobile Slide-in Drawer) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 sm:w-64 bg-white border-r border-slate-200 flex flex-col justify-between z-50 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header & Close on Mobile */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <Link href="/" className="flex items-center gap-2.5 group" title="Return to Main Store">
              <div className="w-9 h-9 rounded-xl bg-[#0B0F19] text-white flex items-center justify-center font-black text-sm shadow-xs group-hover:bg-[#FF4D36] transition-colors">
                <Printer className="w-4 h-4 text-[#FF4D36] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-[#0B0F19] group-hover:text-[#FF4D36] transition-colors">
                  MyPrintHub
                </span>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
                  Studio Portal
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close Navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative my-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search portal..."
              className="w-full pl-8 pr-12 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#0B0F19] transition-all"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <kbd className="absolute right-2 top-2 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
              ⌘K
            </kbd>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0B0F19] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#FF4D36]" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#FF4D36] text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Shortcuts */}
          <div className="mt-8 pt-5 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-1">
              Store Shortcuts
            </span>
            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Package className="w-3.5 h-3.5 text-slate-400" />
              <span>Browse Catalog</span>
            </Link>
            <Link
              href="/track"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-slate-400" />
              <span>Track Orders</span>
            </Link>
          </div>
        </div>

        {/* User Profile Card & Sign Out at Bottom */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#0B0F19] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* Desktop Top Header Bar (Hidden on Mobile) */}
        <header className="hidden lg:flex bg-white border-b border-slate-200 px-8 py-5 items-center justify-between sticky top-0 z-30 shadow-xs gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#0B0F19] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all shadow-2xs"
              title="Return to Store Catalog"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
            <div>
              <h1 className="text-2xl font-black text-[#0B0F19] tracking-tight leading-tight">
                Hi, {user.name ? user.name.split(" ")[0] : "Customer"}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                <span>Welcome back to MyPrintHub</span>
                <span className="text-sm">👋</span>
              </p>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => showToast("Search opened. Enter order ID or product name.", "info")}
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF4D36] ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    <span className="text-[10px] text-[#FF4D36] font-semibold cursor-pointer">
                      Mark read
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-900 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[11px]">Factory Direct Pricing Active</p>
                        <p className="text-[10px] text-emerald-700">All custom products qualify for volume tiered manufacturing.</p>
                      </div>
                    </div>
                    <div className="p-2.5 bg-orange-50 rounded-xl text-orange-950 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#FF4D36] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[11px]">Zero MOQ Enabled</p>
                        <p className="text-[10px] text-orange-700">Order 1 piece or 10,000 without penalty.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Share / Export */}
            <button
              type="button"
              onClick={() => handleCopy(window.location.href, "Portal link")}
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* User Profile Avatar */}
            <div className="pl-2 border-l border-slate-200 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0B0F19] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <div className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-7xl">
          {/* Mobile Welcome Greeting Card (Clean full-width greeting on mobile) */}
          <div className="lg:hidden bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-black text-[#0B0F19] tracking-tight">
                Hi, {user.name ? user.name.split(" ")[0] : "Customer"} 👋
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5">Welcome to your studio portal</p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full shrink-0">
              Verified
            </span>
          </div>

          {/* Mobile Horizontal Quick Tabs (Swipeable navigation pills on mobile) */}
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-3 px-3 sm:-mx-6 sm:px-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#0B0F19] text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#FF4D36]" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: ORDER DETAILS VIEW */}
          {activeTab === "order" && (
            <div className="space-y-4 sm:space-y-6">
              {!activeOrder || orders.length === 0 ? (
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 sm:p-14 text-center shadow-xs max-w-xl mx-auto my-4 sm:my-8 space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF4D36] mx-auto">
                    <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#0B0F19] tracking-tight">
                      No Orders Placed Yet
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
                      You haven&apos;t placed any orders with this account yet. Browse our catalog to customize magnetic badges, t-shirts, hoodies, and corporate gifts!
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#FF4D36] hover:bg-[#e0351d] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Package className="w-4 h-4" />
                      <span>Browse Products & Start Customizing</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Breadcrumb & Order Status Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <Link
                        href="/"
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Return to Store"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Link>
                      <h2 className="text-base sm:text-lg font-black text-[#0B0F19] tracking-tight">
                        Orders ID: {activeOrder.orderId}
                      </h2>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>
                          {activeOrder.status.includes("Delivered") || activeOrder.status.includes("Completed")
                            ? "Completed"
                            : activeOrder.status.includes("Dispatched")
                            ? "Dispatched"
                            : "In Production"}
                        </span>
                      </span>
                      <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                        {activeOrder.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <Link
                        href={`/track?orderId=${activeOrder.orderId}`}
                        className="flex-1 sm:flex-none justify-center px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5 text-slate-600" />
                        <span>Track Shipment</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => showToast(`Invoice downloaded for Order #${activeOrder.orderId}`, "success")}
                        className="flex-1 sm:flex-none justify-center px-3.5 py-2 bg-[#0B0F19] hover:bg-[#1E1B4B] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        Download Invoice
                      </button>
                    </div>
                  </div>

                  {/* Order Switcher Pills (If user has multiple orders) */}
                  {orders.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-3 px-3 sm:-mx-0 sm:px-0">
                      <span className="text-xs font-bold text-slate-400 shrink-0 pr-1">Switch:</span>
                      {orders.map((ord) => (
                        <button
                          key={ord.orderId}
                          type="button"
                          onClick={() => setSelectedOrderId(ord.orderId)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                            selectedOrderId === ord.orderId
                              ? "bg-[#0B0F19] text-white shadow-xs"
                              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                          }`}
                        >
                          #{ord.orderId} ({ord.itemsSummary.split(" ")[0]})
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Two Column Layout: Left (Order Item & Financials) + Right (Detail Information) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
                    {/* Left Column (7 cols): Order Item Card & Visual Stepper */}
                    <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                      {/* Order Item Card */}
                      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                        {/* Collapsible Header */}
                        <button
                          type="button"
                          onClick={() => setIsOrderItemOpen(!isOrderItemOpen)}
                          className="w-full p-4 sm:p-6 flex items-center justify-between border-b border-slate-100 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <h3 className="text-sm sm:text-base font-black text-[#0B0F19] tracking-tight">
                            Order Item
                          </h3>
                          {isOrderItemOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        {isOrderItemOpen && (
                          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                            {/* Product Row */}
                            <div className="flex items-center justify-between gap-3 sm:gap-4">
                              <div className="flex items-center gap-3 min-w-0">
                                {/* Product Thumbnail */}
                                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                                  <Image
                                    src="/images/products/laser-cut-badge.jpg"
                                    alt="Ordered Product"
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = "none";
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400">
                                    <Package className="w-5 h-5 text-slate-500" />
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-xs sm:text-sm font-bold text-[#0B0F19] truncate">
                                    {activeOrder.itemsSummary || "Custom Laser-Cut Magnetic Badges"}
                                  </h4>
                                  <p className="text-[10px] sm:text-[11px] font-mono font-medium text-slate-400 mt-0.5 truncate">
                                    SKU: 16H9URO • Premium Finish
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-right">
                                <span className="text-xs font-bold text-slate-500">
                                  {activeOrder.itemsCount || 1}x
                                </span>
                                <span className="text-xs sm:text-sm font-black text-[#0B0F19]">
                                  ₹{activeOrder.total ? activeOrder.total.toLocaleString("en-IN") : "999"}
                                </span>
                              </div>
                            </div>

                            {/* Financial Summary */}
                            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                              <div className="flex justify-between text-slate-500">
                                <span>Subtotal</span>
                                <span className="font-semibold text-slate-800">
                                  ₹{activeOrder.total ? activeOrder.total.toLocaleString("en-IN") : "999"}
                                </span>
                              </div>
                              <div className="flex justify-between text-slate-500">
                                <span>Bulk Volume Discount</span>
                                <span className="font-semibold text-emerald-600">-₹0</span>
                              </div>
                              <div className="flex justify-between text-slate-500">
                                <span>Pan-India Courier</span>
                                <span className="font-semibold text-emerald-600">FREE</span>
                              </div>
                              <div className="flex justify-between text-slate-500">
                                <span>18% Corporate GST</span>
                                <span className="font-semibold text-slate-800">+Included</span>
                              </div>
                              <div className="pt-3 border-t border-slate-100 flex justify-between text-sm font-black text-[#0B0F19]">
                                <span>Total Paid</span>
                                <span>₹{activeOrder.total ? activeOrder.total.toLocaleString("en-IN") : "999"}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Timeline Stepper */}
                      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                            Production & Transit Status
                          </h4>
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>100% On-Schedule</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1">
                            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Vector Approved</span>
                            </div>
                            <p className="text-[10px] text-emerald-600">1200 DPI vector artwork validated for print</p>
                          </div>

                          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1">
                            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Precision Cured</span>
                            </div>
                            <p className="text-[10px] text-emerald-600">Micro-drop ink cured with anti-scratch coating</p>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 space-y-1">
                            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                              <Truck className="w-4 h-4 text-[#FF4D36]" />
                              <span>Express Transit</span>
                            </div>
                            <p className="text-[10px] text-slate-600">BlueDart courier tracking active</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column (5 cols): Customer & Delivery Information */}
                    <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5">
                        <h3 className="text-xs sm:text-sm font-black text-[#0B0F19] uppercase tracking-wider">
                          Detail Information
                        </h3>

                        {/* Customer / Corporate Card */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Client Account
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-500" />
                            <span className="text-xs font-bold text-slate-900">{user.name}</span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{user.phone}</span>
                          </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Shipping Destination
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-700">
                            <MapPin className="w-4 h-4 text-[#FF4D36] shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-slate-900">{user.name}</p>
                              <p className="text-slate-600 mt-0.5">
                                {user.savedAddress?.address || "Main Road, Kanke Road"}
                              </p>
                              <p className="text-slate-500">
                                {user.savedAddress?.city || "Ranchi"},{" "}
                                {user.savedAddress?.state || "Jharkhand"} -{" "}
                                {user.savedAddress?.pincode || "834001"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Payment Method */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Payment Details
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-emerald-600" />
                              <span className="font-bold text-slate-900">
                                {activeOrder.paymentMethod || "UPI / QR"}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Verified
                            </span>
                          </div>
                        </div>

                        {/* Quick Live GPS Link */}
                        <Link
                          href={`/track?orderId=${activeOrder.orderId}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4D36] hover:underline pt-1"
                        >
                          <span>Open Real-time GPS Tracking</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 2: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-400">Total Orders</span>
                  <p className="text-xl sm:text-2xl font-black text-[#0B0F19]">{orders.length}</p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold truncate">100% On-time dispatch</p>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-400">Total Spent</span>
                  <p className="text-xl sm:text-2xl font-black text-[#0B0F19]">₹{totalSpent.toLocaleString("en-IN")}</p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold truncate">GST Invoiced</p>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-400">Member Status</span>
                  <p className="text-xl sm:text-2xl font-black text-[#FF4D36]">Verified</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">Since {user.joinedDate || "Oct 2026"}</p>
                </div>
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-400">Factory Hub</span>
                  <p className="text-xl sm:text-2xl font-black text-[#0B0F19]">Ranchi</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">Express Dispatch</p>
                </div>
              </div>

              {/* All Orders List */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4">
                  <h3 className="text-sm sm:text-base font-black text-[#0B0F19]">Order History ({orders.length})</h3>
                  <Link href="/products" className="text-xs font-bold text-[#FF4D36] hover:underline">
                    New Order +
                  </Link>
                </div>
                {orders.length === 0 ? (
                  <div className="py-8 text-center space-y-2">
                    <p className="text-xs text-slate-500">No previous orders found for this account.</p>
                    <Link href="/products" className="text-xs font-bold text-[#FF4D36] hover:underline inline-block">
                      Browse catalog to create your first order →
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {orders.map((ord) => (
                      <div key={ord.orderId} className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-[#0B0F19]">#{ord.orderId}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs text-slate-500">{ord.date}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-800 mt-0.5">{ord.itemsSummary}</p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
                          <span className="text-sm font-black text-[#0B0F19]">₹{ord.total.toLocaleString("en-IN")}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedOrderId(ord.orderId);
                              setActiveTab("order");
                            }}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-[#0B0F19] hover:text-white text-slate-700 transition-colors cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS & REORDER */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-2">
                <h3 className="text-base sm:text-lg font-black text-[#0B0F19]">Custom Keepsakes & Corporate Catalog</h3>
                <p className="text-xs text-slate-500">Fast re-order prints directly customized with your saved vector branding.</p>
                <div className="pt-3 sm:pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <Link
                    href="/products/prod-frame-1"
                    className="p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-[#FF4D36] hover:shadow-xs transition-all text-left group"
                  >
                    <span className="text-[10px] font-bold text-[#FF4D36] uppercase">Bestseller</span>
                    <h4 className="text-xs font-bold text-[#0B0F19] group-hover:text-[#FF4D36] transition-colors mt-1">
                      Anniversary Memory Calendar Frame
                    </h4>
                    <p className="text-xs font-black text-[#0B0F19] mt-2">₹499</p>
                  </Link>
                  <Link
                    href="/products/prod-lamp-1"
                    className="p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-[#FF4D36] hover:shadow-xs transition-all text-left group"
                  >
                    <span className="text-[10px] font-bold text-[#FF4D36] uppercase">3D Ambient</span>
                    <h4 className="text-xs font-bold text-[#0B0F19] group-hover:text-[#FF4D36] transition-colors mt-1">
                      Laser Engraved 3D LED Acrylic Lamp
                    </h4>
                    <p className="text-xs font-black text-[#0B0F19] mt-2">₹699</p>
                  </Link>
                  <Link
                    href="/products/prod-leather-1"
                    className="p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-[#FF4D36] hover:shadow-xs transition-all text-left group"
                  >
                    <span className="text-[10px] font-bold text-[#FF4D36] uppercase">Executive</span>
                    <h4 className="text-xs font-bold text-[#0B0F19] group-hover:text-[#FF4D36] transition-colors mt-1">
                      Executive 4-in-1 Leather Gift Set
                    </h4>
                    <p className="text-xs font-black text-[#0B0F19] mt-2">₹1,299</p>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INVOICES & GST */}
          {activeTab === "invoices" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <h3 className="text-base font-black text-[#0B0F19]">Tax Invoices & Billing Records</h3>
                  <p className="text-xs text-slate-500">Official GST compliant tax invoices with input credit eligibility.</p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-500">
                  GSTIN: {user.gstNumber || "07AAACM1234F1Z5"}
                </span>
              </div>
              {orders.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No tax invoices available yet. Place an order to generate your GST invoice.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <div key={ord.orderId} className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div>
                        <p className="text-xs font-bold text-[#0B0F19]">TAX-INV-{ord.orderId}</p>
                        <p className="text-[11px] text-slate-400">Issued on {ord.date} • {ord.paymentMethod}</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className="text-xs font-black text-[#0B0F19]">₹{ord.total.toLocaleString("en-IN")}</span>
                        <button
                          type="button"
                          onClick={() => showToast(`Invoice TAX-INV-${ord.orderId}.pdf downloaded!`, "success")}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-[#0B0F19] hover:text-white transition-colors cursor-pointer border border-slate-200"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: DISCOUNTS & COUPONS */}
          {activeTab === "discounts" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
                <h3 className="text-base font-black text-[#0B0F19]">Your Exclusive Studio Vouchers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-sm text-[#FF4D36]">PRINT15</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("PRINT15", "Coupon code PRINT15")}
                        className="px-2.5 py-1 rounded-lg bg-[#FF4D36] hover:bg-[#e0351d] text-white text-[11px] font-bold cursor-pointer transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-slate-800 font-medium">15% OFF on all customized keepsake frames & ambient lamps.</p>
                    <p className="text-[10px] text-slate-400">Valid until 31 Dec 2026</p>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-sm text-[#0B0F19]">BULK25</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("BULK25", "Coupon code BULK25")}
                        className="px-2.5 py-1 rounded-lg bg-[#0B0F19] hover:bg-[#1E1B4B] text-white text-[11px] font-bold cursor-pointer transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-slate-800 font-medium">25% OFF on corporate kits & bulk orders over ₹2,500.</p>
                    <p className="text-[10px] text-slate-400">Valid on corporate accounts</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMERS / ADDRESSES & PROFILE */}
          {activeTab === "customers" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5">
              <h3 className="text-base font-black text-[#0B0F19]">Saved Profile & Delivery Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Client Name</span>
                  <p className="font-bold text-[#0B0F19]">{user.name}</p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Mobile</span>
                  <p className="font-bold text-[#0B0F19]">{user.phone}</p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Email Address</span>
                  <p className="font-bold text-[#0B0F19]">{user.email}</p>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Corporate Company</span>
                  <p className="font-bold text-[#0B0F19]">{user.company || "Personal Account"}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FINANCES & WALLET */}
          {activeTab === "finances" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-base font-black text-[#0B0F19]">Wallet & Saved Payment Methods</h3>
              <p className="text-xs text-slate-500">Secure 256-bit encrypted payment gateways. Instant refunds & PO credit.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs">
                      UPI
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0B0F19]">Verified UPI / QR</p>
                      <p className="text-[11px] text-slate-400 font-mono">Instant Bank Transfer</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF4D36] flex items-center justify-center font-bold text-xs">
                      PO
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0B0F19]">Corporate Credit PO</p>
                      <p className="text-[11px] text-slate-400 font-mono">30-Day Net Term</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                    Available
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-base font-black text-[#0B0F19]">Merchandise Printing Analytics</h3>
              <div className="p-5 sm:p-6 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                <BarChart3 className="w-9 h-9 sm:w-10 sm:h-10 text-[#FF4D36] mx-auto" />
                <p className="text-sm font-bold text-[#0B0F19]">Lifetime Custom Merchandise Statistics</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You have placed {orders.length} orders through MyPrintHub with 100% vector-verified proofs.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
