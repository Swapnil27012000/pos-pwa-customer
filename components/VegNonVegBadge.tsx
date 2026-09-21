import React from "react";

interface VegNonVegBadgeProps {
  isVeg: boolean;
  size?: number;
  className?: string;
}

export const VegNonVegBadge: React.FC<VegNonVegBadgeProps> = ({
  isVeg,
  size = 15,
  className = "",
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`inline-flex items-center justify-center rounded-[3px] border p-0.5 bg-white/95 backdrop-blur-xs shadow-xs ${
        isVeg ? "border-emerald-600" : "border-[#B91C1C]"
      } ${className}`}
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
    >
      <div
        className={`w-full h-full rounded-full ${
          isVeg ? "bg-emerald-600" : "bg-[#B91C1C]"
        }`}
      />
    </div>
  );
};
