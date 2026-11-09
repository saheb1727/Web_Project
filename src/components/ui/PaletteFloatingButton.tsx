"use client";

import React from "react";
import { Palette } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const PaletteFloatingButton: React.FC = () => {
  const { themeConfig, setIsPaletteModalOpen } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setIsPaletteModalOpen(true)}
      className="fixed bottom-6 right-6 z-40 bg-slate-900/95 hover:bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/60 backdrop-blur-md flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group cursor-pointer"
      title="Click to change website color palette"
    >
      <div className="flex items-center -space-x-1.5">
        <span
          className="w-4 h-4 rounded-full border border-white shadow-xs"
          style={{ backgroundColor: themeConfig.primaryColor }}
        />
        <span
          className="w-4 h-4 rounded-full border border-white shadow-xs"
          style={{ backgroundColor: themeConfig.accentColor }}
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none">
          Color Scheme
        </span>
        <span className="text-xs font-bold text-white leading-tight flex items-center gap-1">
          {themeConfig.name.split("&")[0].trim()}
          <Palette className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
        </span>
      </div>
    </button>
  );
};

