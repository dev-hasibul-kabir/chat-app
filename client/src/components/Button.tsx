type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled,
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const variantClass =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : variant === "secondary"
      ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
      : "bg-red-600 hover:bg-red-700 text-white";

  const sizeClass =
    size === "sm"
      ? "px-3 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-base";

  return (
    <button
      className={`relative rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${sizeClass} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </span>
      )}
      <span style={{ opacity: loading ? 0 : 1 }}>{children}</span>
    </button>
  );
}
