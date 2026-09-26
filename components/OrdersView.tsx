"use client";

import React, { useState } from "react";
import { CheckIcon, ClockIcon, UtensilsIcon, BellRingIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const OrdersView: React.FC = () => {
  const { currentOrder, data, refreshCurrentOrder, setIsCallServerOpen, setActiveTab } =
    useRestaurant();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshCurrentOrder();
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const currencyCode =
    currentOrder?.currency?.toUpperCase() ||
    data.restaurant.currency?.toUpperCase() ||
    "USD";

  const currencySymbol =
    currencyCode === "USD"
      ? "$"
      : currencyCode === "EUR"
      ? "€"
      : currencyCode === "GBP"
      ? "£"
      : "₹";

  if (!currentOrder) {
    return (
      <div className="space-y-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl border border-[#EDEFF2] p-8 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF1EE] text-[#FF5A38] mx-auto flex items-center justify-center">
            <UtensilsIcon size={32} />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-[#181C23]">No Active Table Orders</h3>
            <p className="text-[13px] text-[#687182] max-w-xs mx-auto mt-1">
              Select dishes from the menu to place an order directly for your table. Real-time kitchen progress will be tracked here.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("menu")}
            className="px-6 py-3 rounded-xl bg-[#FF5A38] hover:bg-[#E84E2E] text-white font-bold text-[14px] shadow-md shadow-orange-500/20 transition inline-flex items-center gap-2"
          >
            <span>Explore Digital Menu</span>
          </button>
        </div>
      </div>
    );
  }

  // Calculate timeline stage index based on status:
  // 1: pending
  // 2: confirmed / preparing
  // 3: ready
  // 4: served / completed
  const status = currentOrder.status;
  const stage =
    status === "pending"
      ? 1
      : status === "confirmed" || status === "preparing"
      ? 2
      : status === "ready"
      ? 3
      : status === "served" || status === "completed"
      ? 4
      : 1;

  const statusLabel =
    status === "pending"
      ? "Order Received"
      : status === "confirmed"
      ? "Kitchen Confirmed"
      : status === "preparing"
      ? "Chefs Cooking"
      : status === "ready"
      ? "Ready to Serve"
      : status === "served"
      ? "Served at Table"
      : status === "completed"
      ? "Order Completed"
      : "Order Cancelled";

  const statusSubtext =
    status === "pending"
      ? "Received by POS system and dispatched to kitchen."
      : status === "confirmed"
      ? "Accepted by kitchen station and queued for preparation."
      : status === "preparing"
      ? "Freshly firing and preparing dishes for your table."
      : status === "ready"
      ? "Dishes are plated and ready. Table runner is on the way!"
      : status === "served"
      ? "Enjoy your food! All items have been served at your table."
      : status === "completed"
      ? "Order is marked completed. Thank you for dining with us!"
      : "This order was cancelled.";

  const orderTime = new Date(currentOrder.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Top Status Header Card */}
      <div className="bg-white rounded-2xl border border-[#EDEFF2] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[12px] font-semibold">
          <span className="px-2.5 py-1 rounded-md bg-[#FFEFEA] text-[#E84E2E]">
            Dine-In #{currentOrder.orderNumber}
          </span>
          <span className="text-[#687182]">
            {currentOrder.tableNumber}
            {currentOrder.tableArea ? ` • ${currentOrder.tableArea}` : ""}
          </span>
          <button
            type="button"
            onClick={handleManualRefresh}
            className="flex items-center gap-1 text-[#FF5A38] hover:text-[#E84E2E] transition"
            title="Refresh order status"
          >
            <span className={`text-[12px] ${isRefreshing ? "animate-spin" : ""}`}>🔄</span>
            <span className="text-[11.5px] font-semibold">Live Sync</span>
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F4F6FA] border border-[#EDEFF2] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF5A38] text-white flex items-center justify-center shrink-0 mt-0.5">
            <UtensilsIcon size={16} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-[14.5px] font-bold text-[#181C23]">
                {statusLabel}
              </h4>
              <span className="text-[11px] text-[#687182] flex items-center gap-1">
                <ClockIcon size={12} />
                {orderTime}
              </span>
            </div>
            <p className="text-[12px] text-[#687182] mt-0.5">
              {statusSubtext}
            </p>
          </div>
        </div>

        {/* Live Timeline */}
        <div className="py-2 pl-2 space-y-4">
          {/* Step 1: Order Received */}
          <div className="flex items-start gap-3 relative">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 z-10 font-bold ${
                stage >= 1
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {stage > 1 ? <CheckIcon size={13} /> : "1"}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="font-bold text-[#181C23]">Order Received</span>
                <span className="text-[11px] text-[#687182]">{orderTime}</span>
              </div>
              <p className="text-[12px] text-[#687182]">Sent directly from table QR session</p>
            </div>
            <div
              className={`absolute left-3 top-6 w-0.5 h-6 -ml-px ${
                stage > 1 ? "bg-emerald-400" : "bg-gray-200"
              }`}
            />
          </div>

          {/* Step 2: Kitchen Preparing */}
          <div className="flex items-start gap-3 relative">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 z-10 font-bold ${
                stage === 2
                  ? "bg-[#FF5A38] text-white animate-pulse"
                  : stage > 2
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {stage > 2 ? <CheckIcon size={13} /> : <UtensilsIcon size={12} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="font-bold text-[#181C23]">Kitchen Preparing</span>
                {stage === 2 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF5A38] text-white">
                    In Progress
                  </span>
                )}
              </div>
              <p className="text-[12px] text-[#687182]">Chefs firing fresh ingredients</p>
            </div>
            <div
              className={`absolute left-3 top-6 w-0.5 h-6 -ml-px ${
                stage > 2 ? "bg-emerald-400" : "bg-gray-200"
              }`}
            />
          </div>

          {/* Step 3: Plating & Quality Check */}
          <div
            className={`flex items-start gap-3 relative ${
              stage < 3 ? "opacity-60" : ""
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 z-10 font-bold ${
                stage === 3
                  ? "bg-[#FF5A38] text-white animate-pulse"
                  : stage > 3
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {stage > 3 ? <CheckIcon size={13} /> : "3"}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center text-[13.5px]">
                <span className="font-bold text-[#181C23]">Quality Check & Plating</span>
                {stage === 3 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF5A38] text-white">
                    Ready
                  </span>
                )}
              </div>
              <p className="text-[12px] text-[#687182]">Final inspection and garnish</p>
            </div>
            <div
              className={`absolute left-3 top-6 w-0.5 h-6 -ml-px ${
                stage > 3 ? "bg-emerald-400" : "bg-gray-200"
              }`}
            />
          </div>

          {/* Step 4: Served at Table */}
          <div
            className={`flex items-start gap-3 ${
              stage < 4 ? "opacity-60" : ""
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 z-10 font-bold ${
                stage >= 4
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {stage >= 4 ? <CheckIcon size={13} /> : "4"}
            </div>
            <div className="flex-1">
              <div className="text-[13.5px] font-bold text-[#181C23]">
                Served at {currentOrder.tableNumber}
              </div>
              <p className="text-[12px] text-[#687182]">Delivered directly by table runner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl border border-[#EDEFF2] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#EDEFF2] pb-2.5">
          <h3 className="text-[15.5px] font-bold text-[#181C23]">
            Order Summary ({currentOrder.items.length} {currentOrder.items.length === 1 ? "item" : "items"})
          </h3>
          <span className="text-[12px] font-bold text-[#FF5A38] uppercase">
            {currentOrder.type.replace("_", " ")}
          </span>
        </div>

        {/* Guest Details If Provided */}
        {currentOrder.customer && (currentOrder.customer.name || currentOrder.customer.phone) && (
          <div className="p-2.5 bg-[#F7F8FA] rounded-xl text-[12px] text-[#687182] flex items-center justify-between">
            <span className="font-semibold text-[#181C23]">
              👤 {currentOrder.customer.name || "Walk-in Guest"}
            </span>
            {currentOrder.customer.phone && <span>{currentOrder.customer.phone}</span>}
          </div>
        )}

        {/* Items List */}
        <div className="space-y-3 text-[13px] divide-y divide-[#F0F2F5]">
          {currentOrder.items.map((item, idx) => {
            const modSummary = (item.modifiers || []).map((m) => m.name).join(", ");
            return (
              <div key={item.id || idx} className="not-first:pt-2.5 flex justify-between items-start">
                <div className="space-y-0.5 max-w-[70%]">
                  <span className="font-semibold text-[#181C23] leading-tight block">
                    {item.name}
                  </span>
                  <p className="text-[11.5px] text-[#687182]">
                    {item.quantity}x • {currencySymbol}{item.unitPrice}
                    {modSummary ? ` (+ ${modSummary})` : ""}
                  </p>
                  {item.notes && (
                    <p className="text-[11px] text-[#8C95A6] italic">&ldquo;{item.notes}&rdquo;</p>
                  )}
                </div>
                <span className="font-bold text-[#181C23] tnum">
                  {currencySymbol}{item.totalPrice}
                </span>
              </div>
            );
          })}
        </div>

        {currentOrder.notes && (
          <div className="p-2.5 bg-[#FFF9F5] border border-[#FFE0D0] rounded-xl text-[12px] text-[#9A3B22]">
            <span className="font-bold">Instructions: </span>
            <span>{currentOrder.notes}</span>
          </div>
        )}

        {/* Financial Breakdown */}
        <div className="border-t border-dashed border-[#EDEFF2] pt-2.5 space-y-1 text-[13px]">
          <div className="flex justify-between text-[#687182]">
            <span>Items Subtotal</span>
            <span className="font-semibold text-[#181C23] tnum">{currencySymbol}{currentOrder.subtotal}</span>
          </div>
          <div className="flex justify-between text-[#687182]">
            <span>Tax (5%)</span>
            <span className="font-semibold text-[#181C23] tnum">{currencySymbol}{currentOrder.tax}</span>
          </div>
          <div className="flex justify-between font-bold text-[15px] pt-1 border-t border-[#EDEFF2]">
            <span>Total</span>
            <span className="text-[#FF5A38] tnum">{currencySymbol}{currentOrder.total}</span>
          </div>
        </div>

        {/* Quick Help Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setIsCallServerOpen(true)}
            className="py-2.5 px-2 rounded-xl bg-[#FFF1EE] text-[#E84E2E] text-[12.5px] font-bold flex items-center justify-center gap-1.5 border border-[#FFDCD4] hover:bg-[#FFE5DF] transition"
          >
            <BellRingIcon size={15} />
            <span>Call Waiter / Water</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("menu")}
            className="py-2.5 px-2 rounded-xl bg-[#F4F6FA] text-[#181C23] text-[12.5px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#EDEFF2] transition"
          >
            <UtensilsIcon size={15} className="text-[#FF5A38]" />
            <span>Add More Items</span>
          </button>
        </div>
      </div>
    </div>
  );
};

