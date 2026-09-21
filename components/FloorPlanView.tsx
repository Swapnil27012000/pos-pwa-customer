"use client";

import React, { useState } from "react";
import { TableIcon, QrScanIcon, CheckIcon, CalendarIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const FloorPlanView: React.FC = () => {
  const { data, setIsBookTableOpen } = useRestaurant();
  const [selectedTable, setSelectedTable] = useState<string>("T12");

  const tables = [
    { id: "T10", section: "Window Section", capacity: 2, status: "occupied" },
    { id: "T11", section: "Window Section", capacity: 4, status: "reserved" },
    { id: "T12", section: "Indoor Garden (Current)", capacity: 4, status: "current" },
    { id: "T14", section: "Main Dining", capacity: 6, status: "available" },
    { id: "T15", section: "Main Dining", capacity: 2, status: "available" },
    { id: "T16", section: "Patio Terrace", capacity: 4, status: "available" },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Current Table Card */}
      <div className="bg-white rounded-2xl border border-[#EDEFF2] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
            Current Table Verified
          </span>
          <span className="text-[12px] font-bold text-[#FF5A38]">Active Session</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFF1EE] text-[#FF5A38] flex items-center justify-center shrink-0">
            <TableIcon size={24} />
          </div>
          <div>
            <h3 className="text-[16.5px] font-bold text-[#181C23]">
              Table {data.restaurant.tableNumber} • {data.restaurant.tableArea}
            </h3>
            <p className="text-[12.5px] text-[#687182]">
              {data.restaurant.name} ({data.restaurant.branchName})
            </p>
          </div>
        </div>

        {/* QR Pass Box */}
        <div className="p-3 rounded-xl bg-[#F7F8FA] border border-[#EDEFF2] flex items-center justify-between text-[12.5px]">
          <div className="flex items-center gap-2 text-[#181C23]">
            <QrScanIcon size={16} className="text-[#FF5A38]" />
            <span className="font-semibold">Pass ID: #RES-9842</span>
          </div>
          <span className="text-emerald-600 font-bold">● Confirmed</span>
        </div>
      </div>

      {/* Interactive Floor Plan Map */}
      <div className="bg-white rounded-2xl border border-[#EDEFF2] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[15.5px] font-bold text-[#181C23]">Restaurant Floor Layout</h3>
          <span className="text-[12px] text-[#687182]">Tap to inspect table</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-1">
          {tables.map((t) => {
            const isCurrent = t.id === "T12";
            const isSelected = selectedTable === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTable(t.id)}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${
                  isCurrent
                    ? "bg-[#FFF1EE] border-[#FF5A38] text-[#E84E2E] ring-2 ring-[#FF5A38]/30 font-bold"
                    : isSelected
                    ? "bg-[#F4F6FA] border-[#181C23] text-[#181C23] font-bold"
                    : "bg-[#F7F8FA] border-[#EDEFF2] text-[#687182]"
                }`}
              >
                <TableIcon size={18} />
                <span className="text-[13px] font-bold">{t.id}</span>
                <span className="text-[10px] font-medium opacity-80">
                  {isCurrent ? "Your Table" : `${t.capacity} Seats`}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsBookTableOpen(true)}
          className="w-full py-2.5 rounded-xl bg-[#2E323D] hover:bg-[#393E4C] text-white text-[13px] font-semibold flex items-center justify-center gap-2 transition mt-2"
        >
          <CalendarIcon size={15} />
          <span>Reserve Another Table</span>
        </button>
      </div>
    </div>
  );
};
