"use client";

import React from "react";
import { useRestaurant } from "@/context/RestaurantContext";

export const CategoryList: React.FC = () => {
  const { data, activeCategory, setActiveCategory } = useRestaurant();
  const { categories } = data;

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-[#181C23] tracking-tight">
          Explore Categories
        </h2>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("popular-dishes");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-[13.5px] font-bold text-[#B91C1C] hover:text-[#991B1B] hover:underline"
        >
          View All
        </button>
      </div>

      {/* Horizontal Scrollable Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[13.5px] whitespace-nowrap shrink-0 transition shadow-xs active:scale-97 ${
                isActive
                  ? "bg-[#FFEFE9] border border-[#FF5A38] text-[#181C23] font-bold ring-1 ring-[#FF5A38]/30"
                  : "bg-white border border-[#EDEFF2] text-[#374151] font-medium hover:border-gray-300"
              }`}
            >
              <span className="text-[16px]">{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
