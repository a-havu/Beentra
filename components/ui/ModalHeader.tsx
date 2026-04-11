import React from "react";


function ModalHeader({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
			<div className="text-2xl font-bold text-gray-900">
				{children}
			</div>
		</div>
	)
}

export default ModalHeader;