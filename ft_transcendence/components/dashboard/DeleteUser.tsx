
"use client"

import { useState } from "react";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { Button } from "../ui/Button";

type Props = {
  id: string;
  onDeleted?: () => void;
  role?: string;
};

function DeleteUser({ id, onDeleted, role } : Props) {
	const [showModal, setShowModal] = useState(false);

	let admin = false;
	if (role === "admin") {
		admin = true;
	}

	async function handleDelete() {
		const res = await fetch(`/api/user/${id}`, {
			method: "DELETE",
		});

		if (!res.ok) {
			console.error("Failed to delete User");
			return;
		}

		onDeleted?.();
		console.log("User Deleted");
		setShowModal(false);
	}

	function handleCancel() {
		setShowModal(false);
	};

	return (
		<>
		<Button
			variant="delete"
			disabled={admin}
			dashboard={true}
			onClick={() => setShowModal(true)}
			>
				Delete
		</Button>

		<ConfirmationModal
			isOpen={showModal}
			message="Are you sure you want to delete?"
			onConfirm={handleDelete}
			onCancel={handleCancel}
			/>
		</>
	);
}

export default DeleteUser;
