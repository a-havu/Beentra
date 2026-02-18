"use client";

import { useState } from "react";
import { ConfirmationModal } from "../ui/ConfirmationModal";

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
      <button
        //onClick={handleDelete}
        onClick={() => setShowModal(true)}
        className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded"
      >
        Delete
      </button>

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
