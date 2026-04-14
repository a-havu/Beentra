"use client";

import { useState } from "react";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { Button } from "../ui/Button";

type Props = {
  id: string;
  onDeleted?: () => void;
};

const DeleteEventButton = ({ id, onDeleted }: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    const res = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed to delete event");
      return;
    }
    onDeleted?.();
    console.log("Event deleted");
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button
        variant="delete"
        onClick={() => setShowModal(true)}
        dashboard={true}
      >
        Delete
      </Button>

      <ConfirmationModal
        isOpen={showModal}
        message="Are you sure you want to delete?"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </>
  );
};

export default DeleteEventButton;
