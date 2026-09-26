"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  RestaurantApiResponse,
  CartItem,
  CartItemModifier,
  CartState,
  DishItem,
  NavigationTab,
  PublicOrder,
} from "@/types/restaurant";
import { mockRestaurantData } from "@/data/mockRestaurantData";

interface AddToCartDetails {
  variantId?: string;
  variantName?: string;
  modifiersList?: CartItemModifier[];
  notes?: string;
  customUnitPrice?: number;
}

interface RestaurantContextType {
  data: RestaurantApiResponse;
  isLoading: boolean;
  error: string | null;
  refreshMenu: () => Promise<void>;
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  cart: CartState;
  tableId: string | null;
  restaurantSlug: string | null;
  addToCart: (
    dish: DishItem,
    quantity?: number,
    portion?: string,
    modifiers?: string[],
    details?: AddToCartDetails
  ) => void;
  removeFromCart: (dishId: string) => void;
  clearCart: () => void;
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
  currentOrder: PublicOrder | null;
  isSubmittingOrder: boolean;
  orderError: string | null;
  placeOrder: (customerDetails?: {
    name?: string;
    phone?: string;
    notes?: string;
  }) => Promise<PublicOrder>;
  refreshCurrentOrder: () => Promise<void>;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{
  children: React.ReactNode;
  initialTableId?: string;
  initialRestaurantSlug?: string;
}> = ({ children, initialTableId, initialRestaurantSlug }) => {
  const [slug, setSlug] = useState<string | null>(initialRestaurantSlug || null);
  const [tableId, setTableId] = useState<string | null>(initialTableId || null);

  const [data, setData] = useState<RestaurantApiResponse>(() => {
    if (!initialTableId && !initialRestaurantSlug) return mockRestaurantData;
    return {
      ...mockRestaurantData,
      restaurant: {
        ...mockRestaurantData.restaurant,
        name: initialRestaurantSlug || mockRestaurantData.restaurant.name,
        slug: initialRestaurantSlug || mockRestaurantData.restaurant.slug,
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

  // Real Order placement and tracking states
  const [currentOrder, setCurrentOrder] = useState<PublicOrder | null>(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (initialTableId || initialRestaurantSlug) {
      return [];
    }
    const initialBurger = mockRestaurantData.dishes.find((d) => d.id === "prime-truffle-burger");
    if (!initialBurger) return [];
    return [
      {
        dishId: initialBurger.id,
        dish: initialBurger,
        quantity: 1,
        totalPrice: initialBurger.price,
      },
    ];
  });

  // Fetch real restaurant menu from API
  const fetchMenu = useCallback(async () => {
    let resolvedSlug = slug || initialRestaurantSlug;
    let resolvedTableId = tableId || initialTableId;

    if (typeof window !== "undefined") {
      // 1. Check path /r/:slug/t/:tableId or /r/:slug
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      if (pathParts[0] === "r" && pathParts[1]) {
        if (!resolvedSlug) resolvedSlug = pathParts[1];
        if (!resolvedTableId && pathParts[2] === "t" && pathParts[3]) {
          resolvedTableId = pathParts[3];
        }
      }

      // 2. Check query params ?slug=...&tableId=...
      const searchParams = new URLSearchParams(window.location.search);
      if (!resolvedSlug && searchParams.get("slug")) {
        resolvedSlug = searchParams.get("slug")!;
      }
      if (!resolvedTableId && searchParams.get("tableId")) {
        resolvedTableId = searchParams.get("tableId")!;
      }

      // 3. Fallback to sessionStorage
      if (!resolvedSlug) {
        resolvedSlug = sessionStorage.getItem("pwa_restaurant_slug") || undefined;
      }
      if (!resolvedTableId) {
        resolvedTableId = sessionStorage.getItem("pwa_table_id") || undefined;
      }
    }

    if (resolvedSlug) setSlug(resolvedSlug);
    if (resolvedTableId) setTableId(resolvedTableId);

    if (!resolvedSlug) {
      setIsLoading(false);
      return;
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("pwa_restaurant_slug", resolvedSlug);
      if (resolvedTableId) sessionStorage.setItem("pwa_table_id", resolvedTableId);
    }

    setIsLoading(true);
    setError(null);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:3000";
      const endpoint = `${baseUrl}/api/public/restaurants/${encodeURIComponent(resolvedSlug)}/menu`;

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
        const displayTable = resolvedTableId
          ? resolvedTableId.startsWith("Table")
            ? resolvedTableId
            : `Table ${resolvedTableId}`
          : menuData.restaurant.tableNumber || "Dining Table";

        setData({
          ...menuData,
          restaurant: {
            ...menuData.restaurant,
            tableNumber: displayTable,
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
  }, [slug, tableId, initialRestaurantSlug, initialTableId]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // Refresh current order status from backend
  const refreshCurrentOrder = useCallback(async () => {
    let orderId = currentOrder?.id;
    if (!orderId && typeof window !== "undefined") {
      orderId = sessionStorage.getItem("pwa_current_order_id") || undefined;
    }
    if (!orderId) return;

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:3000";
      const endpoint = `${baseUrl}/api/public/orders/${encodeURIComponent(orderId)}`;

      const res = await fetch(endpoint, {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (res.ok) {
        const updatedOrder: PublicOrder = await res.json();
        setCurrentOrder(updatedOrder);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("pwa_current_order", JSON.stringify(updatedOrder));
        }
      }
    } catch (err) {
      console.warn("[PWA] Error refreshing order status:", err);
    }
  }, [currentOrder?.id]);

  // Restore current order from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("pwa_current_order");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.id) {
            setCurrentOrder(parsed);
          }
        } catch {}
      }
      refreshCurrentOrder();
    }
  }, [refreshCurrentOrder]);

  // Real-time polling when order is active
  useEffect(() => {
    if (!currentOrder?.id) return;
    if (["completed", "cancelled"].includes(currentOrder.status)) return;

    const interval = setInterval(() => {
      refreshCurrentOrder();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentOrder?.id, currentOrder?.status, refreshCurrentOrder]);

  // Place a real dining order
  const placeOrder = async (customerDetails?: {
    name?: string;
    phone?: string;
    notes?: string;
  }): Promise<PublicOrder> => {
    if (cartItems.length === 0) {
      throw new Error("Your cart is empty");
    }

    const effectiveSlug =
      slug ||
      (typeof window !== "undefined"
        ? sessionStorage.getItem("pwa_restaurant_slug")
        : null) ||
      data.restaurant.slug ||
      data.restaurant.id;

    const effectiveTable =
      tableId ||
      (typeof window !== "undefined"
        ? sessionStorage.getItem("pwa_table_id")
        : null) ||
      data.restaurant.tableNumber.replace(/^Table\s*/i, "").trim();

    if (!effectiveTable) {
      throw new Error(
        "Table identifier is missing. Please scan a table QR code to place your order."
      );
    }

    setIsSubmittingOrder(true);
    setOrderError(null);

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:3000";
      const endpoint = `${baseUrl}/api/public/restaurants/${encodeURIComponent(
        effectiveSlug
      )}/orders`;

      const payload = {
        tableId: effectiveTable,
        customer: {
          name: customerDetails?.name?.trim() || undefined,
          phone: customerDetails?.phone?.trim() || undefined,
        },
        notes: customerDetails?.notes?.trim() || undefined,
        items: cartItems.map((item) => ({
          menuItemId: item.dishId,
          variantId: item.variantId || undefined,
          quantity: item.quantity,
          notes: item.notes || undefined,
          selectedModifiers:
            item.modifiersList && item.modifiersList.length > 0
              ? item.modifiersList.map((m) => ({
                  modifierId: m.id,
                  quantity: m.quantity || 1,
                }))
              : item.selectedModifiers && item.selectedModifiers.length > 0
              ? item.selectedModifiers.map((id) => ({
                  modifierId: id,
                  quantity: 1,
                }))
              : undefined,
        })),
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Failed to submit order (${res.status})`);
      }

      const orderResult: PublicOrder = await res.json();
      setCurrentOrder(orderResult);

      if (typeof window !== "undefined") {
        sessionStorage.setItem("pwa_current_order_id", orderResult.id);
        sessionStorage.setItem("pwa_current_order", JSON.stringify(orderResult));
      }

      setCartItems([]);
      setIsCartOpen(false);
      setActiveTab("orders");
      return orderResult;
    } catch (err: any) {
      setOrderError(err.message || "Failed to submit order");
      throw err;
    } finally {
      setIsSubmittingOrder(false);
    }
  };

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
    modifiers: string[] = [],
    details?: AddToCartDetails
  ) => {
    setCartItems((prev) => {
      const modKey = (modifiers || []).slice().sort().join(",");
      const itemKey = `${dish.id}-${details?.variantId || "def"}-${modKey}`;

      const existingIndex = prev.findIndex((item) => {
        const existingModKey = (item.selectedModifiers || []).slice().sort().join(",");
        const existingKey = `${item.dishId}-${item.variantId || "def"}-${existingModKey}`;
        return existingKey === itemKey;
      });

      const unitPrice = details?.customUnitPrice ?? dish.price;

      if (existingIndex > -1) {
        const existing = prev[existingIndex];
        const newQty = existing.quantity + quantity;
        const perUnitPrice = existing.totalPrice / existing.quantity;
        const updated = [...prev];
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalPrice: newQty * perUnitPrice,
        };
        return updated;
      }

      return [
        ...prev,
        {
          dishId: dish.id,
          dish,
          quantity,
          portionSize: portion,
          variantId: details?.variantId,
          variantName: details?.variantName,
          selectedModifiers: modifiers,
          modifiersList: details?.modifiersList,
          notes: details?.notes,
          totalPrice: unitPrice * quantity,
        },
      ];
    });
  };

  const removeFromCart = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dishId !== dishId));
  };

  const clearCart = () => {
    setCartItems([]);
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
        tableId,
        restaurantSlug: slug,
        addToCart,
        removeFromCart,
        clearCart,
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
        currentOrder,
        isSubmittingOrder,
        orderError,
        placeOrder,
        refreshCurrentOrder,
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

