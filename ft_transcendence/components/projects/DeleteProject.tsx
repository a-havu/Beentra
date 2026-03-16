"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { ConfirmationModal } from "../ui/ConfirmationModal";

export default function DeleteProject({ projectId }: { projectId: string }) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
    router.back(); // redirect back to where the user came from (My Projects or Projects page)
    router.refresh();
  };

  return (
    <>
      <Button variant="delete" onClick={() => setShowModal(true)} size="medium">
        Delete
      </Button>
      <ConfirmationModal
        isOpen={showModal}
        message="Delete project?"
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}