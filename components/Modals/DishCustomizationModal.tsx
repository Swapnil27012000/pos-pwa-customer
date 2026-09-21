"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StarIcon, ClockIcon, CloseIcon, PlusIcon } from "../Icons";
import { VegNonVegBadge } from "../VegNonVegBadge";
import { useRestaurant } from "@/context/RestaurantContext";

export const DishCustomizationModal: React.FC = () => {
  const { selectedDishForCustomization, setSelectedDishForCustomization, addToCart } = useRestaurant();

  const [quantity, setQuantity] = useState(1);
  const [selectedPortion, setSelectedPortion] = useState("reg");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");

  if (!selectedDishForCustomization) return null;
  const dish = selectedDishForCustomization;

  const portionOptions = dish.portionSizes || [
    { id: "reg", name: "Regular Serving", price: 0, included: true },
    { id: "large", name: "Large Serving", price: 80 },
  ];

  const extrasOptions = [
    { id: "cheese", name: "Extra Melted Cheese Layer", price: 40 },
    { id: "chutney", name: "Spicy Mint & Coriander Chutney", price: 20 },
    { id: "sides", name: "Grilled Herb Skewers", price: 60 },
  ];

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate dynamic price
  const portionPrice = portionOptions.find((p) => p.id === selectedPortion)?.price || 0;
  const extrasPrice = selectedExtras.reduce((sum, extraId) => {
    const extra = extrasOptions.find((e) => e.id === extraId);
    return sum + (extra?.price || 0);
  }, 0);

  const unitPrice = dish.price + portionPrice + extrasPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(dish, quantity, selectedPortion, selectedExtras);
    setSelectedDishForCustomization(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 animate-in fade-in duration-200 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl border border-[#EDEFF2] max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-250">
        {/* Top Image Banner */}
        <div className="relative h-56 w-full shrink-0 bg-gray-900">
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/30" />

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setSelectedDishForCustomization(null)}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center backdrop-blur-xs transition shadow-md"
          >
            <CloseIcon size={16} />
          </button>

          {/* Dish Header Info over banner bottom */}
          <div className="absolute bottom-3 left-4 right-4 z-10 text-white">
            <div className="flex items-center gap-2 mb-1">
              <VegNonVegBadge isVeg={dish.isVeg} size={15} />
              {dish.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FF5A38] text-white">
                  {dish.badge}
                </span>
              )}
            </div>

            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-[20px] font-bold text-white tracking-tight leading-tight">
                  {dish.name}
                </h2>
                <div className="flex items-center gap-3 text-[12px] text-gray-200 mt-1">
                  <span className="flex items-center gap-1 font-semibold text-amber-300">
                    <StarIcon size={13} />
                    {dish.rating} ({dish.reviewsCount || "1.2k"})
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon size={13} />
                    {dish.prepTimeMinutes || 15} mins
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-gray-300">Base price</div>
                <div className="text-[20px] font-extrabold text-white tnum">
                  ₹{dish.price}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Customization Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {/* Quantity Selector */}
          <div className="bg-[#F4F6FA] rounded-2xl p-3 flex items-center justify-between">
            <div>
              <div className="text-[14.5px] font-bold text-[#181C23]">Quantity</div>
              <div className="text-[12px] text-[#687182]">Adjust servings for table</div>
            </div>

            <div className="flex items-center gap-3 bg-white px-2 py-1.5 rounded-xl border border-[#EDEFF2] shadow-xs">
              <button
                type="button"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 flex items-center justify-center font-bold text-gray-700"
              >
                -
              </button>
              <span className="text-[15px] font-bold text-[#181C23] w-4 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 rounded-lg bg-[#FF5A38] text-white hover:bg-[#E84E2E] flex items-center justify-center font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Portion Size Radio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[14.5px] font-bold text-[#181C23]">Choose Portion Size</h4>
              <span className="text-[11px] font-bold text-[#FF5A38] bg-[#FFF1EE] px-2 py-0.5 rounded-full">
                Required (1)
              </span>
            </div>

            <div className="space-y-2">
              {portionOptions.map((opt) => {
                const selected = selectedPortion === opt.id;
                return (
                  <label
                    key={opt.id}
                    onClick={() => setSelectedPortion(opt.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      selected
                        ? "border-[#FF5A38] bg-[#FFF1EE]"
                        : "border-[#EDEFF2] bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          selected ? "border-[#FF5A38]" : "border-gray-300"
                        }`}
                      >
                        {selected && <div className="w-2 h-2 rounded-full bg-[#FF5A38]" />}
                      </div>
                      <span className="text-[13.5px] font-semibold text-[#181C23]">
                        {opt.name}
                      </span>
                    </div>
                    <span className="text-[13px] font-medium text-[#687182]">
                      {opt.price === 0 ? "Included" : `+₹${opt.price}`}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Extras / Modifiers Checkboxes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[14.5px] font-bold text-[#181C23]">Add Extras & Modifiers</h4>
              <span className="text-[11px] text-[#687182]">Optional</span>
            </div>

            <div className="space-y-2">
              {extrasOptions.map((extra) => {
                const selected = selectedExtras.includes(extra.id);
                return (
                  <label
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                      selected
                        ? "border-[#FF5A38] bg-[#FFF1EE]"
                        : "border-[#EDEFF2] bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          selected
                            ? "bg-[#FF5A38] border-[#FF5A38] text-white"
                            : "border-gray-300"
                        }`}
                      >
                        {selected && <span className="text-[10px]">✓</span>}
                      </div>
                      <span className="text-[13.5px] font-semibold text-[#181C23]">
                        {extra.name}
                      </span>
                    </div>
                    <span className="text-[13px] font-bold text-[#FF5A38]">
                      +₹{extra.price}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Kitchen Instructions */}
          <div>
            <label className="text-[13px] font-bold text-[#181C23] block mb-1">
              Special Instructions for Kitchen
            </label>
            <input
              type="text"
              placeholder="e.g. Less spicy, dressing on side..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white text-[13px] text-[#181C23] border border-[#EDEFF2] focus:outline-[#FF5A38]"
            />
          </div>
        </div>

        {/* Bottom Add to Cart Button */}
        <div className="p-4 border-t border-[#EDEFF2] bg-white">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-3.5 rounded-xl bg-[#FF5A38] hover:bg-[#E84E2E] active:scale-98 text-white font-bold text-[15px] flex items-center justify-between px-5 shadow-md shadow-orange-500/20 transition"
          >
            <span>Add to Cart</span>
            <span className="tnum">₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
