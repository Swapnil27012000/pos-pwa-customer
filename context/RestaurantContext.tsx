"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  RestaurantApiResponse,
  CartItem,
  CartState,
  DishItem,
  NavigationTab,
} from "@/types/restaurant";
import { mockRestaurantData } from "@/data/mockRestaurantData";

interface RestaurantContextType {
  data: RestaurantApiResponse;
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  cart: CartState;
  addToCart: (dish: DishItem, quantity?: number, portion?: string, modifiers?: string[]) => void;
  removeFromCart: (dishId: string) => void;
  toggleDishInCart: (dish: DishItem) => void;
  isDishInCart: (dishId: string) => boolean;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isCallServerOpen: boolean;
  setIsCallServerOpen: (open: boolean) => void;
  isBookTableOpen: boolean;
  setIsBookTableOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedDishForCustomization: DishItem | null;
  setSelectedDishForCustomization: (dish: DishItem | null) => void;
  copiedCouponToast: string | null;
  copyCoupon: (code: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Production ready: data can be loaded from api.json or API endpoint later
  const [data] = useState<RestaurantApiResponse>(mockRestaurantData);
  const [activeCategory, setActiveCategory] = useState<string>("burgers");
  const [activeTab, setActiveTab] = useState<NavigationTab>("menu");

  // Interactive UI modal states
  const [isCallServerOpen, setIsCallServerOpen] = useState<boolean>(false);
  const [isBookTableOpen, setIsBookTableOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedDishForCustomization, setSelectedDishForCustomization] = useState<DishItem | null>(null);
  const [copiedCouponToast, setCopiedCouponToast] = useState<string | null>(null);

  // Pre-seed cart to match ref/Home.png ("3 items in Order • ₹627 • Table T12")
  // Prime Truffle Burger (₹289) + 2 companion items = ₹627
  const initialBurger = mockRestaurantData.dishes.find((d) => d.id === "prime-truffle-burger")!;
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      dishId: initialBurger.id,
      dish: initialBurger,
      quantity: 1,
      totalPrice: 289,
    },
    {
      dishId: "garlic-butter-naan",
      dish: {
        id: "garlic-butter-naan",
        name: "Garlic Butter Naan",
        description: "Fresh clay-oven baked bread with garlic butter",
        price: 89,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
        isVeg: true,
        category: "indian",
      },
      quantity: 2,
      totalPrice: 178,
    },
    {
      dishId: "mango-lassi",
      dish: {
        id: "mango-lassi",
        name: "Artisanal Mango Lassi",
        description: "Chilled yogurt drink with Alphonso mango pulp",
        price: 160,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80",
        isVeg: true,
        category: "drinks",
      },
      quantity: 1,
      totalPrice: 160,
    },
  ]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cart: CartState = {
    items: cartItems,
    itemCount,
    totalAmount,
    tableNumber: data.restaurant.tableNumber,
  };

  const isDishInCart = (dishId: string) => {
    return cartItems.some((item) => item.dishId === dishId);
  };

  const addToCart = (
    dish: DishItem,
    quantity = 1,
    portion?: string,
    modifiers: string[] = []
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.dishId === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dishId === dish.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: (item.quantity + quantity) * dish.price,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          dishId: dish.id,
          dish,
          quantity,
          portionSize: portion,
          selectedModifiers: modifiers,
          totalPrice: dish.price * quantity,
        },
      ];
    });
  };

  const removeFromCart = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dishId !== dishId));
  };

  const toggleDishInCart = (dish: DishItem) => {
    if (isDishInCart(dish.id)) {
      removeFromCart(dish.id);
    } else {
      addToCart(dish, 1);
    }
  };

  const copyCoupon = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCouponToast(`Copied coupon ${code}`);
    setTimeout(() => {
      setCopiedCouponToast(null);
    }, 2500);
  };

  return (
    <RestaurantContext.Provider
      value={{
        data,
        activeCategory,
        setActiveCategory,
        cart,
        addToCart,
        removeFromCart,
        toggleDishInCart,
        isDishInCart,
        activeTab,
        setActiveTab,
        isCallServerOpen,
        setIsCallServerOpen,
        isBookTableOpen,
        setIsBookTableOpen,
        isCartOpen,
        setIsCartOpen,
        selectedDishForCustomization,
        setSelectedDishForCustomization,
        copiedCouponToast,
        copyCoupon,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
};
