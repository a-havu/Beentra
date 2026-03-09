
"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import { Project } from "@/lib/generated/prisma/client";
import { iso } from "zod";

type ProjectProps = {
	project: Project | null;
	isOpen: boolean;
	onClose: () => void;
}

function ShowProject({ project, isOpen, onClose }: ProjectProps) {

	if (!project) {
		return null;
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalHeader>
				Project Details
			</ModalHeader>

			<ModalBody>
				<div className="space-y-4">
					{/* Username as title */}
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						{project.projectName}
					</h2>

					{/* User details */}
					<div className="space-y-2">
						<div className="flex gap-2">
							<strong className="text-gray-700 min-w-[120px]">ID:</strong>
							<span className="text-gray-900">{project.id}</span>
						</div>

						<div className="flex gap-2">
							<strong className="text-gray-700 min-w-[120px]">Description:</strong>
							<span className="text-gray-900">
								{project.description ?? "Not provided"}
							</span>
						</div>

						<div className="flex gap-2">
							<strong className="text-gray-700 min-w-[120px]">Link:</strong>
							<span className="text-gray-900">
								{project.link}
							</span>
						</div>

						<div className="flex gap-2">
							<strong className="text-gray-700 min-w-[120px]">Techstack:</strong>
							<span className="text-gray-900">{project.techStack ?? "Not provided"}</span>
						</div>
						<div className="flex gap-2">
							<strong className="text-gray-700 min-w-[120px]">Created:</strong>
							<span className="text-gray-600">
								{new Date(project.createdAt).toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>
			</ModalBody>
			<ModalFooter>
				{/* <Button variant="edit" onClick={onClose}>
					Edit
				</Button> */}
				<Button variant="secondary" onClick={onClose}>
					Close
				</Button>
			</ModalFooter>
		</Modal>
	)
}

export default ShowProject;
