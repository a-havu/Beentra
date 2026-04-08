
"use client"

import { useState } from "react";
import { Button } from "../ui/Button"
import Modal from "../ui/Modal"
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import { RegistrationForm } from "../registration/RegistrationForm";
import { User } from "@/lib/generated/prisma/client";

type Props = {
	onSuccess?: () => void;
	onAddSuccess?: (user: User) => void;
}

function AddUser({ onSuccess, onAddSuccess }: Props) {
	const [showModal, setShowModal] = useState(false);

	const handleSuccess = () => {
		setShowModal(false);
		onSuccess?.();
	}

	return (
		<>
			<Button
				variant="adding"
				onClick={() => setShowModal(true)}
				size="medium"
			>
				Add User
			</Button>

			<Modal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			>
				<ModalHeader>
					<h2>Add New User</h2>
					<ModalBody>
						<RegistrationForm
							admin={true}
							onSuccess={handleSuccess}
							// onAddSuccess={onAddSuccess}
						/>
					</ModalBody>
					<ModalFooter>
						<Button
							variant="secondary"
							onClick={() => setShowModal(false)}
						>
							Cancel
						</Button>
					</ModalFooter>
				</ModalHeader>
			</Modal>
		</>
	);
}

export default AddUser;
