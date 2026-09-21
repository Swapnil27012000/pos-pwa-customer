"use client";

import React, { useState } from "react";
import { PhoneDownloadIcon, CheckIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const PwaInstallCard: React.FC = () => {
  const { data } = useRestaurant();
  const { pwaPromo } = data;
  const [installed, setInstalled] = useState(false);

  const handleInstallClick = () => {
    setInstalled(true);
    setTimeout(() => setInstalled(false), 3000);
  };

  return (
    <section className="bg-[#FFF1EC] rounded-2xl border border-[#FFDCD4] p-3.5 flex items-center justify-between gap-3 shadow-xs">
      {/* Left Icon */}
      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#FF5A38] to-[#FF451A] text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/20">
        <PhoneDownloadIcon size={22} />
      </div>

      {/* Center Details */}
      <div className="flex-1 min-w-0">
        <span className="inline-block px-2 py-0.2 rounded-full text-[10.5px] font-bold text-[#E84E2E] bg-[#FFE0D6]">
          {pwaPromo.badge}
        </span>
        <h3 className="text-[15.5px] font-bold text-[#181C23] leading-tight mt-0.5">
          {pwaPromo.title}
        </h3>
        <p className="text-[12px] text-[#687182] font-normal truncate mt-0.5">
          {pwaPromo.description}
        </p>
      </div>

      {/* Right Action Button */}
      <button
        type="button"
        onClick={handleInstallClick}
        className={`px-3.5 py-2 rounded-xl text-[12.5px] font-bold transition shadow-sm shrink-0 active:scale-95 flex items-center gap-1.5 ${
          installed
            ? "bg-emerald-600 text-white"
            : "bg-[#FF5A38] hover:bg-[#E84E2E] text-white"
        }`}
      >
        {installed ? (
          <>
            <CheckIcon size={14} />
            <span>Ready!</span>
          </>
        ) : (
          pwaPromo.buttonText
        )}
      </button>
    </section>
  );
};
