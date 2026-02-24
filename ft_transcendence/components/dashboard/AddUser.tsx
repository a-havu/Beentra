
"use client"

import { useState } from "react";
import { Button } from "../ui/Button"
import Modal from "../ui/Modal"
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import { RegistrationForm } from "../registration/RegistrationForm";

function AddUser() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button
				variant="adding"
				onClick={() => setShowModal(true)}
				size="large"
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
						<RegistrationForm />
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