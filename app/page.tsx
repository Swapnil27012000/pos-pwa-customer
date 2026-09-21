"use client";

import React from "react";
import { RestaurantProvider, useRestaurant } from "@/context/RestaurantContext";
import { Header } from "@/components/Header";
import { DineInBanner } from "@/components/DineInBanner";
import { HeroBanner } from "@/components/HeroBanner";
import { RestaurantInfoCard } from "@/components/RestaurantInfoCard";
import { PwaInstallCard } from "@/components/PwaInstallCard";
import { CategoryList } from "@/components/CategoryList";
import { PopularDishes } from "@/components/PopularDishes";
import { SpecialOfferBanner } from "@/components/SpecialOfferBanner";
import { FloatingCartBar } from "@/components/FloatingCartBar";
import { BottomNav } from "@/components/BottomNav";
import { CallServerModal } from "@/components/Modals/CallServerModal";
import { BookTableModal } from "@/components/Modals/BookTableModal";
import { DishCustomizationModal } from "@/components/Modals/DishCustomizationModal";
import { CartDrawer } from "@/components/Modals/CartDrawer";
import { OrdersView } from "@/components/OrdersView";
import { FloorPlanView } from "@/components/FloorPlanView";

function MainContent() {
  const { activeTab, copiedCouponToast } = useRestaurant();

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#181C23] flex justify-center">
      {/* Mobile-first PWA Container */}
      <div className="w-full max-w-md min-h-screen bg-[#F7F8FA] relative pb-28 flex flex-col sm:my-3 sm:rounded-3xl sm:border sm:border-black/6 sm:shadow-2xl overflow-x-hidden">
        {/* Top Header */}
        <Header />

        {/* Dynamic Tab Body */}
        <main className="px-4 py-3.5 space-y-4 flex-1">
          {activeTab === "menu" && (
            <>
              {/* 1. Dine-In Verification Card */}
              <DineInBanner />

              {/* 2. Hero Promotional Banner */}
              <HeroBanner />

              {/* 3. Restaurant Quick Metrics & Address Card */}
              <RestaurantInfoCard />

              {/* 4. PWA App Install Promo Card */}
              <PwaInstallCard />

              {/* 5. Horizontal Category Filter */}
              <CategoryList />

              {/* 6. Popular Dishes List with Veg/Non-Veg Badges */}
              <PopularDishes />

              {/* 7. Special Offer Coupon Card */}
              <SpecialOfferBanner />
            </>
          )}

          {activeTab === "floor_plan" && <FloorPlanView />}

          {activeTab === "orders" && <OrdersView />}

          {activeTab === "cart" && (
            <div className="pt-2">
              <div className="p-4 bg-white rounded-2xl border border-[#EDEFF2]">
                <h3 className="text-[17px] font-bold text-[#181C23]">Dine-In Cart</h3>
                <p className="text-[13px] text-[#687182] mt-1">
                  Tap the floating bar or open the order slip below to review your table order.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Floating Cart Bar (above bottom navigation) */}
        <FloatingCartBar />

        {/* Fixed Bottom Navigation Bar */}
        <BottomNav />

        {/* Interactive Modals & Drawers */}
        <CallServerModal />
        <BookTableModal />
        <DishCustomizationModal />
        <CartDrawer />

        {/* Toast Notification (e.g. Coupon copied) */}
        {copiedCouponToast && (
          <div className="fixed bottom-20 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
            <div className="bg-[#181C23] text-white text-[13px] font-semibold px-4 py-2 rounded-full shadow-lg border border-white/10 animate-in fade-in slide-in-from-bottom duration-200 flex items-center gap-2">
              <span>✓</span>
              <span>{copiedCouponToast}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <RestaurantProvider>
      <MainContent />
    </RestaurantProvider>
  );
}
