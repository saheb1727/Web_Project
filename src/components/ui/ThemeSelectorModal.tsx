"use client";

import React from "react";
import { Palette, Check, Sparkles, X } from "lucide-react";
import { useTheme, themes, ThemeId } from "@/context/ThemeContext";

export const ThemeSelectorModal: React.FC = () => {
  const { currentTheme, setTheme, isPaletteModalOpen, setIsPaletteModalOpen } = useTheme();

  if (!isPaletteModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Palette className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Choose Color Palette
              </h3>
              <p className="text-xs text-slate-500">
                Select a color scheme to preview the website live
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPaletteModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
            aria-label="Close theme modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
          {themes.map((t) => {
            const isSelected = currentTheme === t.id;

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-4 group ${
                  isSelected
                    ? "border-slate-900 bg-slate-50/80 shadow-md ring-2 ring-slate-900/10"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Color Swatches */}
                  <div className="flex items-center -space-x-2 shrink-0">
                    <span
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm shrink-0"
                      style={{ backgroundColor: t.primaryColor }}
                      title={`Primary: ${t.primaryColor}`}
                    />
                    <span
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm shrink-0"
                      style={{ backgroundColor: t.accentColor }}
                      title={`Accent: ${t.accentColor}`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 truncate">
                        {t.name}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">
                      {t.subtitle}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {t.description}
                    </p>
                  </div>
                </div>

                {/* Radio Indicator */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 group-hover:border-slate-400"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Theme auto-saves to your browser</span>
          </div>
          <button
            type="button"
            onClick={() => setIsPaletteModalOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Done Previewing
          </button>
        </div>
      </div>
    </div>
  );
};

