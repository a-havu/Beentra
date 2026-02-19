"use client";

import { Button } from "./Button";

type ConfirmationProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void; // Function for when cornfirm is clicked
  onCancel: () => void; // Function for when cancel is clicked
};

export function ConfirmationModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}: ConfirmationProps) {
  if (!isOpen) {
    return null; // null = Don't render anything
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🚨</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Are You Sure?
          </h3>
          <p className="text-center text-gray-600 leading-relaxed">
            {message}
          </p>
      </div>
		<div className="flex justify-center gap-3">
      <Button
        variant="delete"
        size="medium"
        onClick={onConfirm}
        >
        Confirm
      </Button>
      <Button
        variant="secondary"
        size="medium"
        onClick={onCancel}
        >
        Cancel
      </Button>
		</div>
      </div>
    </div>
  );
}
