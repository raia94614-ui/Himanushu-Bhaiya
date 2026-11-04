import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[#0a1628] text-white hover:bg-[#1a3a6b] active:bg-[#07101d] border border-transparent shadow-sm focus-visible:ring-[#1a3a6b]",
  gold:
    "bg-[#c9a84c] text-[#0a1628] font-semibold hover:bg-[#e4c46a] active:bg-[#a8883a] border border-transparent shadow-sm hover:shadow-md focus-visible:ring-[#c9a84c]",
  outline:
    "border-2 border-[#0a1628] text-[#0a1628] bg-transparent hover:bg-[#0a1628] hover:text-white active:bg-[#1a3a6b] focus-visible:ring-[#0a1628]",
  ghost:
    "bg-transparent text-[#1a202c] hover:bg-[#0a1628]/10 hover:text-[#0a1628] active:bg-[#0a1628]/15 border border-transparent focus-visible:ring-[#0a1628]",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border border-transparent shadow-sm focus-visible:ring-red-500",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl font-medium",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
