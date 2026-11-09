"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product, Coupon } from "@/types";
import { coupons } from "@/data/testimonials";
import { useToast } from "./ToastContext";

interface CartContextType {
  items: CartItem[];
  addToCart: (params: {
    product: Product;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
    customText?: string;
    customImage?: string;
  }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  coupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  totalItems: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  const freeShippingThreshold = 999;

  // Calculate unit price based on tiered pricing and quantity
  const calculateUnitPrice = (product: Product, quantity: number): number => {
    if (!product.tieredPricing || product.tieredPricing.length === 0) {
      return product.price;
    }
    const matchedTier = product.tieredPricing.find(
      (tier) => quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)
    );
    return matchedTier ? matchedTier.price : product.price;
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("myprinthub_cart");
      const storedCoupon = localStorage.getItem("myprinthub_coupon");
      if (stored) {
        setItems(JSON.parse(stored));
      }
      if (storedCoupon) {
        setCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("myprinthub_cart", JSON.stringify(items));
        if (coupon) {
          localStorage.setItem("myprinthub_coupon", JSON.stringify(coupon));
        } else {
          localStorage.removeItem("myprinthub_coupon");
        }
      } catch (e) {
        console.error("Failed to save cart", e);
      }
    }
  }, [items, coupon, isLoaded]);

  const addToCart = ({
    product,
    quantity,
    selectedColor,
    selectedSize,
    customText,
    customImage,
  }: {
    product: Product;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
    customText?: string;
    customImage?: string;
  }) => {
    const id = `${product.id}_${selectedColor || "default"}_${selectedSize || "default"}_${customText ? "txt" : ""}_${customImage ? "img" : ""}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        const newUnitPrice = calculateUnitPrice(product, newQty);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          unitPrice: newUnitPrice,
        };
        return updated;
      } else {
        const unitPrice = calculateUnitPrice(product, quantity);
        return [
          ...prev,
          {
            id,
            product,
            quantity,
            selectedColor,
            selectedSize,
            customText,
            customImage,
            unitPrice,
          },
        ];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to Cart!`, "success");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newUnitPrice = calculateUnitPrice(item.product, quantity);
          return { ...item, quantity, unitPrice: newUnitPrice };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast(`Removed "${item.product.name}" from Cart`, "info");
    }
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode);

    if (!found) {
      showToast("Invalid coupon code. Try PRINT15 or BULK25!", "error");
      return false;
    }

    if (subtotal < found.minOrder) {
      showToast(`Minimum order of ₹${found.minOrder} required for ${found.code}`, "error");
      return false;
    }

    setCoupon(found);
    showToast(`Coupon ${found.code} applied! Saved ${found.discountPercent}%`, "success");
    return true;
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast("Coupon removed", "info");
  };

  let discount = 0;
  if (coupon && subtotal >= coupon.minOrder) {
    const rawDiscount = (subtotal * coupon.discountPercent) / 100;
    discount = coupon.maxDiscount ? Math.min(rawDiscount, coupon.maxDiscount) : rawDiscount;
  }

  const shipping = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 79;
  const total = Math.max(0, subtotal - discount + shipping);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        shipping,
        total,
        totalItems,
        freeShippingThreshold,
        freeShippingRemaining,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

