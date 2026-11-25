"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, X, Navigation, Check, Clock, Truck, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { lookupOfflinePincode } from "@/lib/pincode";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPincode: string;
  currentCity: string;
  onSaveLocation: (pincode: string, city: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentPincode,
  currentCity,
  onSaveLocation,
}) => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [error, setError] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedInfo, setDetectedInfo] = useState<{ city: string; state: string } | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const popularHubs = [
    { city: "Ranchi Hub", pincode: "834001", state: "Jharkhand", speed: "24h Dispatch" },
    { city: "New Delhi", pincode: "110001", state: "Delhi", speed: "24-48h Delivery" },
    { city: "Mumbai", pincode: "400001", state: "Maharashtra", speed: "2-3 Days" },
    { city: "Bengaluru", pincode: "560001", state: "Karnataka", speed: "2-3 Days" },
    { city: "Hyderabad", pincode: "500001", state: "Telangana", speed: "2-3 Days" },
    { city: "Kolkata", pincode: "700001", state: "West Bengal", speed: "3-4 Days" },
  ];

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      setPincodeInput(currentPincode || "");
      setError("");
      if (currentPincode && currentPincode.length === 6) {
        const match = lookupOfflinePincode(currentPincode);
        if (match) {
          setDetectedInfo({ city: match.city, state: match.state });
        }
      } else {
        setDetectedInfo(null);
      }
      setTimeout(() => inputRef.current?.focus(), 50);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentPincode, onClose]);

  const handleInputChange = async (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 6);
    setPincodeInput(clean);
    setError("");

    if (clean.length === 6) {
      // 1. Instant offline resolution for 0-latency UI
      const offline = lookupOfflinePincode(clean);
      if (offline) {
        setDetectedInfo({ city: offline.city, state: offline.state });
      }

      // 2. Asynchronous API resolution
      setIsLookingUp(true);
      try {
        const res = await fetch(`/api/pincode/${clean}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.city && data.state) {
            setDetectedInfo({ city: data.city, state: data.state });
          }
        }
      } catch {
        // Keep offline detection
      } finally {
        setIsLookingUp(false);
      }
    } else {
      setDetectedInfo(null);
    }
  };

  const handleApply = (pin: string, cityName?: string) => {
    const clean = pin.trim().replace(/\D/g, "");
    if (clean.length !== 6) {
      setError("Please enter a valid 6-digit Indian PIN code");
      return;
    }

    // Determine city name from detected info, preset, or generic
    const found = popularHubs.find((h) => h.pincode === clean);
    const resolvedCity =
      cityName ||
      (detectedInfo ? `${detectedInfo.city}, ${detectedInfo.state}` : (found ? found.city : `PIN ${clean}`));

    onSaveLocation(clean, resolvedCity);
    onClose();
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      () => {
        setIsDetecting(false);
        // Default to regional hub when located
        handleApply("110001", "Delhi NCR");
      },
      () => {
        setIsDetecting(false);
        setError("Unable to access location. Please enter your PIN code manually.");
      },
      { timeout: 8000 }
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-accent-soft)] flex items-center justify-center text-[#F95738]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-none">
                Delivery Location
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Check express delivery &amp; dispatch speeds
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Enter 6-Digit Indian PIN Code
              </label>
              {isLookingUp && (
                <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                  <Loader2 className="w-2.5 h-2.5 animate-spin text-[#F95738]" />
                  Locating circle...
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleApply(pincodeInput);
                  }
                }}
                placeholder="e.g. 834001 or 110001"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F95738]/20 focus:border-[#F95738]"
              />
              <button
                type="button"
                onClick={() => handleApply(pincodeInput)}
                className="px-4 py-2.5 bg-[#F95738] hover:bg-[#E03A1B] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-xs text-rose-500 font-semibold mt-1.5">{error}</p>}

            {/* Auto-detected City & State Card */}
            {detectedInfo && (
              <div className="mt-2.5 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] sm:text-xs">
                    Auto-detected: <strong>{detectedInfo.city}</strong>, {detectedInfo.state}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full shrink-0">
                  Verified Hub
                </span>
              </div>
            )}
          </div>

          {/* Detect Location Button */}
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Navigation className={`w-3.5 h-3.5 text-[#F95738] ${isDetecting ? "animate-spin" : ""}`} />
            <span>{isDetecting ? "Locating your region..." : "Detect my location automatically"}</span>
          </button>

          {/* Quick Select Popular Delivery Hubs */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Popular Shipping Hubs
            </span>
            <div className="grid grid-cols-2 gap-2">
              {popularHubs.map((hub) => {
                const isSelected = currentPincode === hub.pincode;
                return (
                  <button
                    key={hub.pincode}
                    type="button"
                    onClick={() => handleApply(hub.pincode, hub.city)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[var(--color-accent-soft)] border-[#F95738] text-[#1E1B4B] shadow-2xs"
                        : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold truncate">{hub.city}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#F95738] shrink-0" />}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                      <span>{hub.pincode}</span>
                      <span className="text-emerald-600 font-semibold">{hub.speed}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dispatch Notice Card */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-xs text-slate-600">
            <Truck className="w-4 h-4 text-[#F95738] shrink-0" />
            <div className="text-[11px] leading-tight">
              <strong>Factory Direct:</strong> Dispatched from our Ranchi studio lab floor within 24–48 hours across India.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

