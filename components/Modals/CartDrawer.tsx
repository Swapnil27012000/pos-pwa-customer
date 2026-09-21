"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBagIcon, CloseIcon, CheckIcon, UtensilsIcon } from "../Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, addToCart, data } = useRestaurant();
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isCartOpen) return null;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setIsCartOpen(false);
    }, 2500);
  };

  const gstTax = Math.round(cart.totalAmount * 0.05);
  const grandTotal = cart.totalAmount + gstTax;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl border border-[#EDEFF2] max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-250">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#EDEFF2]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFF1EE] text-[#FF5A38] flex items-center justify-center">
              <ShoppingBagIcon size={18} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#181C23]">Your Order Slip</h3>
              <p className="text-[12px] text-[#687182]">
                Dine-in at Table {cart.tableNumber} • {data.restaurant.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {orderPlaced ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckIcon size={32} />
            </div>
            <h4 className="text-[19px] font-bold text-[#181C23]">
              Order Sent to Kitchen!
            </h4>
            <p className="text-[13px] text-[#687182] max-w-xs mx-auto">
              Your slip has been assigned to Kitchen Station #2. Preparing your dishes for Table {cart.tableNumber}.
            </p>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <UtensilsIcon size={40} className="mx-auto text-gray-300" />
            <h4 className="text-[16px] font-bold text-[#181C23]">Your Cart is Empty</h4>
            <p className="text-[13px] text-[#687182]">
              Explore our menu and add some delicious food to your order.
            </p>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#EDEFF2] no-scrollbar">
              {cart.items.map((item) => (
                <div key={item.dishId} className="not-first:pt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg relative overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={item.dish.imageUrl}
                        alt={item.dish.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#181C23] leading-tight">
                        {item.dish.name}
                      </h4>
                      <p className="text-[12px] text-[#687182] mt-0.5">
                        {item.quantity}x • ₹{item.dish.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="text-[14.5px] font-bold text-[#181C23] tnum">
                      ₹{item.totalPrice}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.dishId)}
                      className="text-[11px] font-bold text-red-500 hover:text-red-700 px-2 py-1 bg-red-50 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="p-4 border-t border-[#EDEFF2] bg-[#F7F8FA] space-y-1.5 text-[13px]">
              <div className="flex justify-between text-[#687182]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#181C23] tnum">₹{cart.totalAmount}</span>
              </div>
              <div className="flex justify-between text-[#687182]">
                <span>Taxes & GST (5%)</span>
                <span className="font-semibold text-[#181C23] tnum">₹{gstTax}</span>
              </div>
              <div className="flex justify-between text-[15px] font-bold text-[#181C23] pt-1.5 border-t border-[#EDEFF2]">
                <span>Total Payable</span>
                <span className="text-[#FF5A38] tnum">₹{grandTotal}</span>
              </div>
            </div>

            {/* Bottom Checkout Button */}
            <div className="p-4 border-t border-[#EDEFF2] bg-white">
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-3.5 rounded-xl bg-[#FF5A38] hover:bg-[#E84E2E] active:scale-98 text-white font-bold text-[15px] shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-2"
              >
                <span>Confirm Order for Table {cart.tableNumber}</span>
                <span>(₹{grandTotal})</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
