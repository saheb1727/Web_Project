"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

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

// Demo account orders ONLY loaded for vikram.demo@myprinthub.in
const DEMO_USER: UserProfile = {
  name: "Vikram Malhotra",
  email: "vikram.demo@myprinthub.in",
  phone: "+91 98765 43210",
  company: "Malhotra Technologies Pvt. Ltd.",
  gstNumber: "07AAACM1234F1Z5",
  savedAddress: {
    address: "Main Road, Kanke Road",
    city: "Ranchi",
    state: "Jharkhand",
    pincode: "834001",
  },
  joinedDate: "October 2026",
};

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

  // Helper to load orders scoped to a specific user email
  const loadOrdersForUser = useCallback((userEmail: string) => {
    if (!userEmail) {
      setOrders([]);
      return;
    }

    const cleanEmail = userEmail.toLowerCase().trim();

    // Only Vikram Malhotra demo account gets the demo orders
    if (cleanEmail === "vikram.demo@myprinthub.in") {
      setOrders(DEMO_ORDERS);
      return;
    }

    // Check account-specific localStorage first
    try {
      const userOrdersKey = `myprinthub_orders_${cleanEmail}`;
      const saved = localStorage.getItem(userOrdersKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }

    // Try fetching real orders from MongoDB Atlas by customer email
    fetch(`/api/orders?email=${encodeURIComponent(cleanEmail)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.orders && Array.isArray(data.orders)) {
          const mapped: UserOrder[] = data.orders.map((o: any) => ({
            orderId: o.orderId,
            date: new Date(o.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            total: o.total,
            itemsCount:
              o.items?.reduce((acc: number, it: any) => acc + (it.quantity || 1), 0) || 1,
            itemsSummary: o.items?.[0]?.name || "Custom Merchandise",
            status: o.status || "Order Placed & Confirmed",
            paymentMethod: (o.paymentMethod || "UPI").toUpperCase(),
          }));
          setOrders(mapped);
          try {
            localStorage.setItem(
              `myprinthub_orders_${cleanEmail}`,
              JSON.stringify(mapped)
            );
          } catch {}
          return;
        }
      })
      .catch(() => {});

    // For any new user account with zero placed orders, start empty
    setOrders([]);
  }, []);

  // Initial mount: load saved user session
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Clean up legacy global orders that improperly leaked across all accounts
      try {
        localStorage.removeItem("myprinthub_orders");
      } catch {}

      try {
        const savedUser = localStorage.getItem("myprinthub_user");
        if (savedUser && typeof savedUser === "string" && savedUser.trim().length > 0) {
          const parsed = JSON.parse(savedUser);
          if (parsed && typeof parsed === "object" && parsed.email) {
            setUser(parsed);
            loadOrdersForUser(parsed.email);
            return;
          }
        }
      } catch {
        localStorage.removeItem("myprinthub_user");
      }

      setUser(null);
      setOrders([]);
    }
  }, [loadOrdersForUser]);

  const login = (email: string, _password?: string, name?: string, phone?: string) => {
    const cleanEmail = email.toLowerCase().trim();

    if (cleanEmail === "vikram.demo@myprinthub.in") {
      setUser(DEMO_USER);
      setOrders(DEMO_ORDERS);
      if (typeof window !== "undefined") {
        localStorage.setItem("myprinthub_user", JSON.stringify(DEMO_USER));
      }
      return;
    }

    const profileName = name || cleanEmail.split("@")[0];
    const profilePhone = phone || "+91 98765 43210";

    const profile: UserProfile = {
      name: profileName,
      email: cleanEmail,
      phone: profilePhone,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };

    setUser(profile);
    loadOrdersForUser(cleanEmail);

    if (typeof window !== "undefined") {
      localStorage.setItem("myprinthub_user", JSON.stringify(profile));
    }
  };

  const signup = (name: string, email: string, phone: string) => {
    const cleanEmail = email.toLowerCase().trim();
    const profile: UserProfile = {
      name,
      email: cleanEmail,
      phone,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };

    setUser(profile);
    // Newly created account starts with clean 0 orders
    setOrders([]);

    if (typeof window !== "undefined") {
      localStorage.setItem("myprinthub_user", JSON.stringify(profile));
      localStorage.setItem(`myprinthub_orders_${cleanEmail}`, JSON.stringify([]));
    }
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
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
    if (!user) return;
    const cleanEmail = user.email.toLowerCase().trim();
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `myprinthub_orders_${cleanEmail}`,
          JSON.stringify(updated)
        );
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
