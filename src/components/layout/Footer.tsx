"use client";

import React from "react";
import Link from "next/link";
import {
  Printer,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Heart,
} from "lucide-react";
import { categories } from "@/data/categories";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#142344] text-slate-300 pt-16 pb-8 border-t border-[#23355C]">
      {/* Top Value Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#23355C]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FF4D24]/10 border border-[#FF4D24]/20 flex items-center justify-center text-[#FF4D24] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Pan-India Express</h5>
              <p className="text-xs text-slate-400 mt-0.5">Free delivery over ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FF4D24]/10 border border-[#FF4D24]/20 flex items-center justify-center text-[#FF4D24] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Print Perfection</h5>
              <p className="text-xs text-slate-400 mt-0.5">100% Quality guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FF4D24]/10 border border-[#FF4D24]/20 flex items-center justify-center text-[#FF4D24] shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">No Minimum MOQ</h5>
              <p className="text-xs text-slate-400 mt-0.5">Order 1 piece or 10,000</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#FF4D24]/10 border border-[#FF4D24]/20 flex items-center justify-center text-[#FF4D24] shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-white text-sm">Secure Checkout</h5>
              <p className="text-xs text-slate-400 mt-0.5">UPI, Cards & NetBanking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF4D24] to-[#E03C14] flex items-center justify-center text-white shadow-lg">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <div className="font-extrabold text-2xl text-white tracking-tight">
                MyPrintHub<span className="text-[#FF4D24]">.in</span>
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed pr-6">
              India&apos;s premier on-demand custom printing platform. We manufacture
              neodymium magnetic name badges, premium bio-washed apparel, winter fleece hoodies,
              embroidered caps, and corporate welcome kits with zero minimum orders and
              unbeatable factory-direct tiered pricing.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF4D24] shrink-0" />
                <span>Sector 62, Noida, NCR Delhi, India - 201309</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF4D24] shrink-0" />
                <span>+91 98765 43210 / +91 120 4567890</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF4D24] shrink-0" />
                <span>support@myprinthub.in | bulk@myprinthub.in</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-[#FF4D24] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-[#FF4D24] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  View All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/contact" className="hover:text-[#FF4D24] transition-colors">
                  Bulk Order Quotations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF4D24] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF4D24] transition-colors">
                  Printing Technology & DTF
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF4D24] transition-colors">
                  Artwork Guidelines
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF4D24] transition-colors">
                  Shipping & Return Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF4D24] transition-colors">
                  Contact Support Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Account */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              My Account
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/auth" className="hover:text-[#FF4D24] transition-colors">
                  Sign In / Create Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#FF4D24] transition-colors">
                  View Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#FF4D24] transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF4D24] transition-colors">
                  About MyPrintHub.in
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF4D24] transition-colors">
                  Corporate Partnership
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#23355C]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} MyPrintHub.in. All rights reserved. Made with{" "}
            <Heart className="w-3.5 h-3.5 text-[#FF4D24] inline fill-[#FF4D24]" /> in India.
          </p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Refund Policy</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

