"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  BarChart2,
  ShoppingCart,
  Users,
  Mail,
  MessageSquare,
  Calendar as CalendarIcon,
  Store,
  FileEdit,
  Columns,
  Sliders,
  LogOut,
  Search,
  Plus,
  Bell,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  Paperclip,
  Star,
  Inbox,
  Archive,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Filter,
  X,
  Menu,
  Sparkles,
  Download,
  IndianRupee,
  Share2,
} from "lucide-react";
import { products as defaultProducts } from "@/data/products";
import { Product } from "@/types";
import { useToast } from "@/context/ToastContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

// Admin Product Interface with stock management
export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  stockCount: number;
  inStock: boolean;
  salesCount: number;
  rating: number;
  description: string;
}

// Initial Admin Products mapped from real store products
const INITIAL_ADMIN_PRODUCTS: AdminProduct[] = defaultProducts.slice(0, 16).map((p, idx) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  originalPrice: p.originalPrice || Math.round(p.price * 1.5),
  image: p.image,
  stockCount: idx === 3 ? 0 : idx === 7 ? 6 : Math.floor(40 + (idx * 13) % 85),
  inStock: idx !== 3,
  salesCount: Math.floor(120 + (idx * 37) % 350),
  rating: p.rating || 4.8,
  description: p.description || "High-precision personalized custom print merchandise.",
}));

// Mock Email Messages for Email Dashboard
interface EmailMessage {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  body: string;
  date: string;
  unread: boolean;
  starred: boolean;
  tag: "Corporate" | "Artwork Proof" | "Quote" | "Support";
  attachment?: string;
}

const INITIAL_EMAILS: EmailMessage[] = [
  {
    id: "mail-1",
    sender: "Tata Steel Procurement Hub",
    senderEmail: "procurement.tata@tatasteel.com",
    subject: "Bulk Order Inquiry: 500 pcs Custom Laser-Cut Magnetic Badges",
    snippet: "Hello MyPrintHub Studio team, we require 500 pcs brushed stainless steel magnetic badges...",
    body: "Hello MyPrintHub Studio Team,\n\nWe require 500 pcs brushed stainless steel magnetic employee badges for our upcoming corporate summit in Jamshedpur.\n\nCould you please share your volume tier quotation including 18% GST invoice and express freight timeline to Jamshedpur?\n\nVector CDR logo and employee name spreadsheet are attached.\n\nWarm regards,\nVivek Sharma\nGeneral Manager - Procurement\nTata Steel Limited",
    date: "10:42 AM",
    unread: true,
    starred: true,
    tag: "Corporate",
    attachment: "TataSteel_Summit_Badges_Vector.cdr",
  },
  {
    id: "mail-2",
    sender: "Ranchi Medical College Alumni",
    senderEmail: "alumni.board@rmcranchi.edu",
    subject: "Artwork Proof Approval: Convocation Commemorative Plaques",
    snippet: "We have reviewed the digital proof for 120 acrylic and wooden award plaques. Changes approved...",
    body: "Dear MyPrintHub Studio,\n\nWe have reviewed the digital vector mockups sent by your design team for the 120 convocation acrylic and gold-leaf plaques. The text alignment and typography are perfect.\n\nPlease proceed with mass UV printing and laser cutting. Let us know once dispatches begin.\n\nBest,\nDr. Rajeshwar Soren\nAlumni Executive Director",
    date: "Yesterday",
    unread: true,
    starred: false,
    tag: "Artwork Proof",
    attachment: "Approved_Plaque_Vector_Proof.pdf",
  },
  {
    id: "mail-3",
    sender: "Vikram Malhotra",
    senderEmail: "vikram.demo@myprinthub.in",
    subject: "Foundation Day Commemorative Diaries & Pens Order #MPH-849201",
    snippet: "Hi team, regarding our recent order #MPH-849201, please ensure the executive gift box clasps...",
    body: "Hi Studio Team,\n\nRegarding our recent order #MPH-849201, please ensure the executive gift box clasps are engraved with our silver foil anniversary logo. Delivery address confirmed for Kanke Road, Ranchi.\n\nThank you for the prompt support!\n\nVikram Malhotra\nMalhotra Technologies Pvt. Ltd.",
    date: "Nov 23",
    unread: true,
    starred: true,
    tag: "Corporate",
  },
  {
    id: "mail-4",
    sender: "Ananya Verma",
    senderEmail: "ananya.verma22@gmail.com",
    subject: "High-Res Photograph for 3D LED Acrylic Lamp & Frame",
    snippet: "Attached is the 300 DPI high-resolution portrait for our customized LED keepsake lamp...",
    body: "Hello,\n\nI just placed order #MPH-392104 for the Laser Engraved 3D LED Acrylic Heart Lamp. Attaching our original RAW photograph for maximum engraving sharpness.\n\nPlease confirm if this meets studio printing resolution standards.\n\nThanks,\nAnanya",
    date: "Nov 21",
    unread: false,
    starred: false,
    tag: "Support",
    attachment: "Portrait_Studio_Print_300DPI.jpg",
  },
  {
    id: "mail-5",
    sender: "Wipro Gifting Desk",
    senderEmail: "enterprise.gifting@wipro.com",
    subject: "Request for Physical Sample: Executive Thermal Vacuum Flask Set",
    snippet: "We are shortlisting corporate holiday gift kits for 1,200 employees across Bengaluru and Pune...",
    body: "Hello MyPrintHub,\n\nWe are evaluating corporate year-end hampers for 1,200 employees across our Bengaluru and Pune campuses. Could you dispatch 2 sample sets of your Executive Thermal Vacuum Flask & Cups Kit with sample laser branding to our Koramangala office?\n\nLooking forward to working together.\n\nPriya Nair\nEmployee Experience Lead",
    date: "Nov 20",
    unread: false,
    starred: false,
    tag: "Quote",
    attachment: "Wipro_Corporate_Gifting_RFP.pdf",
  },
];

