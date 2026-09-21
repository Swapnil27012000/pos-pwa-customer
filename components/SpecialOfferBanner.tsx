"use client";

import React from "react";
import { CopyIcon, CheckIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const SpecialOfferBanner: React.FC = () => {
  const { data, copyCoupon, copiedCouponToast } = useRestaurant();
  const { specialOffer } = data;

  const scrollToMenu = () => {
    const el = document.getElementById("popular-dishes");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isCopied = copiedCouponToast?.includes(specialOffer.couponCode);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#FF3A13] via-[#FF522B] to-[#FF603A] p-4 text-white shadow-md">
      {/* Subtle background glow effect */}
      <div className="pointer-events-none absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl" />

      {/* Special Offer Pill Badge */}
      <div className="inline-block px-2.5 py-0.5 rounded-md bg-black/20 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase">
        {specialOffer.badge}
      </div>

      {/* Offer Title & Details */}
      <h3 className="text-[21px] font-extrabold tracking-tight text-white mt-1.5">
        {specialOffer.title}
      </h3>
      <p className="text-[12.5px] text-white/90 font-medium mt-0.5">
        {specialOffer.description}
      </p>

      {/* Coupon Code & Order Now Action Row */}
      <div className="flex items-center justify-between gap-3 mt-3.5 pt-0.5">
        {/* Click to Copy Coupon Badge */}
        <button
          type="button"
          onClick={() => copyCoupon(specialOffer.couponCode)}
          title="Click to copy coupon code"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/25 text-white text-[12.5px] font-mono font-bold tracking-wide transition active:scale-95"
        >
          <span>{specialOffer.couponCode}</span>
          {isCopied ? (
            <CheckIcon size={14} className="text-emerald-300" />
          ) : (
            <CopyIcon size={13} className="text-white/80" />
          )}
        </button>

        {/* Order Now Button */}
        <button
          type="button"
          onClick={scrollToMenu}
          className="px-4 py-2 rounded-full bg-white hover:bg-gray-100 active:scale-95 text-[#FF3A13] text-[13px] font-extrabold shadow-sm transition"
        >
          {specialOffer.buttonText}
        </button>
      </div>
    </section>
  );
};
