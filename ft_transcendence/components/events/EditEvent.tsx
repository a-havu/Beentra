"use client";

type Props = {
  id: string;
};

const EditEvent = ({ id }: Props) => {
  const handleEdit = async () => {
    const res = await fetch(`/api/events/${id}`, {
      method: "PUT",
    });
    return <div>EditEvent</div>;
  };
};

export default EditEvent;
