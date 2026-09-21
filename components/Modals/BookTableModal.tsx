"use client";

import React, { useState } from "react";
import { CalendarIcon, ClockIcon, CheckIcon, CloseIcon, TableIcon } from "../Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const BookTableModal: React.FC = () => {
  const { isBookTableOpen, setIsBookTableOpen, data } = useRestaurant();
  const [guestCount, setGuestCount] = useState<number>(4);
  const [selectedSlot, setSelectedSlot] = useState<string>("1:00 PM");
  const [reserved, setReserved] = useState<boolean>(false);

  if (!isBookTableOpen) return null;

  const slots = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"];

  const handleConfirm = () => {
    setReserved(true);
    setTimeout(() => {
      setReserved(false);
      setIsBookTableOpen(false);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-[#EDEFF2] animate-in slide-in-from-bottom duration-250">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDEFF2] pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFF1EE] text-[#FF5A38] flex items-center justify-center">
              <CalendarIcon size={18} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#181C23]">Reserve a Table</h3>
              <p className="text-[12px] text-[#687182]">
                {data.restaurant.branchName} • Table {data.restaurant.tableNumber}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsBookTableOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {reserved ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckIcon size={28} />
            </div>
            <h4 className="text-[18px] font-bold text-[#181C23]">Table Reserved Successfully!</h4>
            <p className="text-[13px] text-[#687182]">
              Pass ID: #RES-9842 • Table {data.restaurant.tableNumber} confirmed for {guestCount} Guests.
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            {/* Number of Guests */}
            <div>
              <label className="text-[13px] font-bold text-[#181C23] block mb-2">
                Number of Guests
              </label>
              <div className="flex items-center gap-2">
                {[2, 4, 6, 8].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setGuestCount(count)}
                    className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition border ${
                      guestCount === count
                        ? "bg-[#FF5A38] text-white border-[#FF5A38]"
                        : "bg-[#F7F8FA] text-[#181C23] border-[#EDEFF2] hover:border-gray-300"
                    }`}
                  >
                    {count} Guests
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="text-[13px] font-bold text-[#181C23] block mb-2">
                Select Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2 rounded-xl text-[12.5px] font-semibold transition border ${
                      selectedSlot === slot
                        ? "bg-[#FFF1EE] text-[#E84E2E] border-[#FF5A38]"
                        : "bg-[#F7F8FA] text-[#181C23] border-[#EDEFF2]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Dining Area */}
            <div className="p-3 rounded-xl bg-[#F7F8FA] border border-[#EDEFF2] flex items-center justify-between text-[12.5px]">
              <div className="flex items-center gap-2 text-[#181C23] font-semibold">
                <TableIcon size={16} className="text-[#FF5A38]" />
                <span>Table {data.restaurant.tableNumber}</span>
              </div>
              <span className="text-[#687182]">{data.restaurant.tableArea}</span>
            </div>

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl bg-[#FF5A38] hover:bg-[#E84E2E] active:scale-98 text-white font-bold text-[14.5px] shadow-sm transition mt-2"
            >
              Confirm Reservation ({selectedSlot})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
