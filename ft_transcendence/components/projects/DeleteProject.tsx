"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { ConfirmationModal } from "../ui/ConfirmationModal";

type Props = {
	projectId: string;
	dashBoard?: boolean;
	onDeleted?: () => void;
}

// export default function DeleteProject({ projectId, dashBoard }: { projectId: string, dashBoard: boolean }) {
export default function DeleteProject({ projectId, dashBoard = false, onDeleted }: Props ) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
    if (dashBoard){
		onDeleted?.();
		router.refresh();
	} else {
		router.back(); // redirect back to My Projects or Projects page
  };
}

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