type AdminTab = "overview" | "ecommerce" | "email" | "kanban" | "analytics" | "crm";

export const AdminDashboard: React.FC = () => {
  const { showToast } = useToast();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [revenueTimeframe, setRevenueTimeframe] = useState<"monthly" | "weekly" | "daily">("monthly");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Products state (persisted in localStorage)
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_ADMIN_PRODUCTS);
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "low" | "out">("all");

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Create Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Custom Photo Frames",
    price: 499,
    originalPrice: 799,
    image: "/images/products/anniversary-calendar-frame.jpg",
    stockCount: 50,
    inStock: true,
    description: "Bespoke studio customized print product with laser precision finish.",
  });

  // Freeze background scrolling when edit or create modal is open
  useBodyScrollLock(isEditModalOpen || isCreateModalOpen || isMobileNavOpen);

  // Email state
  const [emails, setEmails] = useState<EmailMessage[]>(INITIAL_EMAILS);
  const [selectedEmailId, setSelectedEmailId] = useState<string>("mail-1");
  const [emailFolder, setEmailFolder] = useState<"inbox" | "starred" | "sent" | "trash">("inbox");
  const [replyText, setReplyText] = useState("");
  const [emailSearch, setEmailSearch] = useState("");

  // Load persisted admin products from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("myprinthub_admin_products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save products to localStorage whenever updated
  const saveProducts = (updated: AdminProduct[]) => {
    setProducts(updated);
    try {
      localStorage.setItem("myprinthub_admin_products", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (product: AdminProduct) => {
    setEditingProduct({ ...product });
    setIsEditModalOpen(true);
  };

  // Save Edited Product
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const updated = products.map((p) =>
      p.id === editingProduct.id
        ? {
            ...editingProduct,
            inStock: editingProduct.stockCount > 0,
          }
        : p
    );
    saveProducts(updated);
    setIsEditModalOpen(false);
    setEditingProduct(null);
    showToast(`Updated "${editingProduct.name}" successfully!`, "success");
  };

  // Create New Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) {
      showToast("Please provide a product title", "error");
      return;
    }

    const created: AdminProduct = {
      id: `prod-admin-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price) || 299,
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) * 1.5,
      image: newProduct.image || "/images/products/anniversary-calendar-frame.jpg",
      stockCount: Number(newProduct.stockCount) || 50,
      inStock: Number(newProduct.stockCount) > 0,
      salesCount: 0,
      rating: 5.0,
      description: newProduct.description,
    };

    saveProducts([created, ...products]);
    setIsCreateModalOpen(false);
    setNewProduct({
      name: "",
      category: "Custom Photo Frames",
      price: 499,
      originalPrice: 799,
      image: "/images/products/anniversary-calendar-frame.jpg",
      stockCount: 50,
      inStock: true,
      description: "Bespoke studio customized print product with laser precision finish.",
    });
    showToast(`Product "${created.name}" created and added to catalog!`, "success");
  };

  // Delete Product
  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from store inventory?`)) {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
      showToast(`Removed "${name}" from catalog`, "info");
    }
  };

  // Quick In-Stock Toggle
  const handleToggleStock = (id: string) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const nextInStock = !p.inStock;
        return {
          ...p,
          inStock: nextInStock,
          stockCount: nextInStock ? (p.stockCount === 0 ? 25 : p.stockCount) : 0,
        };
      }
      return p;
    });
    saveProducts(updated);
    showToast("Stock status updated", "success");
  };

  // Quick Stock Increment / Decrement
  const handleAdjustStock = (id: string, delta: number) => {
    const updated = products.map((p) => {
      if (p.id === id) {
        const newCount = Math.max(0, p.stockCount + delta);
        return {
          ...p,
          stockCount: newCount,
          inStock: newCount > 0,
        };
      }
      return p;
    });
    saveProducts(updated);
  };

  // Reset to Factory Default Products
  const handleResetCatalog = () => {
    if (confirm("Reset all products and stock levels to factory defaults?")) {
      saveProducts(INITIAL_ADMIN_PRODUCTS);
      showToast("Inventory reset to factory catalog defaults", "info");
    }
  };

  // Send Email Reply
  const handleSendReply = () => {
    if (!replyText.trim()) return;
    showToast("Reply sent to customer via Studio Mail Gateway!", "success");
    setReplyText("");
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesStock =
      stockFilter === "all"
        ? true
        : stockFilter === "in"
        ? p.inStock && p.stockCount > 10
        : stockFilter === "low"
        ? p.inStock && p.stockCount <= 10 && p.stockCount > 0
        : !p.inStock || p.stockCount === 0;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const categoriesList = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const activeEmail = emails.find((m) => m.id === selectedEmailId) || emails[0];
  const unreadCount = emails.filter((m) => m.unread).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col antialiased">
      {/* Top Application Bar (Matching Adminex Topbar in Screenshot) */}
      <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
        {/* Left: Mobile Toggle & Breadcrumb Navigation Tabs */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors"
            title="Return to Main Store"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Store</span>
          </Link>

          {/* Top Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === "overview"
                  ? "bg-blue-50 text-blue-600 font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ecommerce")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === "ecommerce"
                  ? "bg-blue-50 text-blue-600 font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Products &amp; Stock
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("email")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "email"
                  ? "bg-blue-50 text-blue-600 font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>Email</span>
              {unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("kanban")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === "kanban"
                  ? "bg-blue-50 text-blue-600 font-extrabold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Kanban Pipeline
            </button>
          </nav>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xs md:max-w-sm mx-3 hidden sm:block">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products, orders, emails..."
              value={productSearch}
              onChange={(e) => {
                setProductSearch(e.target.value);
                if (activeTab === "overview") setActiveTab("ecommerce");
              }}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Actions: Create Button, Currency, Notification, Profile (Matches Screenshot) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Primary Create Button */}
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create</span>
          </button>

          {/* Currency Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
            <span>🇮🇳</span>
            <span>INR (₹)</span>
          </div>

          {/* Notifications */}
          <button
            type="button"
            onClick={() => showToast("3 new corporate bulk inquiries received from Tata Steel and Wipro.", "info")}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white" />
          </button>

          {/* Admin User Avatar (John Doe / Admin in screenshot) */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-black text-slate-900 block leading-tight">John Doe</span>
              <span className="text-[10px] text-slate-400 font-semibold block">Super Admin</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs ring-2 ring-blue-100">
              JD
            </div>
          </div>
        </div>
      </header>

      {/* Main Body: Left Sidebar + Center Workspace */}
      <div className="flex flex-1 min-h-[calc(100vh-64px)]">
        {/* Left Sidebar (Matches Adminex in screenshot) */}
        <aside
          className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-64px)] w-60 bg-white border-r border-slate-200/90 flex flex-col justify-between z-30 transition-transform duration-300 ${
            isMobileNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 space-y-6 overflow-y-auto">
            {/* Logo in Sidebar */}
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                ▲
              </div>
              <div>
                <span className="font-black text-sm tracking-tight text-slate-900 block leading-none">
                  Adminex Hub
                </span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                  MyPrintHub Admin
                </span>
              </div>
            </div>

            {/* DASHBOARDS Group */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 block mb-2">
                Dashboards
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("overview");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("analytics");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "analytics"
                    ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>Analytics</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("ecommerce");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "ecommerce"
                    ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Products &amp; Stock</span>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-bold">
                  {products.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("crm");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "crm"
                    ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>CRM &amp; Inquiries</span>
              </button>
            </div>

            {/* APPS Group */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 block mb-2">
                Apps
              </span>

              {/* Email with Badge (Matches Screenshot) */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("email");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "email"
                    ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </div>
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Chat with Badge 5 */}
              <button
                type="button"
                onClick={() => showToast("Opening Studio WhatsApp Live Chat Desk...", "info")}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span>Chat</span>
                </div>
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center">
                  5
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("kanban");
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "kanban"
                    ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Columns className="w-4 h-4" />
                <span>Kanban Board</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Production schedule calendar: 14 active laser print jobs today.", "info")}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <CalendarIcon className="w-4 h-4 text-slate-400" />
                <span>Calendar</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Pricing rule engine: Zero MOQ + volume tier discounts active.", "info")}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-slate-400" />
                <span>Rule Engine</span>
              </button>
            </div>
          </div>

          {/* Logout at Bottom */}
          <div className="p-4 border-t border-slate-100">
            <Link
              href="/"
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin</span>
            </Link>
          </div>
        </aside>

        {/* Center Workspace */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* ============================================================== */}
          {/* VIEW 1: OVERVIEW DASHBOARD (Exact Replica of Uploaded Screenshot) */}
          {/* ============================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header Title & Date Range / Download Report Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Dashboard
                  </h1>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Welcome back, here&apos;s what&apos;s happening today
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-bold text-slate-700 shadow-2xs">
                    <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Last 30 days</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast("Monthly Revenue & Production Report PDF generated!", "success")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>

              {/* 4 Stat Metric Cards (Matching Screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Visitors */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shadow-2xs">
                      <Users className="w-5 h-5" />
                    </div>
                    <button type="button" className="text-slate-300 hover:text-slate-600 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">Visitors</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-slate-900">12,845</span>
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span>+12%</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Revenue */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-2xs">
                      <IndianRupee className="w-5 h-5" />
                    </div>
                    <button type="button" className="text-slate-300 hover:text-slate-600 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">Revenue</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-slate-900">₹48,295</span>
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span>+8%</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Orders */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-2xs">
                      <Package className="w-5 h-5" />
                    </div>
                    <button type="button" className="text-slate-300 hover:text-slate-600 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">Orders</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-slate-900">1,234</span>
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                        <TrendingDown className="w-3 h-3" />
                        <span>-3%</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. Growth */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shadow-2xs">
                      <BarChart2 className="w-5 h-5" />
                    </div>
                    <button type="button" className="text-slate-300 hover:text-slate-600 p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 block">Growth</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-2xl font-black text-slate-900">18.2%</span>
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span>+4%</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Row: Revenue Overview Spline Chart + Top Products (Matching Screenshot) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Revenue Overview (7 Cols) */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight">
                        Revenue Overview
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">Monthly revenue statistics</p>
                    </div>

                    <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setRevenueTimeframe("monthly")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          revenueTimeframe === "monthly"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => setRevenueTimeframe("weekly")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          revenueTimeframe === "weekly"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Weekly
                      </button>
                      <button
                        type="button"
                        onClick={() => setRevenueTimeframe("daily")}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          revenueTimeframe === "daily"
                            ? "bg-blue-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        Daily
                      </button>
                    </div>
                  </div>

                  {/* SVG Wave Spline Curve Area Chart */}
                  <div className="pt-4 relative h-64 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 700 240" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="20" x2="700" y2="20" stroke="#F1F5F9" strokeDasharray="3 3" />
                      <line x1="0" y1="70" x2="700" y2="70" stroke="#F1F5F9" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="700" y2="120" stroke="#F1F5F9" strokeDasharray="3 3" />
                      <line x1="0" y1="170" x2="700" y2="170" stroke="#F1F5F9" strokeDasharray="3 3" />
                      <line x1="0" y1="220" x2="700" y2="220" stroke="#E2E8F0" />

                      {/* Area Fill */}
                      <path
                        d="M 0 190 Q 70 170 120 185 T 230 145 T 320 160 T 420 110 T 520 80 T 620 50 T 700 35 L 700 220 L 0 220 Z"
                        fill="url(#revenueGrad)"
                      />

                      {/* Smooth Wave Line */}
                      <path
                        d="M 0 190 Q 70 170 120 185 T 230 145 T 320 160 T 420 110 T 520 80 T 620 50 T 700 35"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Active Peak Dot */}
                      <circle cx="520" cy="80" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                    </svg>

                    {/* Months X-Axis */}
                    <div className="flex justify-between text-[11px] font-bold text-slate-400 pt-3">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                    </div>
                  </div>
                </div>

                {/* Top Products (4 Cols - Matching Screenshot) */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h3 className="text-base font-black text-slate-900 tracking-tight">Top Products</h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab("ecommerce")}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-4 pt-1">
                    {[
                      { name: "Premium Plan (Frames)", revenue: "₹12,450", pct: 85 },
                      { name: "Basic Plan (LED Lamp)", revenue: "₹8,200", pct: 60 },
                      { name: "Enterprise (Buddha Hamper)", revenue: "₹24,500", pct: 95 },
                      { name: "Starter Kit (Magnetic Badges)", revenue: "₹3,150", pct: 35 },
                    ].map((tp, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-800 truncate">{tp.name}</span>
                          <span className="text-slate-900">{tp.revenue}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${tp.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Action to Manage Inventory */}
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setActiveTab("ecommerce")}
                      className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Manage Live Store Inventory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 2: PRODUCT & STOCK MANAGER (User's Core Requirement)      */}
          {/* List product, price, pic, edit products, and stocks           */}
          {/* ============================================================== */}
          {activeTab === "ecommerce" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header Title & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Products &amp; Stock Inventory
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live catalog manager: Edit product prices, update images, and adjust stock counts.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleResetCatalog}
                    className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Reset to factory catalog"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter by product name, category, or SKU..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Stock Status Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setStockFilter("all")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        stockFilter === "all" ? "bg-slate-900 text-white shadow-xs" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      All ({products.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setStockFilter("in")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        stockFilter === "in" ? "bg-emerald-600 text-white shadow-xs" : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      In Stock
                    </button>
                    <button
                      type="button"
                      onClick={() => setStockFilter("low")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        stockFilter === "low" ? "bg-amber-600 text-white shadow-xs" : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      Low Stock (&le;10)
                    </button>
                    <button
                      type="button"
                      onClick={() => setStockFilter("out")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        stockFilter === "out" ? "bg-rose-600 text-white shadow-xs" : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      Out of Stock
                    </button>
                  </div>
                </div>

                {/* Categories Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 font-bold shrink-0 pr-1">Category:</span>
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-blue-50 text-blue-700 font-extrabold"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-black uppercase tracking-wider text-slate-500">
                        <th className="py-3 px-4">Product &amp; Pic</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price (₹)</th>
                        <th className="py-3 px-4">Stock Level</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                          {/* Pic & Name */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
                                <Image
                                  src={p.image}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = "none";
                                  }}
                                />
                                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300">
                                  <Package className="w-4 h-4" />
                                </div>
                              </div>
                              <div className="min-w-0 max-w-xs sm:max-w-sm">
                                <span className="font-bold text-slate-900 block truncate" title={p.name}>
                                  {p.name}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">ID: {p.id}</span>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-4 font-semibold text-slate-600">
                            <span className="px-2 py-0.5 bg-slate-100 rounded-md text-[11px]">{p.category}</span>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-black text-slate-900 text-sm">₹{p.price.toLocaleString()}</span>
                              {p.originalPrice > p.price && (
                                <span className="line-through text-slate-400 text-[10px]">
                                  ₹{p.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Stock Controls */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                                <button
                                  type="button"
                                  onClick={() => handleAdjustStock(p.id, -5)}
                                  className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold transition-colors cursor-pointer"
                                  title="Decrease stock by 5"
                                >
                                  -
                                </button>
                                <span className="w-10 text-center font-bold text-slate-900">{p.stockCount}</span>
                                <button
                                  type="button"
                                  onClick={() => handleAdjustStock(p.id, 5)}
                                  className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold transition-colors cursor-pointer"
                                  title="Increase stock by 5"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-[10px] text-slate-400">units</span>
                            </div>
                          </td>

                          {/* Stock Status Badge & Toggle */}
                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              onClick={() => handleToggleStock(p.id)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                                !p.inStock || p.stockCount === 0
                                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                                  : p.stockCount <= 10
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              }`}
                              title="Click to toggle in-stock status"
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  !p.inStock || p.stockCount === 0
                                    ? "bg-rose-500"
                                    : p.stockCount <= 10
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                }`}
                              />
                              <span>
                                {!p.inStock || p.stockCount === 0
                                  ? "Out of Stock"
                                  : p.stockCount <= 10
                                  ? "Low Stock"
                                  : "In Stock"}
                              </span>
                            </button>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(p)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title="Edit Product & Price"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete from store"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredProducts.length === 0 && (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <Package className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="font-bold text-slate-700">No matching products found</p>
                    <p className="text-xs">Try clearing the search query or category filters.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 3: EMAIL DASHBOARD (User Request: "email dashboard will be */}
          {/* like this in attached image")                                 */}
          {/* ============================================================== */}
          {activeTab === "email" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Email Dashboard</h2>
                  <p className="text-xs text-slate-500">
                    Corporate quote requests, customer proof uploads, and support correspondence.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Composing new studio dispatch notification...", "info")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Compose Mail</span>
                </button>
              </div>

              {/* 3-Panel Email Client (Folders + Mail List + Reader Pane) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden min-h-[580px]">
                {/* Panel 1: Folders (3 Cols) */}
                <div className="lg:col-span-3 border-r border-slate-200/80 p-4 space-y-4 bg-slate-50/50">
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setEmailFolder("inbox")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        emailFolder === "inbox" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Inbox className="w-4 h-4" />
                        <span>Inbox</span>
                      </div>
                      <span className="text-[10px] font-black bg-white/20 px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEmailFolder("starred")}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        emailFolder === "starred"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span>Starred</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">2</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEmailFolder("sent")}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        emailFolder === "sent" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Send className="w-4 h-4 text-slate-400" />
                      <span>Sent Dispatches</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEmailFolder("trash")}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        emailFolder === "trash"
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Trash2 className="w-4 h-4 text-slate-400" />
                      <span>Trash</span>
                    </button>
                  </div>

                  {/* Mail Tags */}
                  <div className="pt-4 border-t border-slate-200/80 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 block">
                      Inquiry Tags
                    </span>
                    <div className="space-y-1">
                      <span className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>Corporate Bulk</span>
                      </span>
                      <span className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Vector Proofs</span>
                      </span>
                      <span className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>Price Quotes</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Email List (4 Cols) */}
                <div className="lg:col-span-4 border-r border-slate-200/80 p-3 flex flex-col">
                  {/* Search inside email */}
                  <div className="relative mb-3">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={emailSearch}
                      onChange={(e) => setEmailSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Message rows */}
                  <div className="divide-y divide-slate-100 overflow-y-auto flex-1 space-y-1">
                    {emails
                      .filter(
                        (m) =>
                          m.sender.toLowerCase().includes(emailSearch.toLowerCase()) ||
                          m.subject.toLowerCase().includes(emailSearch.toLowerCase())
                      )
                      .map((mail) => (
                        <button
                          key={mail.id}
                          type="button"
                          onClick={() => {
                            setSelectedEmailId(mail.id);
                            // Mark as read
                            setEmails((prev) =>
                              prev.map((m) => (m.id === mail.id ? { ...m, unread: false } : m))
                            );
                          }}
                          className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer ${
                            selectedEmailId === mail.id
                              ? "bg-blue-50/70 border border-blue-200"
                              : "hover:bg-slate-50 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className={`truncate font-bold ${mail.unread ? "text-slate-900" : "text-slate-600"}`}>
                              {mail.sender}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">{mail.date}</span>
                          </div>
                          <p
                            className={`text-xs truncate ${
                              mail.unread ? "font-bold text-slate-900" : "text-slate-700"
                            }`}
                          >
                            {mail.subject}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{mail.snippet}</p>

                          <div className="flex items-center gap-2 mt-2">
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                                mail.tag === "Corporate"
                                  ? "bg-blue-100 text-blue-700"
                                  : mail.tag === "Artwork Proof"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {mail.tag}
                            </span>
                            {mail.attachment && (
                              <span className="text-[9px] text-slate-400 flex items-center gap-0.5">
                                <Paperclip className="w-2.5 h-2.5" />
                                <span>File attached</span>
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                {/* Panel 3: Email Reader & Quick Reply (5 Cols) */}
                <div className="lg:col-span-5 p-5 flex flex-col justify-between overflow-y-auto">
                  {activeEmail ? (
                    <div className="space-y-4">
                      {/* Sender Details Header */}
                      <div className="pb-4 border-b border-slate-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${
                              activeEmail.tag === "Corporate"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {activeEmail.tag}
                          </span>
                          <span className="text-xs text-slate-400">{activeEmail.date}</span>
                        </div>
                        <h3 className="text-base font-black text-slate-900">{activeEmail.subject}</h3>
                        <div className="flex items-center gap-2.5 pt-1">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {activeEmail.sender[0]}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900">{activeEmail.sender}</p>
                            <p className="text-[11px] text-slate-400 truncate">{activeEmail.senderEmail}</p>
                          </div>
                        </div>
                      </div>

                      {/* Body Content */}
                      <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line py-2">
                        {activeEmail.body}
                      </div>

                      {/* Attachment Card if present */}
                      {activeEmail.attachment && (
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 truncate">
                            <Paperclip className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="truncate">{activeEmail.attachment}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => showToast(`Downloaded ${activeEmail.attachment}`, "success")}
                            className="text-xs font-bold text-blue-600 hover:underline shrink-0 ml-2"
                          >
                            Download
                          </button>
                        </div>
                      )}

                      {/* Quick Reply Form */}
                      <div className="pt-4 border-t border-slate-100 space-y-2">
                        <label className="text-xs font-bold text-slate-700 block">Quick Studio Reply</label>
                        <textarea
                          rows={3}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Reply to ${activeEmail.sender} with quote or proof status...`}
                          className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none resize-none transition-all"
                        />
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() =>
                              showToast("Proof approved! Production order created in laser pipeline.", "success")
                            }
                            className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                          >
                            ✓ Approve Vector Proof
                          </button>
                          <button
                            type="button"
                            onClick={handleSendReply}
                            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-20 text-center text-slate-400">
                      <Mail className="w-10 h-10 mx-auto text-slate-300" />
                      <p className="font-bold text-slate-700 mt-2">Select a message to view</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 4: KANBAN PRODUCTION PIPELINE                             */}
          {/* ============================================================== */}
          {activeTab === "kanban" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Order Production Pipeline
                  </h2>
                  <p className="text-xs text-slate-500">
                    Live production tracking from digital vector proofing to doorstep courier dispatch.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("New custom job ticket created in queue!", "success")}
                  className="px-3.5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Job Ticket</span>
                </button>
              </div>

              {/* Kanban 4 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Col 1 */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-700">1. Vector Proofing</span>
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black flex items-center justify-center">
                      2
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-blue-600">#MPH-849201</span>
                    <h4 className="text-xs font-bold text-slate-900">Tata Steel Badges (500 pcs)</h4>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                      Awaiting CDR
                    </span>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-700">2. Laser &amp; UV Print</span>
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-black flex items-center justify-center">
                      3
                    </span>
                  </div>
                  <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-blue-600">#MPH-392104</span>
                    <h4 className="text-xs font-bold text-slate-900">3D LED Heart Acrylic Lamp</h4>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                      Engraving 70%
                    </span>
                  </div>
                </div>

                {/* Col 3 */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-700">3. Quality Inspection</span>
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-[10px] font-black flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <div className="p-3 bg-amber-50/40 border border-amber-200 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-blue-600">#MPH-771920</span>
                    <h4 className="text-xs font-bold text-slate-900">Thermal Flask Set (20 pcs)</h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      Passed QC
                    </span>
                  </div>
                </div>

                {/* Col 4 */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-700">4. Dispatched</span>
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black flex items-center justify-center">
                      5
                    </span>
                  </div>
                  <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-blue-600">#MPH-501832</span>
                    <h4 className="text-xs font-bold text-slate-900">Anniversary Calendar Frames</h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      In Transit (BlueDart)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW 5: ANALYTICS & CRM                                        */}
          {/* ============================================================== */}
          {(activeTab === "analytics" || activeTab === "crm") && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-lg font-black text-slate-900">
                  {activeTab === "crm" ? "CRM & Corporate Client Accounts" : "Store Traffic & Conversion Analytics"}
                </h3>
                <p className="text-xs text-slate-500">
                  Detailed analytics synchronized with Ranchi Studio manufacturing operations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-400">Total B2B Accounts</span>
                    <p className="text-2xl font-black text-slate-900">48 Corporate Clients</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-400">Average Order Value</span>
                    <p className="text-2xl font-black text-blue-600">₹3,420</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-slate-400">Repeat Purchase Rate</span>
                    <p className="text-2xl font-black text-emerald-600">76.4%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: EDIT PRODUCT & PRICE MODAL                            */}
      {/* ============================================================== */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setIsEditModalOpen(false)} aria-hidden="true" />
          <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">Edit Product &amp; Stock</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEdit} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Original / MRP (₹)</label>
                  <input
                    type="number"
                    min={1}
                    value={editingProduct.originalPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Inventory Stock Units</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editingProduct.stockCount}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stockCount: Number(e.target.value),
                        inStock: Number(e.target.value) > 0,
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-medium"
                  >
                    <option value="Custom Photo Frames">Custom Photo Frames</option>
                    <option value="Personalized Gifts">Personalized Gifts</option>
                    <option value="Magnetic Badges">Magnetic Badges</option>
                    <option value="Custom T-Shirts">Custom T-Shirts</option>
                    <option value="Drinkware & Mugs">Drinkware & Mugs</option>
                    <option value="Corporate Kits">Corporate Kits</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Product Image URL / Path</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-mono"
                  />
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <Image src={editingProduct.image} alt="Preview" fill className="object-cover" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: CREATE / ADD NEW PRODUCT MODAL                        */}
      {/* ============================================================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-3 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setIsCreateModalOpen(false)} aria-hidden="true" />
          <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 animate-in zoom-in-95 duration-200 my-auto">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">List New Product on Store</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateProduct} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Personalized Wooden Keepsake Box"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    min={1}
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Initial Stock Units *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newProduct.stockCount}
                    onChange={(e) => setNewProduct({ ...newProduct, stockCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-medium"
                  >
                    <option value="Custom Photo Frames">Custom Photo Frames</option>
                    <option value="Personalized Gifts">Personalized Gifts</option>
                    <option value="Magnetic Badges">Magnetic Badges</option>
                    <option value="Custom T-Shirts">Custom T-Shirts</option>
                    <option value="Drinkware & Mugs">Drinkware & Mugs</option>
                    <option value="Corporate Kits">Corporate Kits</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Product Photo URL</label>
                <input
                  type="text"
                  required
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="/images/products/anniversary-calendar-frame.jpg"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs shadow-blue-500/20 transition-all cursor-pointer"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
