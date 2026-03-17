
"use client"

import { useState } from "react";
import { Button } from "../ui/Button"
import Modal from "../ui/Modal"
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import CreateProject from "../projects/CreateProject";
import ProjectForm from "../projects/ProjectForm";
import { SubmitHandler } from 'react-hook-form'
import { projectSchema } from '@/lib/validation';
import { z } from 'zod';

type FormValues = z.input<typeof projectSchema>;

type Props = {
	onSuccess?: () => void;
}

function AddProject({ onSuccess }: Props) {
	const [showModal, setShowModal] = useState(false);

	const handleSubmit: SubmitHandler<FormValues> = async (data) => {

		const response = await fetch("/api/projects", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(data),
		});

		if (response.ok) {
			setShowModal(false);
		}

		if (onSuccess) {
			onSuccess();
		}
	}

	return (
		<>
			<Button
				variant="adding"
				onClick={() => setShowModal(true)}
				size="large"
			>
				Create Project
			</Button>

			<Modal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			>
				<ModalHeader>
					<h2>Add New User</h2>
					<ModalBody>
						<ProjectForm
							mode="create"
							onSubmit={handleSubmit}
							onCloseAction={() => setShowModal(false)}
						/>
					</ModalBody>
				</ModalHeader>
			</Modal>
		</>
	)
}

export default AddProject;
