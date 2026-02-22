
"use client"

import { useState } from "react";
import { Button } from "../ui/Button"
import Modal from "../ui/Modal"
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import CreateEvent from "../events/CreateEvent";

function AddEvent() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button
				variant="adding"
				onClick={() => setShowModal(true)}
				size="large"
			>
				Add Event
			</Button>

			<Modal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			>
				<ModalHeader>
					<h2>Add New Event</h2>
				</ModalHeader>

				<ModalBody>
					<CreateEvent />
				</ModalBody>
				<ModalFooter>
					{/* 
					<Button
						variant="adding"
						onClick={handleAddEvent}
					>
						Create Event
					</Button>*/}
					<Button
						variant="secondary"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	)
}

export default AddEvent