"use client";

import React from "react";
import Image from "next/image";
import { StarIcon, PlusIcon, CheckIcon } from "./Icons";
import { VegNonVegBadge } from "./VegNonVegBadge";
import { useRestaurant } from "@/context/RestaurantContext";
import { DishItem } from "@/types/restaurant";

export const PopularDishes: React.FC = () => {
  const {
    data,
    activeCategory,
    isDishInCart,
    toggleDishInCart,
    setSelectedDishForCustomization,
  } = useRestaurant();

  // Filter dishes by active category if matches, or show popular dishes by default
  const filteredDishes = data.dishes.filter((d) => {
    if (!activeCategory || activeCategory === "all") return true;
    // If active category has dishes, show them, otherwise show all popular dishes
    const matchesCategory = d.category === activeCategory;
    const categoryHasDishes = data.dishes.some((item) => item.category === activeCategory);
    return categoryHasDishes ? matchesCategory : true;
  });

  const displayDishes = filteredDishes.length > 0 ? filteredDishes : data.dishes;

  return (
    <section id="popular-dishes" className="space-y-3.5 scroll-mt-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-[#181C23] tracking-tight flex items-center gap-2">
          <span>Popular Dishes</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A38]" />
        </h2>
        <span className="text-[13px] text-[#687182] font-medium">Recommended</span>
      </div>

      {/* Dish List */}
      <div className="space-y-3">
        {displayDishes.map((dish) => {
          const added = isDishInCart(dish.id);
          const hasBadge = Boolean(dish.badge);

          return (
            <div
              key={dish.id}
              className={`bg-white rounded-2xl border transition shadow-xs relative p-3 flex gap-3 ${
                hasBadge ? "border-[#FF5A38]/30" : "border-[#EDEFF2]"
              } ${added ? "ring-1 ring-[#FF5A38]/20" : ""}`}
            >
              {/* Floating Chef's Special ribbon on top right if present */}
              {dish.badge && (
                <div className="absolute -top-2.5 right-4 z-10">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FF5A38] text-white shadow-xs">
                    {dish.badge}
                  </span>
                </div>
              )}

              {/* Dish Image Container */}
              <div
                onClick={() => setSelectedDishForCustomization(dish)}
                className="w-24 h-24 rounded-xl overflow-hidden relative shrink-0 bg-gray-100 cursor-pointer group"
              >
                <Image
                  src={dish.imageUrl}
                  alt={dish.name}
                  fill
                  sizes="96px"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                {/* Veg / Non-Veg Indicator badge on top-left of image */}
                <div className="absolute top-1.5 left-1.5 z-10">
                  <VegNonVegBadge isVeg={dish.isVeg} size={15} />
                </div>
              </div>

              {/* Info & Actions */}
              <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                {/* Title and Rating Row */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      onClick={() => setSelectedDishForCustomization(dish)}
                      className="text-[15.5px] font-bold text-[#181C23] leading-snug truncate cursor-pointer hover:text-[#FF5A38] transition"
                    >
                      {dish.name}
                    </h3>

                    <div className="flex items-center gap-1 text-[13px] text-[#4B5563] shrink-0 font-medium">
                      <StarIcon size={14} className="text-[#F59E0B]" />
                      <span>{dish.rating}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[12px] text-[#687182] font-normal line-clamp-1 mt-0.5">
                    {dish.description}
                  </p>
                </div>

                {/* Price and Add/Added Button Row */}
                <div className="flex items-center justify-between mt-2 pt-1">
                  <div className="text-[17px] font-bold text-[#181C23] tnum">
                    ₹{dish.price}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleDishInCart(dish)}
                    className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-[12.5px] font-bold transition active:scale-95 shadow-xs ${
                      added
                        ? "bg-[#FF5A38] hover:bg-[#E84E2E] text-white"
                        : "bg-white hover:bg-[#FFF1EE] text-[#FF5A38] border border-[#FFDCD4]"
                    }`}
                  >
                    {added ? (
                      <>
                        <CheckIcon size={14} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <PlusIcon size={14} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
