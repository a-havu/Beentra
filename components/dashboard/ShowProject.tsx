"use client";

import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import { Project } from "@/lib/generated/prisma/client";
import Link from "next/link";
import Image from "next/image";
import { spawn } from "child_process";

type ProjectProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
};

function ShowProject({ project, isOpen, onClose }: ProjectProps) {
  if (!project) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Project Details</ModalHeader>

      <ModalBody>
        {project.image && (
          <Image
            src={project.image}
            alt={project.projectName}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto max-h-64 rounded-md mb-4 object-cover"
          />
        )}
        <div className="space-y-4">
          {/* Username as title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {project.projectName}
          </h2>

          {/* User details */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <strong className="text-gray-700 min-w-[120px]">
                One Liner:
              </strong>
              <span className="text-gray-900">{project.oneLiner}</span>
            </div>

            <div className="flex gap-2">
              <strong className="text-gray-700 min-w-[120px]">
                Description:
              </strong>
              {project.description ? (
                <span className="text-gray-900">{project.description}</span>
              ) : (
                <span className="text-gray-900">Not provided</span>
              )}
            </div>

            <div className="flex gap-2">
              <strong className="text-gray-700 min-w-[120px]">Link:</strong>
              {project.link ? (
                <Link
                  href={project.link}
                  target="_blank"
                  className="text-blue-600"
                >
                  {project.link}
                </Link>
              ) : (
                <span className="text-gray-900">Not provided</span>
              )}
              {/* <span className="text-gray-900">{project.link}</span> */}
            </div>

            <div className="flex gap-2">
              <strong className="text-gray-700 min-w-[120px]">
                Techstack:
              </strong>
              {project.techStack ? (
                <span className="text-gray-900">{project.techStack}</span>
              ) : (
                <span className="text-gray-900">Not provided</span>
              )}
              {/* <span className="text-gray-900">
                {project.techStack ?? "Not provided"}
              </span> */}
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
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ShowProject;
