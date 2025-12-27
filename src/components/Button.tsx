import React from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  icon?: LucideIcon;
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

export const Button = ({
  variant = "primary",
  icon: Icon,
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
};
