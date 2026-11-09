"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeId =
  | "sunset-navy"
  | "emerald-gold"
  | "midnight-cyan"
  | "crimson-black"
  | "royal-purple";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  subtitle: string;
  primaryColor: string;
  accentColor: string;
  softBg: string;
  description: string;
}

export const themes: ThemeOption[] = [
  {
    id: "sunset-navy",
    name: "Navy & Sunset Orange",
    subtitle: "Original High-Impact (PrintMine Style)",
    primaryColor: "#142344",
    accentColor: "#FF4D24",
    softBg: "#FFF3F0",
    description: "Classic authoritative navy with high-energy vibrant printing orange.",
  },
  {
    id: "emerald-gold",
    name: "Emerald & Imperial Gold",
    subtitle: "Luxury Corporate & Executive",
    primaryColor: "#064E3B",
    accentColor: "#D97706",
    softBg: "#FEF3C7",
    description: "Deep British racing emerald with warm metallic amber gold.",
  },
  {
    id: "midnight-cyan",
    name: "Obsidian & Electric Cyan",
    subtitle: "Modern Tech & Innovation",
    primaryColor: "#0B132B",
    accentColor: "#0284C7",
    softBg: "#F0F9FF",
    description: "Deep midnight obsidian paired with electric sapphire cyan.",
  },
  {
    id: "crimson-black",
    name: "Carbon & Ruby Crimson",
    subtitle: "Bold Studio & Apparel",
    primaryColor: "#18181B",
    accentColor: "#E11D48",
    softBg: "#FFF1F2",
    description: "Minimalist matte carbon zinc with vivid ruby crimson accents.",
  },
  {
    id: "royal-purple",
    name: "Regal Indigo & Coral Flame",
    subtitle: "Creative Agency & Merch",
    primaryColor: "#1E1B4B",
    accentColor: "#F95738",
    softBg: "#FFF5F3",
    description: "Deep midnight indigo with radiant sunset coral highlights.",
  },
];

interface ThemeContextType {
  currentTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  themeConfig: ThemeOption;
  isPaletteModalOpen: boolean;
  setIsPaletteModalOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState<ThemeId>("sunset-navy");
  const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("myprinthub_theme") as ThemeId;
      if (saved && themes.some((t) => t.id === saved)) {
        setCurrentThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
      } else {
        document.documentElement.setAttribute("data-theme", "sunset-navy");
      }
    } catch {
      // ignore
    }
  }, []);

  const setTheme = (theme: ThemeId) => {
    setCurrentThemeState(theme);
    try {
      localStorage.setItem("myprinthub_theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    } catch {
      // ignore
    }
  };

  const themeConfig = themes.find((t) => t.id === currentTheme) || themes[0];

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        themeConfig,
        isPaletteModalOpen,
        setIsPaletteModalOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

