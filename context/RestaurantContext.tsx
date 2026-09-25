"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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
  isLoading: boolean;
  error: string | null;
  refreshMenu: () => Promise<void>;
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
  loadSampleDishes: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{
  children: React.ReactNode;
  initialTableId?: string;
  initialRestaurantSlug?: string;
}> = ({ children, initialTableId, initialRestaurantSlug }) => {
  const [data, setData] = useState<RestaurantApiResponse>(() => {
    if (!initialTableId && !initialRestaurantSlug) return mockRestaurantData;
    return {
      ...mockRestaurantData,
      restaurant: {
        ...mockRestaurantData.restaurant,
        name: initialRestaurantSlug || mockRestaurantData.restaurant.name,
        tableNumber: initialTableId ? `Table ${initialTableId}` : mockRestaurantData.restaurant.tableNumber,
      },
      dishes: [],
      categories: [],
    };
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<NavigationTab>("menu");

  // Interactive UI modal states
  const [isCallServerOpen, setIsCallServerOpen] = useState<boolean>(false);
  const [isBookTableOpen, setIsBookTableOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedDishForCustomization, setSelectedDishForCustomization] = useState<DishItem | null>(null);
  const [copiedCouponToast, setCopiedCouponToast] = useState<string | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // If scanning a specific table via QR code, start with empty cart for dine-in ordering
    if (initialTableId || initialRestaurantSlug) {
      return [];
    }
    // Default pre-seeded demo cart for homepage preview
    const initialBurger = mockRestaurantData.dishes.find((d) => d.id === "prime-truffle-burger")!;
    return [
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
    ];
  });

  // Fetch real restaurant menu from API
  const fetchMenu = useCallback(async () => {
    let slug = initialRestaurantSlug;
    let tableId = initialTableId;

    if (typeof window !== "undefined") {
      // 1. Check path /r/:slug/t/:tableId or /r/:slug
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      if (pathParts[0] === "r" && pathParts[1]) {
        if (!slug) slug = pathParts[1];
        if (!tableId && pathParts[2] === "t" && pathParts[3]) {
          tableId = pathParts[3];
        }
      }

      // 2. Check query params ?slug=...&tableId=...
      const searchParams = new URLSearchParams(window.location.search);
      if (!slug && searchParams.get("slug")) {
        slug = searchParams.get("slug")!;
      }
      if (!tableId && searchParams.get("tableId")) {
        tableId = searchParams.get("tableId")!;
      }

      // 3. Fallback to sessionStorage
      if (!slug) {
        slug = sessionStorage.getItem("pwa_restaurant_slug") || undefined;
      }
      if (!tableId) {
        tableId = sessionStorage.getItem("pwa_table_id") || undefined;
      }
    }

    if (!slug) {
      setIsLoading(false);
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("pwa_restaurant_slug", slug);
      if (tableId) sessionStorage.setItem("pwa_table_id", tableId);
    }

    setIsLoading(true);
    setError(null);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:3000";
      const endpoint = `${baseUrl}/api/public/restaurants/${encodeURIComponent(slug)}/menu`;

      const res = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Failed to load menu (${res.status})`);
      }

      const menuData: RestaurantApiResponse = await res.json();

      if (menuData && menuData.restaurant) {
        const resolvedTable = tableId
          ? tableId.startsWith("Table")
            ? tableId
            : `Table ${tableId}`
          : menuData.restaurant.tableNumber || "Dining Table";

        setData({
          ...menuData,
          restaurant: {
            ...menuData.restaurant,
            tableNumber: resolvedTable,
          },
          categories: menuData.categories || [],
          dishes: menuData.dishes || [],
        });
        setActiveCategory("all");
      }
    } catch (err: any) {
      console.warn("[PWA Customer] Fetch menu fallback:", err.message || err);
      setError(err.message || "Failed to load real-time menu");
    } finally {
      setIsLoading(false);
    }
  }, [initialRestaurantSlug, initialTableId]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const loadSampleDishes = () => {
    setData((prev) => ({
      ...prev,
      categories: mockRestaurantData.categories,
      dishes: mockRestaurantData.dishes,
    }));
    setActiveCategory("all");
  };

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
        isLoading,
        error,
        refreshMenu: fetchMenu,
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
        loadSampleDishes,
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
