"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import { User } from "@/lib/generated/prisma/client";
import { iso } from "zod";

type UserPreview = {
  id: string;
  username: string;
  email: string;
  role: string;
  fullName?: string | null;
  createdAt: string;
  isOnline: boolean;
};

type UserProps = {
  user: UserPreview;
  isOpen: boolean;
  onClose: () => void;
};

function ShowUser({ user, isOpen, onClose }: UserProps) {
  if (!user) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>User Details</ModalHeader>

      <ModalBody>
        <div className="space-y-4">
          {/* Username as title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {user.username}
          </h2>

          {/* User details */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <strong className="text-gray-700 min-w-[120px]">ID:</strong>
              <span className="text-gray-900">{user.id}</span>
            </div>

            <div className="flex gap-2">
              <strong className="text-gray-700 min-w-[120px]">
                Full Name:
              </strong>
              <span className="text-gray-900">
                {user.fullName ?? "Not provided"}
              </span>
            </div>

            <div className="flex gap-2">
              <strong className="text-gray-700 min-w-[120px]">Email:</strong>
              <span className="text-gray-900">{user.email}</span>
            </div>

            <div className="flex gap-2">
              <strong className="text-gray-700 min-w-[120px]">Role:</strong>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {user.role}
              </span>
            </div>

            <div className="flex gap-2">
              <strong className="text-gray-700 min-w-[120px]">Joined:</strong>
              <span className="text-gray-600">
                {new Date(user.createdAt).toLocaleDateString()}
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
  );
}

export default ShowUser;
