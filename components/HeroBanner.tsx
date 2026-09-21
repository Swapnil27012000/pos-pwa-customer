"use client";

import React from "react";
import { UtensilsIcon, CalendarIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const HeroBanner: React.FC = () => {
  const { data, setIsBookTableOpen } = useRestaurant();
  const { heroBanner } = data;

  const scrollToMenu = () => {
    const el = document.getElementById("popular-dishes");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#1E2026] via-[#2A2C37] to-[#1E2026] p-5 text-white shadow-md">
      {/* Ambient warm lighting overlay */}
      <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#FF5A38]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#FF5A38]/10 blur-2xl" />

      <div className="relative z-10">
        {/* Top Tag */}
        <span className="inline-block px-3 py-1 rounded-full bg-[#FF5A38] text-white text-[10.5px] font-bold tracking-wider uppercase">
          {heroBanner.badge}
        </span>

        {/* Headline */}
        <h2 className="text-[24px] font-extrabold tracking-tight leading-[1.2] mt-3 whitespace-pre-line text-white">
          {heroBanner.headline}
        </h2>

        {/* Subtitle */}
        <p className="text-[13px] text-gray-300/90 font-normal mt-2 leading-relaxed max-w-[95%]">
          {heroBanner.subheadline}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            type="button"
            onClick={scrollToMenu}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#FF5A38] hover:bg-[#E84E2E] active:scale-97 text-white text-[13.5px] font-bold shadow-sm transition"
          >
            <UtensilsIcon size={16} />
            <span>{heroBanner.primaryActionText}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsBookTableOpen(true)}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#2E323D] hover:bg-[#393E4C] active:scale-97 text-white text-[13.5px] font-semibold border border-[#454A5A] transition"
          >
            <CalendarIcon size={16} />
            <span>{heroBanner.secondaryActionText}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
