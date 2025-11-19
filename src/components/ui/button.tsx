import React from "react";
import { cn } from "@/lib/utils";

interface SmoothButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  children: React.ReactNode;
}

const SmoothButton = React.forwardRef<HTMLButtonElement, SmoothButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm rounded-md gap-2",
      md: "px-4 py-2 text-base rounded-lg gap-2",
      lg: "px-6 py-3 text-lg rounded-lg gap-2",
      xl: "px-8 py-4 text-xl rounded-xl gap-3",
    };

    const variantStyles = {
      default:
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-lg",
      primary:
        "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-lg",
      secondary:
        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md",
      outline:
        "border-2 border-primary text-primary hover:bg-primary/5 hover:border-primary hover:shadow-md",
      ghost: "text-foreground hover:bg-accent/10 hover:text-accent-foreground",
      destructive:
        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

SmoothButton.displayName = "SmoothButton";

export { SmoothButton };
