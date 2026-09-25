"use client";

import React from "react";
import { QrScanIcon, TableIcon, UtensilsIcon, RotateCcwIcon, BellRingIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const DineInBanner: React.FC = () => {
  const { data, setIsCallServerOpen, setActiveCategory } = useRestaurant();
  const { restaurant } = data;

  return (
    <section className="bg-white rounded-2xl border border-[#EDEFF2] p-4 shadow-xs">
      {/* Top row: Dine-in Badge + Table Icon */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EEF2FF] text-[#4F46E5] text-[12px] font-semibold">
          <QrScanIcon size={14} className="stroke-[2.2]" />
          <span>Dine-In Verified</span>
        </div>

        <div className="w-10 h-10 rounded-xl bg-[#FFF1EE] text-[#FF5A38] flex items-center justify-center">
          <TableIcon size={20} className="stroke-[2.2]" />
        </div>
      </div>

      {/* Greeting and Table Area */}
      <div className="mt-2.5">
        <h2 className="text-[18px] font-bold text-[#181C23] tracking-tight">
          Welcome to {restaurant.name}
        </h2>
        <p className="text-[13px] text-[#687182] font-medium mt-0.5">
          Assigned to {restaurant.tableNumber.startsWith("Table") ? restaurant.tableNumber : `Table ${restaurant.tableNumber}`} • {restaurant.tableArea}
        </p>
      </div>

      {/* 3 Quick Action Buttons */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {/* Browse Menu */}
        <button
          type="button"
          onClick={() => {
            setActiveCategory("all");
            const el = document.getElementById("popular-dishes");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#F4F6FA] hover:bg-[#EBF0F8] active:scale-97 transition border border-transparent"
        >
          <UtensilsIcon size={18} className="text-[#FF5A38]" />
          <span className="text-[12.5px] font-semibold text-[#181C23]">Browse Menu</span>
        </button>

        {/* Fast Re-order */}
        <button
          type="button"
          onClick={() => {
            setActiveCategory("all");
            const el = document.getElementById("popular-dishes");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#F4F6FA] hover:bg-[#EBF0F8] active:scale-97 transition border border-transparent"
        >
          <RotateCcwIcon size={18} className="text-[#FF5A38]" />
          <span className="text-[12.5px] font-semibold text-[#181C23]">Fast Re-order</span>
        </button>

        {/* Call Server */}
        <button
          type="button"
          onClick={() => setIsCallServerOpen(true)}
          className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#FFF1EE] hover:bg-[#FFEAE3] active:scale-97 transition border border-[#FFDCD4]/60"
        >
          <BellRingIcon size={18} className="text-[#E84E2E]" />
          <span className="text-[12.5px] font-semibold text-[#E84E2E]">Call Server</span>
        </button>
      </div>
    </section>
  );
};
