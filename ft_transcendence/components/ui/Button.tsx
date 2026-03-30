"use client";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  form?: string;
  variant?: "primary" | "secondary" | "sidebar" | "delete" | "adding" | "edit";
  size?: "small" | "medium" | "large";
  disabled?: true | false;
};

export function Button({
  children,
  onClick,
  type = "button",
  form,
  variant = "primary",
  size = "medium",
  disabled = false,
}: ButtonProps) {
  const variantStyles = {
    primary: "border border-[#724015] bg-[#724015] text-white hover:bg-transparent hover:text-black",
    secondary: "border border-[#A2B09E] bg-[#A2B09E] text-black hover:bg-transparent hover:text-black",
    sidebar:
      "w-full text-center bg-white border-2 border-gray-300 rounded-lg text-lg font-bold text-gray-900 hover:bg-gray-900 hover:border-white hover:text-white transition",
    delete: "border border-[#FF97A2] bg-[#FF97A2] text-black hover:bg-transparent",
    adding: "border border-[#724015] bg-[#724015] text-white hover:bg-transparent hover:text-black",
    edit: "border border-[#F7AE69] bg-[#F7AE69] text-black hover:bg-transparent",
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm shadow-xs",
    medium: "px-4 py-2 text-base shadow-xs",
    large: "px-6 py-3 text-lg shadow-xs",
  };

  const buttonStyle = variantStyles[variant];
  const buttonSize = sizeStyles[size];

  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full transition cursor-pointer ${buttonStyle} ${buttonSize} disabled:opacity-50 disabled:cursor-not-allowed min-w-28 self-end`}
    >
      {children}
    </button>
  );
}
