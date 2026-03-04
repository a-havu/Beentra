"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const CustomButton = ({ children, type = "button" }: Props) => {
  return (
    <button
      type={type}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md 
                 hover:bg-blue-600 focus:outline-none focus:ring-2 
                 focus:ring-blue-400 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default CustomButton;
