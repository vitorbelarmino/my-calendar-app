import type React from "react";
import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps {
  id: string;
  type?: string;
  label: string;
  placeholder?: string;
  icon?: LucideIcon;
  register?: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
  iconPosition?: "left" | "right";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
  multiline?: boolean;
  rows?: number;
}

export default function TextField({
  id,
  type = "text",
  label,
  placeholder,
  icon: Icon,
  register,
  error,
  disabled,
  iconPosition = "left",
  value,
  onChange,
  required,
  className = "",
  multiline = false,
  rows = 3,
}: TextFieldProps) {
  const isLeft = iconPosition === "left";
  const customRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const inputProps = register ? { ...register } : { value, onChange };

  useEffect(() => {
    const element = register?.ref || customRef.current;
    if (element && typeof element !== "function") {
      element.setCustomValidity(error || "");
    }
  }, [error, register?.ref]);

  const sharedClassName = `w-full 
    ${Icon ? (isLeft ? "pl-10 pr-3" : "pl-3 pr-10") : "px-3"} 
    py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed 
    ${error ? "border-red-500" : "border-gray-300"} ${className}`;

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 pb-2">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute 
              ${isLeft ? "left-3" : "right-3"}  
              ${multiline ? "top-1/2 -translate-y-1/2" : "top-3"} 
              h-4 w-4 text-gray-500 pointer-events-none`}
          />
        )}
        {multiline ? (
          <textarea
            id={id}
            placeholder={placeholder}
            {...inputProps}
            disabled={disabled}
            required={required}
            rows={rows}
            className={`${sharedClassName} resize-none`}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            {...inputProps}
            disabled={disabled}
            required={required}
            className={sharedClassName}
          />
        )}
      </div>
    </div>
  );
}
