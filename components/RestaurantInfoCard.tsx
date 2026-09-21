"use client";

import React from "react";
import { StarIcon, ClockIcon, UtensilsIcon, WalletIcon, MapPinIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const RestaurantInfoCard: React.FC = () => {
  const { data } = useRestaurant();
  const { restaurant } = data;

  return (
    <section className="bg-white rounded-2xl border border-[#EDEFF2] p-4 shadow-xs">
      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
        {/* Rating */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFEFEA] flex items-center justify-center text-[#FF5A38] shrink-0">
            <StarIcon size={15} />
          </div>
          <div>
            <div className="text-[11px] text-[#687182] font-medium">Rating</div>
            <div className="text-[14.5px] font-bold text-[#181C23] leading-tight">
              {restaurant.rating}{" "}
              <span className="text-[12px] font-normal text-[#687182]">
                ({restaurant.reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFF4EE] flex items-center justify-center text-[#FF5A38] shrink-0">
            <ClockIcon size={15} />
          </div>
          <div>
            <div className="text-[11px] text-[#687182] font-medium">Opening Hours</div>
            <div className="text-[14.5px] font-bold text-[#181C23] leading-tight">
              {restaurant.openingHours}
            </div>
          </div>
        </div>

        {/* Cuisine */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#EEF4FF] flex items-center justify-center text-[#3B82F6] shrink-0">
            <UtensilsIcon size={15} />
          </div>
          <div>
            <div className="text-[11px] text-[#687182] font-medium">Cuisine</div>
            <div className="text-[14.5px] font-bold text-[#181C23] leading-tight">
              {restaurant.cuisine}
            </div>
          </div>
        </div>

        {/* Avg Price */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFEFEA] flex items-center justify-center text-[#E84E2E] shrink-0">
            <WalletIcon size={15} />
          </div>
          <div>
            <div className="text-[11px] text-[#687182] font-medium">Avg Price</div>
            <div className="text-[14.5px] font-bold text-[#181C23] leading-tight">
              {restaurant.avgPrice}
            </div>
          </div>
        </div>
      </div>

      {/* Address & Map Row */}
      <div className="border-t border-[#EDEFF2] mt-3.5 pt-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12.5px] text-[#4B5563] font-medium truncate pr-2">
          <MapPinIcon size={15} className="text-[#FF5A38] shrink-0" />
          <span className="truncate">{restaurant.address}</span>
        </div>
        <a
          href={restaurant.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13.5px] font-bold text-[#B91C1C] hover:text-[#991B1B] hover:underline shrink-0"
        >
          Map
        </a>
      </div>
    </section>
  );
};
