"use client";

import React from "react";
import Image from "next/image";
import { CheckIcon, ClockIcon, UtensilsIcon, BellRingIcon, QrScanIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const OrdersView: React.FC = () => {
  const { data, setIsCallServerOpen } = useRestaurant();

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Status Header Card */}
      <div className="bg-white rounded-2xl border border-[#EDEFF2] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[12px] font-semibold">
          <span className="px-2.5 py-1 rounded-md bg-[#FFEFEA] text-[#E84E2E]">
            Dine-In #1048
          </span>
          <span className="text-[#687182]">Table {data.restaurant.tableNumber}</span>
          <span className="flex items-center gap-1 text-[#E84E2E]">
            <ClockIcon size={13} />
            18–22 mins remaining
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F4F6FA] border border-[#EDEFF2] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF5A38] text-white flex items-center justify-center shrink-0 mt-0.5">
            <UtensilsIcon size={16} />
          </div>
          <div>
            <h4 className="text-[14.5px] font-bold text-[#181C23]">
              Order Placed Successfully!
            </h4>
            <p className="text-[12px] text-[#687182] mt-0.5">
              Kitchen station #2 has accepted your slip and started fire prep.
            </p>
          </div>
        </div>

        {/* Live Timeline */}
        <div className="py-2 pl-2 space-y-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3 relative">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] shrink-0 z-10">
              <CheckIcon size={13} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="font-bold text-[#181C23]">Order Received</span>
                <span className="text-[11px] text-[#687182]">12:45 PM</span>
              </div>
              <p className="text-[12px] text-[#687182]">Validated by register terminal</p>
            </div>
            <div className="absolute left-3 top-6 w-0.5 h-6 bg-emerald-300 -ml-px" />
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 relative">
            <div className="w-6 h-6 rounded-full bg-[#FF5A38] text-white flex items-center justify-center text-[11px] shrink-0 z-10 animate-pulse">
              <UtensilsIcon size={12} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="font-bold text-[#181C23]">Kitchen Preparing</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF5A38] text-white">
                  In Progress
                </span>
              </div>
              <p className="text-[12px] text-[#687182]">Chef Arjun firing Tandoor & Grill</p>
            </div>
            <div className="absolute left-3 top-6 w-0.5 h-6 bg-gray-200 -ml-px" />
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 relative opacity-60">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[11px] shrink-0 z-10">
              3
            </div>
            <div className="flex-1">
              <div className="text-[13.5px] font-bold text-[#181C23]">
                Quality Check & Plating
              </div>
              <p className="text-[12px] text-[#687182]">Garnish & temperature verification</p>
            </div>
            <div className="absolute left-3 top-6 w-0.5 h-6 bg-gray-200 -ml-px" />
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3 opacity-60">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-[11px] shrink-0 z-10">
              4
            </div>
            <div className="flex-1">
              <div className="text-[13.5px] font-bold text-[#181C23]">
                Served at Table {data.restaurant.tableNumber}
              </div>
              <p className="text-[12px] text-[#687182]">Direct service by table runner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl border border-[#EDEFF2] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#EDEFF2] pb-2.5">
          <h3 className="text-[15.5px] font-bold text-[#181C23]">
            Order Summary (3 items)
          </h3>
          <span className="text-[12px] font-bold text-emerald-600">Paid • Dine-in</span>
        </div>

        <div className="space-y-2.5 text-[13px]">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-[#181C23]">Paneer Tikka</span>
              <p className="text-[11.5px] text-[#687182]">1x • Regular Serving</p>
            </div>
            <span className="font-bold text-[#181C23] tnum">₹249</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-[#181C23]">Garlic Butter Naan</span>
              <p className="text-[11.5px] text-[#687182]">2x • Fresh Tandoor</p>
            </div>
            <span className="font-bold text-[#181C23] tnum">₹178</span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-[#181C23]">Artisanal Mango Lassi</span>
              <p className="text-[11.5px] text-[#687182]">1x • Chilled</p>
            </div>
            <span className="font-bold text-[#181C23] tnum">₹160</span>
          </div>
        </div>

        <div className="border-t border-dashed border-[#EDEFF2] pt-2.5 flex justify-between font-bold text-[14.5px]">
          <span>Subtotal & Taxes</span>
          <span className="text-[#FF5A38] tnum">₹627</span>
        </div>

        {/* Quick Help Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setIsCallServerOpen(true)}
            className="py-2.5 px-2 rounded-xl bg-[#FFF1EE] text-[#E84E2E] text-[12.5px] font-bold flex items-center justify-center gap-1.5 border border-[#FFDCD4]"
          >
            <BellRingIcon size={15} />
            <span>Call Waiter / Water</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("popular-dishes");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="py-2.5 px-2 rounded-xl bg-[#F4F6FA] text-[#181C23] text-[12.5px] font-bold flex items-center justify-center gap-1.5"
          >
            <UtensilsIcon size={15} className="text-[#FF5A38]" />
            <span>Add More Items</span>
          </button>
        </div>
      </div>
    </div>
  );
};
