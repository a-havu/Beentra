
'use client'

type ConfirmationProps = {
	isOpen: boolean;
	message: string;
	onConfirm: () => void;			// Function for when cornfirm is clicked
	onCancel: () => void;			// Function for when cancel is clicked
};

export function ConfirmationModal({
	isOpen,
	message,
	onConfirm,
	onCancel,
}: ConfirmationProps) {

	if (!isOpen) {
		return null;				// null = Don't render anything
	}

	return (
		<div className="fixed inset-0 bg-gray-50/80 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
				<p>{message}</p>
				<button onClick={onCancel}>Cancel</button>
				<button onClick={onConfirm}>Confirm</button>
			</div>
		</div>
	);
}