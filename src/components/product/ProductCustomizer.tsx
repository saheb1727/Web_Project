"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Type,
  Image as ImageIcon,
  Trash2,
  Sparkles,
  Eye,
  Sliders,
} from "lucide-react";
import { Product } from "@/types";
import { useToast } from "@/context/ToastContext";

interface ProductCustomizerProps {
  product: Product;
  selectedColorHex?: string;
  onCustomizationChange: (customData: {
    customImage?: string;
    customText?: string;
  }) => void;
}

export const ProductCustomizer: React.FC<ProductCustomizerProps> = ({
  product,
  selectedColorHex = "#ffffff",
  onCustomizationChange,
}) => {
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [textPlacement, setTextPlacement] = useState<"center" | "left" | "bottom">("center");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [logoScale, setLogoScale] = useState(80); // % size
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("File size should be less than 5MB", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCustomImage(result);
      onCustomizationChange({ customImage: result, customText });
      showToast("Logo uploaded! Preview updated.", "success");
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomText(val);
    onCustomizationChange({ customImage: customImage || undefined, customText: val });
  };

  const removeImage = () => {
    setCustomImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onCustomizationChange({ customImage: undefined, customText });
    showToast("Artwork removed", "info");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F95738]/10 flex items-center justify-center text-[#F95738]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Interactive Customizer & Live Mockup
            </h4>
            <p className="text-xs text-slate-400">
              Upload your company logo or enter custom names
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md border border-emerald-200/60">
          HD Vector Print
        </span>
      </div>

      {/* Live Preview Display */}
      <div className="relative aspect-4/3 w-full bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center">
        {/* Background Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-300"
        />

        {/* Live Overlay Printing Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-8">
          {/* Logo Overlay */}
          {customImage && (
            <div
              className="relative transition-all duration-200 shadow-sm"
              style={{
                width: `${logoScale}px`,
                height: `${logoScale}px`,
              }}
            >
              <Image
                src={customImage}
                alt="Custom Logo"
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
          )}

          {/* Text Overlay */}
          {customText && (
            <div
              className="mt-2 text-center font-bold px-3 py-1 rounded bg-black/40 backdrop-blur-2xs transition-all shadow-md max-w-xs truncate"
              style={{
                fontFamily: fontFamily,
                color: textColor,
                fontSize: "13px",
              }}
            >
              {customText}
            </div>
          )}

          {!customImage && !customText && (
            <div className="border-2 border-dashed border-[#F95738]/60 bg-white/70 backdrop-blur-xs rounded-xl p-3 text-center pointer-events-auto">
              <Eye className="w-5 h-5 text-[#F95738] mx-auto mb-1 animate-bounce" />
              <p className="text-xs font-bold text-slate-800">
                Design Placement Area
              </p>
              <p className="text-[10px] text-slate-500">
                {product.printArea || "Front Face Print Area"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Control Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Upload Logo */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#F95738]" />
              Upload Logo / Design
            </label>
            {customImage && (
              <button
                type="button"
                onClick={removeImage}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleFileUpload}
            className="hidden"
            id="logo-upload"
          />

          <label
            htmlFor="logo-upload"
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-[#F95738] rounded-xl cursor-pointer bg-white transition-colors group"
          >
            <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#F95738] mb-1 transition-colors" />
            <span className="text-xs font-bold text-slate-700 group-hover:text-[#1E1B4B]">
              {customImage ? "Change Artwork" : "Choose Image (PNG, JPG, SVG)"}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              Transparent background recommended
            </span>
          </label>

          {customImage && (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-slate-400" /> Size Scale
                </span>
                <span>{logoScale}px</span>
              </div>
              <input
                type="range"
                min="40"
                max="140"
                value={logoScale}
                onChange={(e) => setLogoScale(Number(e.target.value))}
                className="w-full accent-[#F95738]"
              />
            </div>
          )}
        </div>

        {/* 2. Custom Text */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-[#F95738]" />
            Add Custom Text / Name
          </label>

          <input
            type="text"
            value={customText}
            onChange={handleTextChange}
            placeholder="e.g. Vikram Sharma, HR Manager"
            maxLength={40}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E1B4B] focus:ring-1 focus:ring-[#1E1B4B]"
          />

          {/* Typography and color options */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] font-semibold text-slate-500 block mb-1">
                Font Style
              </span>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded-md focus:outline-none"
              >
                <option value="sans-serif">Modern Sans</option>
                <option value="serif">Classic Serif</option>
                <option value="monospace">Tech Mono</option>
                <option value="cursive">Signature Script</option>
              </select>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-slate-500 block mb-1">
                Text Color
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                {[
                  { name: "White", hex: "#FFFFFF" },
                  { name: "Gold", hex: "#D4AF37" },
                  { name: "Black", hex: "#000000" },
                  { name: "Orange", hex: "#F95738" },
                ].map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => setTextColor(color.hex)}
                    className={`w-6 h-6 rounded-full border shadow-2xs transition-transform ${
                      textColor === color.hex ? "scale-110 ring-2 ring-[#F95738]" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

