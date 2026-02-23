import React from "react";


function ModalFooter({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
			{children}
		</div>
	)
}

export default ModalFooter;