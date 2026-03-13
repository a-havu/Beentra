

function ModalBody({ children }: { children: React.ReactNode }) {
	return (
		<div className="py-4 max-h-[80vh] overflow-y-auto">
			{children}
		</div>
	);
}

export default ModalBody;
