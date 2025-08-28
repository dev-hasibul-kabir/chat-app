import type { InputHTMLAttributes } from "react";

type InputValue = string | number | readonly string[] | undefined;

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  label?: string;
  error?: string;
  value: InputValue;
  onChange: (value: InputValue) => void;
}

export default function Input({
  label,
  error,
  className = "",
  value,
  onChange,
  ...props
}: InputProps) {
  return (
    <div className="w-full relative">
      {label && (
        <label className="block text-sm text-white mb-2">{label}</label>
      )}

      <input
        className={`mb-1 w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none ${
          error
            ? "focus:ring-1 focus:ring-red-400 "
            : "focus:ring-2 focus:ring-blue-400"
        } ${className || ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      {error && <p className="absolute text-xs text-red-500">{error}</p>}
    </div>
  );
}
