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

export interface CustomizationData {
  customImage?: string;
  customText?: string;
  logoScale?: number;
  fontFamily?: string;
  textColor?: string;
  textPlacement?: "center" | "left" | "bottom";
}

interface ProductCustomizerProps {
  product: Product;
  selectedColorHex?: string;
  onCustomizationChange: (customData: CustomizationData) => void;
  hidePreview?: boolean;
}

export const ProductCustomizer: React.FC<ProductCustomizerProps> = ({
  product,
  selectedColorHex = "#ffffff",
  onCustomizationChange,
  hidePreview = false,
}) => {
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [textPlacement, setTextPlacement] = useState<"center" | "left" | "bottom">("center");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [logoScale, setLogoScale] = useState(80); // % size
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const notifyChange = (updates: Partial<CustomizationData>) => {
    onCustomizationChange({
      customImage: updates.customImage !== undefined ? updates.customImage : customImage || undefined,
      customText: updates.customText !== undefined ? updates.customText : customText,
      logoScale: updates.logoScale !== undefined ? updates.logoScale : logoScale,
      fontFamily: updates.fontFamily !== undefined ? updates.fontFamily : fontFamily,
      textColor: updates.textColor !== undefined ? updates.textColor : textColor,
      textPlacement: updates.textPlacement !== undefined ? updates.textPlacement : textPlacement,
    });
  };

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
      notifyChange({ customImage: result });
      showToast("Logo uploaded! Preview updated on left.", "success");
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomText(val);
    notifyChange({ customText: val });
  };

  const removeImage = () => {
    setCustomImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    notifyChange({ customImage: undefined });
    showToast("Artwork removed", "info");
  };

  const handleScaleChange = (scale: number) => {
    setLogoScale(scale);
    notifyChange({ logoScale: scale });
  };

  const handleFontChange = (font: string) => {
    setFontFamily(font);
    notifyChange({ fontFamily: font });
  };

  const handleColorChange = (color: string) => {
    setTextColor(color);
    notifyChange({ textColor: color });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FF4D36]/10 flex items-center justify-center text-[#FF4D36]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Interactive Customizer
            </h4>
            <p className="text-xs text-slate-500">
              Personalize with company logo or custom names
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200/60">
          HD Vector Print
        </span>
      </div>

      {/* Optional In-Situ Live Preview (only rendered if hidePreview is false) */}
      {!hidePreview && (
        <div className="relative aspect-4/3 w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-8">
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
              <div className="border-2 border-dashed border-[#FF4D36]/60 bg-white/70 backdrop-blur-xs rounded-xl p-3 text-center pointer-events-auto">
                <Eye className="w-5 h-5 text-[#FF4D36] mx-auto mb-1 animate-bounce" />
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
      )}

      {/* Customizer Control Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

        {/* 1. Upload Logo Box */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#FF4D36]" />
              Upload Logo / Artwork
            </label>
            {customImage && (
              <button
                type="button"
                onClick={removeImage}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
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
            className="flex flex-col items-center justify-center p-3 sm:p-4 border-2 border-dashed border-slate-300 hover:border-[#FF4D36] rounded-xl cursor-pointer bg-white transition-colors group text-center"
          >
            <Upload className="w-4 h-4 text-slate-400 group-hover:text-[#FF4D36] mb-1 transition-colors" />
            <span className="text-xs font-bold text-slate-700 group-hover:text-[#0B0F19]">
              {customImage ? "Change Artwork" : "Choose Image (PNG, JPG, SVG)"}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">
              Transparent background recommended
            </span>
          </label>

          {customImage && (
            <div className="space-y-1 pt-1">
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
                onChange={(e) => handleScaleChange(Number(e.target.value))}
                className="w-full accent-[#FF4D36] cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* 2. Custom Text / Name Box */}
        <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-[#FF4D36]" />
            Custom Text / Recipient Name
          </label>

          <input
            type="text"
            value={customText}
            onChange={handleTextChange}
            placeholder="e.g. Rahul Sharma, HR Head"
            maxLength={40}
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:border-[#0B0F19] focus:ring-1 focus:ring-[#0B0F19]"
          />

          {/* Typography and color options */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <span className="text-[10px] font-semibold text-slate-500 block mb-1">
                Font Style
              </span>
              <select
                value={fontFamily}
                onChange={(e) => handleFontChange(e.target.value)}
                className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded-md focus:outline-hidden cursor-pointer"
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
              <div className="flex items-center gap-1.5 mt-1">
                {[
                  { name: "White", hex: "#FFFFFF" },
                  { name: "Gold", hex: "#D4AF37" },
                  { name: "Black", hex: "#000000" },
                  { name: "Coral", hex: "#FF4D36" },
                ].map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => handleColorChange(color.hex)}
                    className={`w-5 h-5 rounded-full border shadow-2xs transition-transform cursor-pointer ${textColor === color.hex ? "scale-115 ring-2 ring-[#FF4D36]" : ""
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