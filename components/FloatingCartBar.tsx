"use client";

import React from "react";
import { ShoppingBagIcon, ArrowRightIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const FloatingCartBar: React.FC = () => {
  const { cart, data, setIsCartOpen } = useRestaurant();

  if (cart.itemCount === 0) return null;

  const currencySymbol =
    data.restaurant.currency?.toUpperCase() === "USD"
      ? "$"
      : data.restaurant.currency?.toUpperCase() === "EUR"
      ? "€"
      : data.restaurant.currency?.toUpperCase() === "GBP"
      ? "£"
      : "₹";

  const displayTable = cart.tableNumber.startsWith("Table")
    ? cart.tableNumber
    : `Table ${cart.tableNumber}`;

  return (
    <div className="sticky bottom-18 z-20 px-4 w-full max-w-md mx-auto pointer-events-auto">
      <div
        onClick={() => setIsCartOpen(true)}
        className="bg-[#1E2229] hover:bg-[#252932] transition cursor-pointer text-white rounded-2xl p-2.5 px-3.5 shadow-xl shadow-black/25 flex items-center justify-between border border-white/5 active:scale-[0.99]"
      >
        {/* Left: Orange Bag + Order Details */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF5A38] text-white flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
            <ShoppingBagIcon size={20} />
          </div>

          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-white tracking-tight">
              {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} in Order
            </span>
            <span className="text-[12px] text-gray-400 font-medium tnum">
              {currencySymbol}{cart.totalAmount} • {displayTable}
            </span>
          </div>
        </div>

        {/* Right: View Cart Action */}
        <div className="flex items-center gap-1.5 text-[13.5px] font-bold text-white pr-1">
          <span>View Cart</span>
          <ArrowRightIcon size={16} className="stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
