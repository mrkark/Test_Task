import React from "react";

export type BeanRoastType = "green" | "drying" | "light" | "crack" | "medium" | "dark" | "espresso";

interface CoffeeBeanIconProps {
  className?: string;
  size?: number;
  roast?: BeanRoastType;
  color?: string;
}

export function CoffeeBeanIcon({
  className = "",
  size = 24,
  roast,
  color,
}: CoffeeBeanIconProps) {
  // Determine color based on roast type if explicit color is not provided
  const getRoastColor = () => {
    if (color) return color;
    switch (roast) {
      case "green":
        return "#5B6C50"; // Raw green bean
      case "drying":
        return "#D9A865"; // Drying phase yellowish
      case "light":
        return "#B57D3E"; // Light roast cinnamon
      case "crack":
        return "#C45525"; // First crack terracotta
      case "medium":
        return "#8C4F2B"; // Medium roast caramel
      case "dark":
      case "espresso":
        return "#2C1A11"; // Deep espresso roast
      default:
        return "currentColor";
    }
  };

  const beanColor = getRoastColor();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block transition-transform duration-300 ${className}`}
    >
      {/* Outer Bean Body */}
      <path
        d="M16 2.5C23.5 2.5 29 8 29 16C29 24 23.5 29.5 16 29.5C8.5 29.5 3 24 3 16C3 8 8.5 2.5 16 2.5Z"
        fill={beanColor}
      />
      {/* Signature Center Crack / Creep */}
      <path
        d="M16 5.5C14 9.5 18 12.5 15.5 16C13 19.5 17.5 22.5 16 26.5"
        stroke="#F9F6F0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      {/* Micro depth line */}
      <path
        d="M16.5 7C14.8 10.2 18.2 12.8 16 16C13.8 19.2 17.8 22 16.5 25"
        stroke="#1A0F0A"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
