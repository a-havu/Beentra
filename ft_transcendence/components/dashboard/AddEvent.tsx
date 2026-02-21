
"use client"

import { useState } from "react";
import { Button } from "../ui/Button"
import Modal from "../ui/Modal"
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";

type Props = {
	onSubmit?: () => void;
}

function AddEvent() {
	const [showModal, setShowModal] = useState(false);

	function handleAddEvent() {
		// Your submit logic here
		console.log("Submitting event...");
	}

	return (
		<>
			<Button
				variant="adding"
				onClick={() => setShowModal(true)}
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
					<p>This is the content area.</p>
					<p>It can scroll if there's lots of content.</p>
					<p>Add your forms or text here.</p>
				</ModalBody>
				<ModalFooter>
					<Button
						variant="adding"
						onClick={handleAddEvent}
					>
						Create Event
					</Button>
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