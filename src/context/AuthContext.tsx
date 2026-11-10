"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserAddress {
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  company?: string;
  gstNumber?: string;
  savedAddress?: UserAddress;
  joinedDate: string;
}

export interface UserOrder {
  orderId: string;
  date: string;
  total: number;
  itemsCount: number;
  itemsSummary: string;
  status: string;
  paymentMethod: string;
}

interface AuthContextType {
  user: UserProfile | null;
  orders: UserOrder[];
  isLoggedIn: boolean;
  login: (email: string, password?: string, name?: string, phone?: string) => void;
  signup: (name: string, email: string, phone: string, password?: string) => void;
  logout: () => void;
  updateAddress: (address: UserAddress) => void;
  addOrderToHistory: (order: UserOrder) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ORDERS: UserOrder[] = [
  {
    orderId: "MPH-849201",
    date: "Nov 08, 2026",
    total: 999,
    itemsCount: 5,
    itemsSummary: "Custom Laser-Cut Magnetic Badges (5 pcs)",
    status: "Dispatched via Express Courier",
    paymentMethod: "UPI",
  },
  {
    orderId: "MPH-392104",
    date: "Oct 24, 2026",
    total: 2898,
    itemsCount: 4,
    itemsSummary: "Bio-Washed Combed Cotton Polo T-Shirts (4 pcs)",
    status: "Delivered to Doorstep",
    paymentMethod: "Credit Card",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<UserOrder[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("myprinthub_user");
      const savedOrders = localStorage.getItem("myprinthub_orders");

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          // ignore
        }
      }

      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch {
          setOrders(DEMO_ORDERS);
        }
      } else {
        setOrders(DEMO_ORDERS);
      }
    }
  }, []);

  const login = (email: string, _password?: string, name?: string, phone?: string) => {
    const profileName = name || (email.includes("demo") ? "Vikram Malhotra" : email.split("@")[0]);
    const profilePhone = phone || "9876543210";

    const profile: UserProfile = {
      name: profileName,
      email,
      phone: profilePhone,
      company: "Malhotra Technologies Pvt. Ltd.",
      gstNumber: "07AAACM1234F1Z5",
      savedAddress: {
        address: "Flat 402, Lotus Boulevard, Sector 100",
        city: "Noida",
        state: "Uttar Pradesh",
        pincode: "201304",
      },
      joinedDate: "October 2026",
    };

    setUser(profile);
    if (typeof window !== "undefined") {
      localStorage.setItem("myprinthub_user", JSON.stringify(profile));
    }
  };

  const signup = (name: string, email: string, phone: string) => {
    const profile: UserProfile = {
      name,
      email,
      phone,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };

    setUser(profile);
    if (typeof window !== "undefined") {
      localStorage.setItem("myprinthub_user", JSON.stringify(profile));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("myprinthub_user");
    }
  };

  const updateAddress = (address: UserAddress) => {
    if (!user) return;
    const updated: UserProfile = { ...user, savedAddress: address };
    setUser(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("myprinthub_user", JSON.stringify(updated));
    }
  };

  const addOrderToHistory = (newOrder: UserOrder) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("myprinthub_orders", JSON.stringify(updated));
      }
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
        updateAddress,
        addOrderToHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

