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
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  LogOut,
  MapPin,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  Truck,
  ExternalLink,
  Copy,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  Calendar,
} from "lucide-react";
import { UserProfile, UserOrder } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

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
    orders.length > 0 ? orders[0].orderId : "MPH-849201"
  );
  const [isOrderItemOpen, setIsOrderItemOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Active selected order details (fallback to default mock if orders empty)
  const activeOrder =
    orders.find((o) => o.orderId === selectedOrderId) ||
    orders[0] || {
      orderId: "334902445",
      date: "14 Jan 2025 9:13 AM",
      total: 78.74,
      itemsCount: 1,
      itemsSummary: "Custom Laser-Cut Magnetic Badges",
      status: "Completed",
      paymentMethod: "UPI",
    };

  const totalSpent = orders.reduce((sum, ord) => sum + ord.total, 0);

  const handleCopy = (text: string, label: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard!`, "success");
    }
  };

  const navItems: { id: DashboardTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "order", label: "Order", icon: ShoppingBag, badge: `${orders.length}` },
    { id: "products", label: "Products", icon: Package },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "customers", label: "Customers", icon: Users },
    { id: "finances", label: "Finances", icon: Wallet },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "discounts", label: "Discounts", icon: Percent, badge: "2 Active" },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7FB] text-[#1E293B] flex flex-col lg:flex-row antialiased">
      {/* Mobile Top App Bar */}
      <div className="lg:hidden bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-xs shadow-sm">
            <span className="tracking-tighter">MP</span>
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            MyPrintHub
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Left Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between z-50 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-sm shadow-sm shadow-indigo-500/20">
                <span className="tracking-tighter">MP</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  MyPrintHub
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
                  Studio Portal
                </span>
              </div>
            </div>
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              title="Portal options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-8 pr-12 py-2 text-xs bg-slate-50 border border-slate-200/90 rounded-xl placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            <kbd className="absolute right-2 top-2 px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-2xs">
              ⌘1
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
                      ? "bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-sm shadow-indigo-500/25"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
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
              Direct Quick Links
            </span>
            <Link
              href="/products"
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Package className="w-3.5 h-3.5 text-slate-400" />
              <span>Browse Catalog</span>
            </Link>
            <Link
              href="/track"
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-slate-400" />
              <span>Live Package Tracker</span>
            </Link>
          </div>
        </div>

        {/* User Profile Card & Sign Out at Bottom */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
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
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 sm:px-8 py-5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Hi, {user.name ? user.name.split(" ")[0] : "Customer"}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
              <span>Welcome back to MyPrintHub</span>
              <span className="text-sm">👋</span>
            </p>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
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
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    <span className="text-[10px] text-indigo-600 font-semibold cursor-pointer">
                      Mark read
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-900 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[11px]">Vector Proof Approved</p>
                        <p className="text-[10px] text-emerald-700">Order #{activeOrder.orderId} is now queued for laser engraving.</p>
                      </div>
                    </div>
                    <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-900 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[11px]">VIP Benefit Unlocked</p>
                        <p className="text-[10px] text-indigo-700">Zero MOQ discount unlocked on bulk corporate merchandise.</p>
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-100 shadow-2xs">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <div className="p-4 sm:p-8 space-y-6 max-w-7xl">
          {/* TAB 1: ORDER DETAILS VIEW (Matches user's exact uploaded screenshot) */}
          {activeTab === "order" && (
            <div className="space-y-6">
              {/* Breadcrumb & Order Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href="/"
                    className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Return to Store"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    Orders ID: {activeOrder.orderId}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>
                      {activeOrder.status.includes("Delivered") || activeOrder.status.includes("Completed")
                        ? "Completed"
                        : activeOrder.status.includes("Dispatched")
                        ? "Dispatched"
                        : "In Production"}
                    </span>
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activeOrder.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/track?orderId=${activeOrder.orderId}`}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5 text-slate-600" />
                    <span>Track Shipment</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => showToast(`Invoice downloaded for Order #${activeOrder.orderId}`, "success")}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    Completed
                  </button>
                </div>
              </div>

              {/* Order Switcher Pills (If user has multiple orders) */}
              {orders.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <span className="text-xs font-bold text-slate-400 shrink-0 pr-1">Switch Order:</span>
                  {orders.map((ord) => (
                    <button
                      key={ord.orderId}
                      type="button"
                      onClick={() => setSelectedOrderId(ord.orderId)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                        selectedOrderId === ord.orderId
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      #{ord.orderId} ({ord.itemsSummary.split(" ")[0]})
                    </button>
                  ))}
                </div>
              )}

              {/* Two Column Layout: Left (Order Item & Financials) + Right (Detail Information) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column (7 cols): Order Item Card & Visual Stepper */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Order Item Card */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                    {/* Collapsible Header */}
                    <button
                      type="button"
                      onClick={() => setIsOrderItemOpen(!isOrderItemOpen)}
                      className="w-full p-5 sm:p-6 flex items-center justify-between border-b border-slate-100 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <h3 className="text-base font-black text-slate-900 tracking-tight">
                        Order Item
                      </h3>
                      {isOrderItemOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {isOrderItemOpen && (
                      <div className="p-5 sm:p-6 space-y-6">
                        {/* Product Row */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Product Thumbnail */}
                            <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0 shadow-2xs">
                              <Image
                                src="/images/products/laser-cut-badge.jpg"
                                alt="Ordered Product"
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  // Fallback generic product graphic
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-slate-400">
                                <Package className="w-5 h-5 text-indigo-500" />
                              </div>
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-slate-900 truncate">
                                {activeOrder.itemsSummary || "Custom Laser-Cut Magnetic Badges"}
                              </h4>
                              <p className="text-[11px] font-mono font-medium text-slate-400 mt-0.5 truncate">
                                SKU: 16H9URO • Matte Stainless Steel Backing
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0 text-right">
                            <span className="text-xs font-bold text-slate-500">
                              {activeOrder.itemsCount || 1}x
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-xl">
                              ₹{activeOrder.total.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        {/* Financial Line Items */}
                        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                          <div className="flex justify-between text-slate-600">
                            <span>Subtotal</span>
                            <span className="font-bold text-slate-900">
                              ₹{activeOrder.total.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <div className="flex justify-between text-emerald-600 font-semibold">
                            <span>Discount (Studio VIP Coupon)</span>
                            <span>-₹100.00</span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Tax / GST (18% Included)</span>
                            <span className="font-medium text-slate-700">+₹0.00 (Inclusive)</span>
                          </div>
                        </div>

                        {/* Total Row */}
                        <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
                          <span className="text-sm font-black text-slate-900">Total</span>
                          <span className="text-lg font-black text-slate-900">
                            ₹{activeOrder.total.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Production & Dispatch Stepper */}
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                    <h3 className="text-sm font-black text-slate-900 tracking-tight">
                      Order Lifecycle & Tracking Timeline
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {[
                        { step: "Order Placed", time: "Completed", done: true },
                        { step: "Vector Proof", time: "Approved", done: true },
                        { step: "Laser Engraving", time: "In Studio Lab", done: true },
                        { step: "Courier Delivery", time: "Doorstep", done: activeOrder.status.includes("Delivered") },
                      ].map((st, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-xl border text-left space-y-1 transition-all ${
                            st.done
                              ? "bg-emerald-50/60 border-emerald-200/60 text-emerald-950"
                              : "bg-slate-50 border-slate-200 text-slate-400"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 ${st.done ? "text-emerald-600" : "text-slate-300"}`}
                            />
                            <span className="text-[11px] font-bold">{st.step}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium pl-5">{st.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column (5 cols): Detail Information Cards (Matches User Screenshot) */}
                <div className="lg:col-span-5 space-y-5">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider px-1">
                    Detail Information
                  </h3>

                  {/* Card 1: Notes */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-900">Notes</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      First customer and order! Vector logo confirmed for high-precision 1,200 DPI laser engraving. Custom magnetic backings included.
                    </p>
                  </div>

                  {/* Card 2: Customers */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">Customers</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{user.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {orders.length} Order{orders.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                        Customer is-exempt
                      </span>
                    </div>
                  </div>

                  {/* Card 3: Contact Information */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">Contact Information</h4>
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#FF4D36] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900 block text-[11px] mb-0.5">
                            Primary Delivery Address
                          </span>
                          <p className="text-slate-500 text-[11px] leading-relaxed">
                            {user.savedAddress?.address || "Main Road, Kanke Road"}, {user.savedAddress?.city || "Ranchi"},{" "}
                            {user.savedAddress?.state || "Jharkhand"} - {user.savedAddress?.pincode || "834001"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Shipping Logistics */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">Shipping & Logistics</h4>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                        Express Air
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p className="font-semibold text-slate-800">BlueDart Express Air Cargo</p>
                      <p className="text-[11px] font-mono text-slate-400">
                        AWB: BLUEDART-IND-{activeOrder.orderId.replace(/[^0-9]/g, "") || "849201"}
                      </p>
                    </div>
                    <Link
                      href={`/track?orderId=${activeOrder.orderId}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-1"
                    >
                      <span>Open Real-time GPS Tracking</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-400">Total Orders</span>
                  <p className="text-2xl font-black text-slate-900">{orders.length}</p>
                  <p className="text-[11px] text-emerald-600 font-semibold">100% On-time dispatch</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-400">Total Spent</span>
                  <p className="text-2xl font-black text-slate-900">₹{totalSpent.toLocaleString("en-IN")}</p>
                  <p className="text-[11px] text-indigo-600 font-semibold">Corporate GST Billed</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-400">Member Status</span>
                  <p className="text-2xl font-black text-indigo-600">Verified VIP</p>
                  <p className="text-[11px] text-slate-400 font-medium">Since {user.joinedDate || "Oct 2026"}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
                  <span className="text-xs font-bold text-slate-400">Factory Hub</span>
                  <p className="text-2xl font-black text-[#FF4D36]">Ranchi Studio</p>
                  <p className="text-[11px] text-slate-500 font-medium">Pan-India Direct Courier</p>
                </div>
              </div>

              {/* All Orders List */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-base font-black text-slate-900">Order History ({orders.length})</h3>
                  <Link href="/products" className="text-xs font-bold text-indigo-600 hover:underline">
                    New Order +
                  </Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <div key={ord.orderId} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-900">#{ord.orderId}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500">{ord.date}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">{ord.itemsSummary}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-black text-slate-900">₹{ord.total.toLocaleString("en-IN")}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrderId(ord.orderId);
                            setActiveTab("order");
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS & REORDER */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-2">
                <h3 className="text-lg font-black text-slate-900">Custom Keepsakes & Corporate Catalog</h3>
                <p className="text-xs text-slate-500">Fast re-order prints directly customized with your saved vector branding.</p>
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link
                    href="/products/prod-frame-1"
                    className="p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-sm transition-all text-left group"
                  >
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">Bestseller</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-1">
                      Anniversary Memory Calendar Frame
                    </h4>
                    <p className="text-xs font-black text-slate-900 mt-2">₹499</p>
                  </Link>
                  <Link
                    href="/products/prod-lamp-1"
                    className="p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-sm transition-all text-left group"
                  >
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">3D Ambient</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-1">
                      Laser Engraved 3D LED Acrylic Lamp
                    </h4>
                    <p className="text-xs font-black text-slate-900 mt-2">₹699</p>
                  </Link>
                  <Link
                    href="/products/prod-leather-1"
                    className="p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-sm transition-all text-left group"
                  >
                    <span className="text-[10px] font-bold text-indigo-600 uppercase">Executive</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-1">
                      Executive 4-in-1 Leather Gift Set
                    </h4>
                    <p className="text-xs font-black text-slate-900 mt-2">₹1,299</p>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INVOICES & GST */}
          {activeTab === "invoices" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-black text-slate-900">Tax Invoices & Billing Records</h3>
                  <p className="text-xs text-slate-500">Official GST compliant tax invoices with input credit eligibility.</p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  GSTIN: {user.gstNumber || "07AAACM1234F1Z5"}
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {orders.map((ord) => (
                  <div key={ord.orderId} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">TAX-INV-{ord.orderId}</p>
                      <p className="text-[11px] text-slate-400">Issued on {ord.date} • {ord.paymentMethod}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-900">₹{ord.total.toLocaleString("en-IN")}</span>
                      <button
                        type="button"
                        onClick={() => showToast(`Invoice TAX-INV-${ord.orderId}.pdf downloaded!`, "success")}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DISCOUNTS & COUPONS */}
          {activeTab === "discounts" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <h3 className="text-base font-black text-slate-900">Your Exclusive Studio Vouchers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-sm text-indigo-700">PRINT15</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("PRINT15", "Coupon code PRINT15")}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-indigo-950 font-medium">15% OFF on all customized keepsake frames & ambient lamps.</p>
                    <p className="text-[10px] text-slate-400">Valid until 31 Dec 2026</p>
                  </div>

                  <div className="p-4 rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-sm text-purple-700">BULK25</span>
                      <button
                        type="button"
                        onClick={() => handleCopy("BULK25", "Coupon code BULK25")}
                        className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-[11px] font-bold cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-purple-950 font-medium">25% OFF on corporate kits & bulk orders over ₹2,500.</p>
                    <p className="text-[10px] text-slate-400">Valid on corporate accounts</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMERS / ADDRESSES & PROFILE */}
          {activeTab === "customers" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
              <h3 className="text-base font-black text-slate-900">Saved Profile & Delivery Hub Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Client Name</span>
                  <p className="font-bold text-slate-900">{user.name}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Mobile</span>
                  <p className="font-bold text-slate-900">{user.phone}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Email Address</span>
                  <p className="font-bold text-slate-900">{user.email}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Corporate Company</span>
                  <p className="font-bold text-slate-900">{user.company || "Malhotra Technologies Pvt. Ltd."}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FINANCES & WALLET */}
          {activeTab === "finances" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900">Wallet & Saved Payment Methods</h3>
              <p className="text-xs text-slate-500">Secure 256-bit encrypted payment gateways. Instant refunds & PO credit.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      UPI
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Verified UPI ID</p>
                      <p className="text-[11px] text-slate-400 font-mono">vikram.malhotra@okhdfcbank</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                      PO
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Corporate Credit PO</p>
                      <p className="text-[11px] text-slate-400 font-mono">30-Day Net Term</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                    Approved
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900">Merchandise Printing Analytics</h3>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200/80 text-center space-y-2">
                <BarChart3 className="w-10 h-10 text-indigo-500 mx-auto" />
                <p className="text-sm font-bold text-slate-900">Lifetime Custom Merchandise Statistics</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You have saved ₹1,250 through volume tier discounts and received 100% vector-verified proofs on all orders.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
