import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "gold"
  | "navy"
  | "green"
  | "red"
  | "blue"
  | "purple"
  | "orange"
  | "teal"
  | "gray";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, { bg: string; dotColor: string }> = {
  gold: {
    bg: "bg-amber-50 text-[#8c6b23] border-[#c9a84c]/40",
    dotColor: "bg-[#c9a84c]",
  },
  navy: {
    bg: "bg-[#0a1628] text-white border-[#1a3a6b]",
    dotColor: "bg-[#e4c46a]",
  },
  green: {
    bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    dotColor: "bg-emerald-500",
  },
  red: {
    bg: "bg-rose-50 text-rose-800 border-rose-200",
    dotColor: "bg-rose-500",
  },
  blue: {
    bg: "bg-sky-50 text-sky-800 border-sky-200",
    dotColor: "bg-sky-500",
  },
  purple: {
    bg: "bg-purple-50 text-purple-800 border-purple-200",
    dotColor: "bg-purple-500",
  },
  orange: {
    bg: "bg-orange-50 text-orange-800 border-orange-200",
    dotColor: "bg-orange-500",
  },
  teal: {
    bg: "bg-teal-50 text-teal-800 border-teal-200",
    dotColor: "bg-teal-500",
  },
  gray: {
    bg: "bg-slate-100 text-slate-700 border-slate-200",
    dotColor: "bg-slate-400",
  },
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs font-medium",
  md: "px-2.5 py-1 text-xs font-semibold tracking-wide",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "navy",
  size = "md",
  dot = false,
  className,
  ...props
}) => {
  const currentVariant = variantStyles[variant] || variantStyles.navy;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border shadow-xs transition-colors",
        currentVariant.bg,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", currentVariant.dotColor)}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
