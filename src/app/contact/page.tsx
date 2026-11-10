"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productInterest: "Magnetic Badges",
    quantity: "50-100 pcs",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      showToast("Please fill in your contact information", "error");
      return;
    }

    setIsSubmitted(true);
    showToast("Inquiry submitted! Our bulk quote specialist will call you within 2 hours.", "success");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F95738]/10 text-[#F95738] text-xs font-bold uppercase tracking-wider mb-2">
            <MessageCircle className="w-4 h-4" />
            <span>Dedicated Customer Care</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#1E1B4B] tracking-tight">
            We&apos;re Here to Help You Print
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Have a custom design inquiry, corporate bulk requirement, or need urgent rush delivery? Reach out to our expert team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Hubs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="text-lg font-black text-[#1E1B4B] border-b border-slate-100 pb-3">
                Direct Contact Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1E1B4B] text-[#F95738] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Toll-Free Phone Support</div>
                    <div className="text-slate-600 mt-0.5">+91 98765 43210 / +91 120 4567890</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Monday to Saturday: 9:00 AM - 8:00 PM IST</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">WhatsApp Business Chat</div>
                    <div className="text-slate-600 mt-0.5">+91 98765 43210 (Instant Replies)</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Send vector logo files directly</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F95738]/10 text-[#F95738] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Email Inquiries</div>
                    <div className="text-slate-600 mt-0.5">support@myprinthub.in (Orders & Help)</div>
                    <div className="text-slate-600">bulk@myprinthub.in (Corporate Quotes)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hubs */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-[#1E1B4B] flex items-center gap-2">
                <Building className="w-4 h-4 text-[#F95738]" />
                <span>Manufacturing & Dispatch Facilities</span>
              </h4>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="font-bold text-slate-900">Noida Head Factory (Delhi NCR)</div>
                  <p className="text-slate-500 mt-0.5">Plot 42, Electronic City, Sector 62, Noida, Uttar Pradesh 201309</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="font-bold text-slate-900">Bengaluru Fulfillment Center</div>
                  <p className="text-slate-500 mt-0.5">17th Main Rd, Koramangala 4th Block, Bengaluru, Karnataka 560034</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                  <div className="font-bold text-slate-900">Mumbai Operations Hub</div>
                  <p className="text-slate-500 mt-0.5">MIDC Industrial Area, Andheri East, Mumbai, Maharashtra 400069</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#F95738] uppercase tracking-wider block mb-1">
                  Custom & Bulk Inquiries
                </span>
                <h3 className="text-2xl font-black text-[#1E1B4B]">
                  Request an Instant Quotation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your requirements below and receive a detailed price quotation with tiered wholesale discounts.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-10 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900">
                    Thank You, {formData.name}!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    We have received your custom order request for <strong>{formData.productInterest}</strong>. A dedicated merchandise consultant will email you digital mockup proofs and your custom tiered rate card shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 bg-[#1E1B4B] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#110E38]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ananya Deshmukh"
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1E1B4B]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1E1B4B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Corporate / Personal Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ananya@company.com"
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1E1B4B]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Tech Innovations"
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1E1B4B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Product of Interest
                      </label>
                      <select
                        value={formData.productInterest}
                        onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      >
                        <option value="Magnetic Badges">Executive Magnetic Name Badges</option>
                        <option value="Custom T-Shirts">Cotton Crew & Polo T-Shirts</option>
                        <option value="Hoodies & Sweatshirts">380 GSM Winter Fleece Hoodies</option>
                        <option value="Custom Caps">Embroidered 6-Panel Twill Caps</option>
                        <option value="Ceramic Mugs & Drinkware">Ceramic Mugs & Insulated Bottles</option>
                        <option value="Corporate Kits">Complete Welcome Onboarding Kits</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Estimated Quantity
                      </label>
                      <select
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      >
                        <option value="1-9 pcs">1 - 9 pcs (Prototype Sample)</option>
                        <option value="10-49 pcs">10 - 49 pcs (Small Team)</option>
                        <option value="50-199 pcs">50 - 199 pcs (Corporate Event)</option>
                        <option value="200-499 pcs">200 - 499 pcs (Conference/Summit)</option>
                        <option value="500+ pcs">500+ pcs (Enterprise Wholesale)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Project Notes & Target Delivery Date
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention your logo colors, delivery city, or any special packaging preferences..."
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#1E1B4B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#F95738] hover:bg-[#E03A1B] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#F95738]/20 transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Quotation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

