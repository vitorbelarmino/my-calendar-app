import type { LucideIcon } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputWithIconProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  register: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
}

export default function InputWithIcon({
  id,
  type,
  label,
  placeholder,
  icon: Icon,
  register,
  error,
  disabled,
}: InputWithIconProps) {
  return (
    <div className="space-y-2 relative mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          disabled={disabled}
          className={`w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed 
            ${error ? "border-red-500" : "border-gray-300"}`}
        />
      </div>
      <span className="absolute top-full text-xs text-red-600">{error}</span>
    </div>
  );
}
