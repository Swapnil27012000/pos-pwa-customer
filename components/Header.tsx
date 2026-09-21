"use client";

import React from "react";
import { UtensilsIcon, BellIcon, UserIcon, MapPinIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const Header: React.FC = () => {
  const { data } = useRestaurant();
  const { restaurant } = data;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#F7F8FA]/95 backdrop-blur-md border-b border-black/4">
      {/* Left: Brand & Table Info */}
      <div className="flex items-center gap-2.5">
        {/* Brand Icon Logo */}
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#FF5A38] to-[#FF451A] flex items-center justify-center text-white shadow-sm shadow-orange-500/20 shrink-0">
          <UtensilsIcon size={20} className="stroke-[2.2]" />
        </div>

        {/* Title and Table Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className="text-[17px] font-bold text-[#181C23] tracking-tight leading-tight">
              {restaurant.name}
            </h1>
            <span className="inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-[#FFEAE3] text-[#E84E2E]">
              {restaurant.tableNumber}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-[#687182] font-medium mt-0.5">
            <MapPinIcon size={12} className="text-[#FF5A38] shrink-0" />
            <span className="truncate">
              {restaurant.branchName} • Table {restaurant.tableNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Notification & User Icons */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-full bg-white border border-[#EDEFF2] flex items-center justify-center text-[#181C23] hover:bg-gray-50 active:scale-95 transition shadow-xs"
        >
          <BellIcon size={17} />
          {restaurant.unreadNotifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5A38] ring-2 ring-white" />
          )}
        </button>

        {/* User Profile */}
        <button
          type="button"
          aria-label="User Profile"
          className="w-9 h-9 rounded-full bg-white border border-[#EDEFF2] flex items-center justify-center text-[#181C23] hover:bg-gray-50 active:scale-95 transition shadow-xs"
        >
          <UserIcon size={18} />
        </button>
      </div>
    </header>
  );
};
