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
    isLoading,
    refreshMenu,
    loadSampleDishes,
    activeCategory,
    setActiveCategory,
    isDishInCart,
    toggleDishInCart,
    setSelectedDishForCustomization,
  } = useRestaurant();

  const currencySymbol =
    data.restaurant.currency?.toUpperCase() === "USD"
      ? "$"
      : data.restaurant.currency?.toUpperCase() === "EUR"
      ? "€"
      : data.restaurant.currency?.toUpperCase() === "GBP"
      ? "£"
      : "₹";

  // Filter dishes by active category if selected, otherwise show all dishes
  const filteredDishes = data.dishes.filter((d) => {
    if (!activeCategory || activeCategory === "all") return true;
    return d.category === activeCategory;
  });

  const activeCategoryObj = data.categories.find((c) => c.id === activeCategory);
  const sectionTitle =
    activeCategory === "all" || !activeCategoryObj
      ? "Popular Dishes"
      : `${activeCategoryObj.emoji} ${activeCategoryObj.name}`;

  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <section id="popular-dishes" className="space-y-3.5 scroll-mt-20">
        <div className="flex items-center justify-between">
          <div className="h-6 w-36 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded-lg" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#EDEFF2] p-3 flex gap-3 animate-pulse"
            >
              <div className="w-24 h-24 rounded-xl bg-gray-200 shrink-0" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded" />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="h-5 w-14 bg-gray-200 rounded" />
                  <div className="h-7 w-16 bg-gray-200 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 2. Empty Dishes State for the Restaurant
  if (data.dishes.length === 0) {
    return (
      <section id="popular-dishes" className="space-y-3.5 scroll-mt-20">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#181C23] tracking-tight flex items-center gap-2">
            <span>Restaurant Menu</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A38]" />
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-[#EDEFF2] p-6 text-center shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF1EE] text-[#FF5A38] mx-auto flex items-center justify-center text-2xl shadow-inner">
            🍽️
          </div>
          <div>
            <h3 className="text-[16.5px] font-bold text-[#181C23]">
              Menu In Preparation
            </h3>
            <p className="text-[13px] text-[#687182] mt-1 max-w-xs mx-auto leading-relaxed">
              {data.restaurant.name} has not published dishes to this digital menu yet.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <button
              type="button"
              onClick={() => refreshMenu()}
              className="px-4 py-2 rounded-xl text-[13px] font-bold bg-[#FF5A38] text-white hover:bg-[#E84E2E] transition active:scale-95 shadow-xs"
            >
              Refresh Menu
            </button>
            <button
              type="button"
              onClick={() => loadSampleDishes()}
              className="px-4 py-2 rounded-xl text-[13px] font-semibold bg-[#F4F6FA] text-[#4B5563] hover:bg-[#EBF0F8] transition active:scale-95"
            >
              Preview Sample Dishes
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 3. Category Filtered Empty State (e.g. selected category has no items)
  if (filteredDishes.length === 0) {
    return (
      <section id="popular-dishes" className="space-y-3.5 scroll-mt-20">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[#181C23] tracking-tight flex items-center gap-2">
            <span>{sectionTitle}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A38]" />
          </h2>
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className="text-[13px] font-semibold text-[#FF5A38] hover:underline"
          >
            Show All ({data.dishes.length})
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#EDEFF2] p-6 text-center shadow-xs">
          <p className="text-[13.5px] text-[#687182]">
            No dishes listed under this category yet.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className="mt-3 px-4 py-2 rounded-xl text-[13px] font-bold bg-[#FFF1EE] text-[#FF5A38] hover:bg-[#FFE5DE] transition"
          >
            View All Dishes
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="popular-dishes" className="space-y-3.5 scroll-mt-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-bold text-[#181C23] tracking-tight flex items-center gap-2">
          <span>{sectionTitle}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A38]" />
        </h2>
        <span className="text-[13px] text-[#687182] font-medium">
          {filteredDishes.length} {filteredDishes.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Dish List */}
      <div className="space-y-3">
        {filteredDishes.map((dish) => {
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
                  <div>
                    <span className="text-[17px] font-bold text-[#181C23] tnum">
                      {currencySymbol}{dish.price}
                    </span>
                    {((dish.portionSizes && dish.portionSizes.length > 0) ||
                      (dish.modifierGroups && dish.modifierGroups.length > 0)) && (
                      <span className="block text-[10px] font-semibold text-[#FF5A38]">
                        Customisable
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        (dish.portionSizes && dish.portionSizes.length > 0) ||
                        (dish.modifierGroups && dish.modifierGroups.length > 0)
                      ) {
                        setSelectedDishForCustomization(dish);
                      } else {
                        toggleDishInCart(dish);
                      }
                    }}
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
