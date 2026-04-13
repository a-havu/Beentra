"use client";

// import { useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  bgColor?: string;
};

function Modal({ children, isOpen, onClose, bgColor }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="rounded-xl shadow-2xl p-8 w-auto max-w-3xl mx-4"
        style={
          bgColor ? { backgroundColor: bgColor } : { backgroundColor: "white" }
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
