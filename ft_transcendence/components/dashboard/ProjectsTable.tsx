"use client";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import { User } from "@/lib/generated/prisma/client";
// import { Project } from "@/lib/generated/prisma/client";
import ShowProject from "./ShowProject";
import { set } from "zod";
import CreateProject from "../projects/CreateProject";
import ProjectForm from "../projects/ProjectForm";
import AddProject from "./AddProject";
import EditProject from "../projects/EditProject";
import DeleteProject from "../projects/DeleteProject";

type Project = {
  id: string;
  projectName: string;
  oneLiner: string;
  link: string | null;
  techStack: string | null;
  description: string | null;
  createdAt: Date;
  creatorId: string | null;
  creator: {
    id: string;
    username: string;
    fullName: string | null;
  } | null;
  image: string | null;
  imageKitId: string | null;
  imagekitFileId: string | null;
}

export function ProjectsTable() {
	const [showModal, setShowModal] = useState(false);
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			setIsLoading(true);

			const response = await fetch("/api/projects", {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error("Failed to fetch Projects");
			}

			const data = await response.json();

			setProjects(data);
			setError(null);
		} catch (err) {
			console.error("Error fetching projects: ", err);
			setError("Failed to load Projects. Please try again");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSuccess = () => {
		setEditingId(null);
		// fetchProjects();
	};

	const reRender = () => {
		fetchProjects();
	};

	const handleEditSuccess = (updatedProject: Project) => {
		setProjects((prev) =>
			prev.map((p) => p.id === updatedProject.id ? updatedProject : p)
		);
	}

	const handleDeleteSuccess = (deleteId: string) => {
		setProjects((prev) =>
			prev.filter((project) => project.id !== deleteId)
		);
	}

	if (isLoading) {
		return (
			<div className="bg-white rounded-lg shadow p-12 text-center">
				<p className="text-gray-600">Loading projects...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-white rounded-lg p-12 text-center">
				<p className="text-red-600">{error}</p>
				<button
					onClick={() => window.location.reload()}
					className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Retry
					</button>
			</div>
		);
	}

	return (
		<>
		<div className="bg-white rounded-lg shadow p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-blue-900">Project Management</h2>
				<AddProject
					onSuccess={reRender}
				/>
			</div>
			<div>
				{/* Table header */}
				<table className="w-full">
					<thead className="bg-gray-50 border-b-2 border-gray-200">
						<tr>
							<th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
								ID
							</th>
							<th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
								Project Name
							</th>
							<th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
								Creator
							</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
								Modify
							</th>
						</tr>
					</thead>

					{/* Table Body */}
					<tbody className="divide-y divide-gray-200">
						{projects.map((project, index) => {
							return (
								<tr
									key={project.id}
									className="hover:bg-gray-50 transition cursor-pointer"
									onClick={() => setSelectedProject(project)}
									>
										<td className="px6 py-4 text-center text-sm text-gray-900">
											{index + 1}
										</td>
										<td className="px6 py-4 text-center text-sm text-gray-900">
											{project.projectName}
										</td>
										<td className="px6 py-4 text-center text-sm text-gray-900">
											{project.creator?.username ?? "Unknown"}
										</td>
										<td className="px-6 py-4">
                      <div
                        className="flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* <Button
                          variant="edit"
                          onClick={() => setEditingId(project.id)}
                        >
                          Edit
                        </Button> */}
						<EditProject
							project={project}
							onSuccess={handleEditSuccess}
						/>
						<DeleteProject
							projectId={project.id}
							dashBoard={true}
							onDeleted={() => handleDeleteSuccess(project.id)}
						/>
						{/* <Button
							variant="delete"
						>
							Delete
						</Button> */}
                        {/* <DeleteEventButton
                          id={project.id}
                          onDeleted={() => {
                            setProjects((prev) =>
                              prev.filter((e) => e.id !== project.id),
                            );
                          }}
                        /> */}
                      </div>
                    </td>
				</tr>
				)
			})}
		</tbody>
		</table>
		</div>
		</div>
		{selectedProject && (
			<ShowProject
				project={selectedProject}
				isOpen={!!selectedProject}
				onClose={() => setSelectedProject(null)}
			/>
		)}
		</>
	)
}
