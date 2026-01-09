"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-indigo-600 text-white",
    "hover:bg-indigo-700",
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
    "dark:bg-indigo-500 dark:hover:bg-indigo-600",
    "dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900",
  ].join(" "),

  secondary: [
    "bg-white text-gray-900 border border-gray-200",
    "hover:bg-gray-50 hover:border-gray-300",
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
    "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700",
    "dark:hover:bg-gray-700 dark:hover:border-gray-600",
    "dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900",
  ].join(" "),

  ghost: [
    "bg-transparent text-gray-600",
    "hover:bg-gray-100 hover:text-gray-900",
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
    "dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
    "dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center gap-2",
          "font-medium rounded-lg",
          "transition-colors duration-150",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
