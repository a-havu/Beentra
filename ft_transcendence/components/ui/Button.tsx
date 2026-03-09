"use client";

type ButtonProps = {
  children: React.ReactNode; // The text/content inside the button
  onClick?: () => void; // Function call when clicked, optional because of the '?'
  type?: "button" | "submit" | "reset"; // The type of the button
  variant?: "primary" | "secondary" | "sidebar" | "delete" | "adding" | "edit";
  size?: "small" | "medium" | "large";
  disabled?: true | false;
};

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
}: ButtonProps) {
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    sidebar:
      "w-full text-center bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition",
    delete: "bg-red-600 hover:bg-red-700 text-white",
    adding: "bg-green-600 hover:bg-green-700 text-white font-bold",
    edit: "bg-yellow-500 hover:bg-yellow-600 text-white",
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const buttonStyle = variantStyles[variant];
  const buttonSize = sizeStyles[size];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full transition cursor-pointer ${buttonStyle} ${buttonSize} disabled:opacity-50 disabled:cursor-not-allowed w-28 self-end`}
    >
      {children}
    </button>
  );
}
