"use client";

type Props = {
  id: string;
  onDeleted?: () => void;
};

const DeleteEventButton = ({ id, onDeleted }: Props) => {
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
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Delete
    </button>
  );
};

export default DeleteEventButton;
