import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full relative">
        {label && (
          <label htmlFor={props.id} className="block text-sm text-white mb-2">
            {label}
          </label>
        )}

        <input
          ref={ref}
          {...props}
          className={`w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none ${
            error
              ? "focus:ring-1 focus:ring-red-400 "
              : "focus:ring-2 focus:ring-blue-400"
          } ${className || ""}`}
        />
        {error && (
          <p className="absolute text-xs text-red-500">{error.message}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
export default Input;
