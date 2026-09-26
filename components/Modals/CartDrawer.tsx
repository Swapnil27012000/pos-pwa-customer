"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBagIcon, CloseIcon, CheckIcon, UtensilsIcon } from "../Icons";
import { useRestaurant } from "@/context/RestaurantContext";

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    addToCart,
    data,
    placeOrder,
    isSubmittingOrder,
    orderError,
    tableId,
  } = useRestaurant();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [kitchenNotes, setKitchenNotes] = useState("");
  const [showCustomerFields, setShowCustomerFields] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState<number | null>(null);

  if (!isCartOpen) return null;

  const handleConfirmOrder = async () => {
    try {
      const order = await placeOrder({
        name: customerName,
        phone: customerPhone,
        notes: kitchenNotes,
      });
      setPlacedOrderNumber(order.orderNumber);
      setTimeout(() => {
        setPlacedOrderNumber(null);
        setIsCartOpen(false);
      }, 2000);
    } catch {
      // Handled via orderError in context
    }
  };

  const currencySymbol =
    data.restaurant.currency?.toUpperCase() === "USD"
      ? "$"
      : data.restaurant.currency?.toUpperCase() === "EUR"
      ? "€"
      : data.restaurant.currency?.toUpperCase() === "GBP"
      ? "£"
      : "₹";

  const displayTable = cart.tableNumber.startsWith("Table")
    ? cart.tableNumber
    : `Table ${cart.tableNumber}`;

  const gstTax = Math.round(cart.totalAmount * 0.05 * 100) / 100;
  const grandTotal = Math.round((cart.totalAmount + gstTax) * 100) / 100;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl border border-[#EDEFF2] max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-250">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#EDEFF2]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFF1EE] text-[#FF5A38] flex items-center justify-center">
              <ShoppingBagIcon size={18} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#181C23]">Table Order Slip</h3>
              <p className="text-[12px] text-[#687182]">
                Dine-in at {displayTable} • {data.restaurant.name}
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

        {placedOrderNumber !== null ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckIcon size={32} />
            </div>
            <h4 className="text-[19px] font-bold text-[#181C23]">
              Order #{placedOrderNumber} Sent to Kitchen!
            </h4>
            <p className="text-[13px] text-[#687182] max-w-xs mx-auto">
              Your table order has been verified and dispatched for immediate preparation at {displayTable}.
            </p>
            <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[12px] font-semibold rounded-full mt-2">
              Opening Live Order Tracking...
            </div>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <UtensilsIcon size={40} className="mx-auto text-gray-300" />
            <h4 className="text-[16px] font-bold text-[#181C23]">Your Cart is Empty</h4>
            <p className="text-[13px] text-[#687182]">
              Select dishes from the menu to build your table dining order.
            </p>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-[#EDEFF2] no-scrollbar">
              {cart.items.map((item, index) => {
                const modifierSummary = (item.modifiersList || [])
                  .map((m) => m.name)
                  .join(", ");

                return (
                  <div key={`${item.dishId}-${index}`} className="not-first:pt-3 space-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg relative overflow-hidden bg-gray-100 shrink-0 mt-0.5">
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
                          {item.variantName && (
                            <p className="text-[11.5px] font-semibold text-[#FF5A38]">
                              Portion: {item.variantName}
                            </p>
                          )}
                          {modifierSummary && (
                            <p className="text-[11.5px] text-[#687182]">
                              Extras: {modifierSummary}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-[11px] text-[#8C95A6] italic">
                              &ldquo;{item.notes}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[14.5px] font-bold text-[#181C23] tnum block">
                          {currencySymbol}{item.totalPrice}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.dishId)}
                          className="text-[11px] font-bold text-red-500 hover:text-red-700 px-2 py-0.5 bg-red-50 rounded-md mt-1 inline-block"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Optional Walk-in Customer Details Accordion */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setShowCustomerFields((prev) => !prev)}
                  className="w-full flex items-center justify-between py-2 text-[12.5px] font-bold text-[#181C23] hover:text-[#FF5A38]"
                >
                  <span className="flex items-center gap-1.5">
                    <span>👤 Customer & Dining Notes</span>
                    <span className="text-[10px] font-normal text-[#687182]">(Optional for Walk-ins)</span>
                  </span>
                  <span className="text-[12px]">{showCustomerFields ? "▲" : "▼"}</span>
                </button>

                {showCustomerFields && (
                  <div className="mt-2 space-y-2 bg-[#F7F8FA] p-3 rounded-xl border border-[#EDEFF2] animate-in fade-in duration-150">
                    <div>
                      <label className="text-[11px] font-semibold text-[#687182] block mb-0.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Alex"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#EDEFF2] text-[12.5px] text-[#181C23] focus:outline-[#FF5A38]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#687182] block mb-0.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 555-0192"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#EDEFF2] text-[12.5px] text-[#181C23] focus:outline-[#FF5A38]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#687182] block mb-0.5">
                        Kitchen / Table Instructions
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bring extra glasses, cutlery"
                        value={kitchenNotes}
                        onChange={(e) => setKitchenNotes(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#EDEFF2] text-[12.5px] text-[#181C23] focus:outline-[#FF5A38]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error banner if any */}
            {orderError && (
              <div className="mx-4 mb-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-[12px] font-medium">
                ⚠️ {orderError}
              </div>
            )}

            {/* Bill Summary */}
            <div className="p-4 border-t border-[#EDEFF2] bg-[#F7F8FA] space-y-1.5 text-[13px]">
              <div className="flex justify-between text-[#687182]">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#181C23] tnum">{currencySymbol}{cart.totalAmount}</span>
              </div>
              <div className="flex justify-between text-[#687182]">
                <span>Taxes & GST (5%)</span>
                <span className="font-semibold text-[#181C23] tnum">{currencySymbol}{gstTax}</span>
              </div>
              <div className="flex justify-between text-[15px] font-bold text-[#181C23] pt-1.5 border-t border-[#EDEFF2]">
                <span>Total Amount</span>
                <span className="text-[#FF5A38] tnum">{currencySymbol}{grandTotal}</span>
              </div>
            </div>

            {/* Bottom Checkout Button */}
            <div className="p-4 border-t border-[#EDEFF2] bg-white">
              <button
                type="button"
                disabled={isSubmittingOrder}
                onClick={handleConfirmOrder}
                className="w-full py-3.5 rounded-xl bg-[#FF5A38] hover:bg-[#E84E2E] active:scale-98 disabled:opacity-50 text-white font-bold text-[15px] shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-2"
              >
                {isSubmittingOrder ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Order to Kitchen...</span>
                  </span>
                ) : (
                  <>
                    <span>Confirm Order for {displayTable}</span>
                    <span>({currencySymbol}{grandTotal})</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

