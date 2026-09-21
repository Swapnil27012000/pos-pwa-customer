"use client";

import React, { useState } from "react";
import { BellRingIcon, CheckIcon, CloseIcon } from "../Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const CallServerModal: React.FC = () => {
  const { isCallServerOpen, setIsCallServerOpen, data } = useRestaurant();
  const [selectedReason, setSelectedReason] = useState<string>("Call Waiter");
  const [sent, setSent] = useState<boolean>(false);

  if (!isCallServerOpen) return null;

  const reasons = [
    "Call Waiter",
    "Request Water",
    "Extra Cutlery / Plates",
    "Clean Table",
    "Request Final Bill",
  ];

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setIsCallServerOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/45 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-[#EDEFF2] animate-in slide-in-from-bottom duration-250">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDEFF2] pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFF1EE] text-[#E84E2E] flex items-center justify-center">
              <BellRingIcon size={18} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#181C23]">
                Call Server
              </h3>
              <p className="text-[12px] text-[#687182]">
                Assigned to Table {data.restaurant.tableNumber}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCallServerOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Content */}
        {sent ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckIcon size={28} />
            </div>
            <h4 className="text-[17px] font-bold text-[#181C23]">
              Server Notified!
            </h4>
            <p className="text-[13px] text-[#687182]">
              A server has been dispatched to Table {data.restaurant.tableNumber}.
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <label className="text-[13px] font-bold text-[#181C23] block">
              What do you need assistance with?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {reasons.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedReason(r)}
                  className={`px-3.5 py-2.5 rounded-xl text-left text-[13.5px] font-semibold transition border ${
                    selectedReason === r
                      ? "border-[#FF5A38] bg-[#FFF1EE] text-[#E84E2E]"
                      : "border-[#EDEFF2] bg-[#F7F8FA] text-[#181C23] hover:border-gray-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSend}
              className="w-full py-3 rounded-xl bg-[#FF5A38] hover:bg-[#E84E2E] active:scale-98 text-white font-bold text-[14px] shadow-sm transition mt-2"
            >
              Notify Table {data.restaurant.tableNumber} Server
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
