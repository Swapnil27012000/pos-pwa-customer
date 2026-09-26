"use client";

import React from "react";
import { UtensilsIcon, TableIcon, TruckIcon, ShoppingBagIcon } from "./Icons";
import { useRestaurant } from "@/context/RestaurantContext";
import { NavigationTab } from "@/types/restaurant";

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, cart, setIsCartOpen, setIsBookTableOpen, currentOrder } =
    useRestaurant();

  const handleTabClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (tab === "cart") {
      setIsCartOpen(true);
    } else if (tab === "floor_plan") {
      setIsBookTableOpen(true);
    }
  };

  const hasActiveOrder =
    currentOrder && !["completed", "cancelled"].includes(currentOrder.status);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: boolean }[] = [
    {
      id: "menu",
      label: "Menu",
      icon: <UtensilsIcon size={20} className="stroke-[2.2]" />,
    },
    {
      id: "floor_plan",
      label: "Floor Plan",
      icon: <TableIcon size={20} className="stroke-[2.2]" />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <TruckIcon size={20} className="stroke-[2.2]" />,
      badge: Boolean(hasActiveOrder),
    },
    {
      id: "cart",
      label: "Cart",
      icon: <ShoppingBagIcon size={20} className="stroke-[2.2]" />,
      badge: cart.itemCount > 0,
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#EDEFF2] shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto grid grid-cols-4 px-2 py-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabClick(item.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition active:scale-95 relative ${
                isActive ? "text-[#FF5A38]" : "text-[#687182] hover:text-[#181C23]"
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF5A38] ring-2 ring-white" />
                )}
              </div>
              <span
                className={`text-[11px] mt-0.5 ${
                  isActive ? "font-bold text-[#FF5A38]" : "font-medium text-[#687182]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
