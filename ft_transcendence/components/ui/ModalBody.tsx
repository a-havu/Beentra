

function ModalBody({ children }: { children: React.ReactNode }) {
	return (
		<div className="py-4 max-h-[60vh] overflow-y-auto">
			{children}
		</div>
	);
}

export default ModalBody;