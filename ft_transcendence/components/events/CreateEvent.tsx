"use client";

import EventForm from "./EventForm";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  title: string;
  date: Date;
  timeFrom: string;
  timeTo: string;
  location: string;
  organizer: string;
  type: "Student" | "External";
  image?: FileList | null;
  description?: string;
};

export default function CreateEvent() {
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const formData = { ...data, image: data.image?.[0] || null };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to create event");
      }

      console.log("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <EventForm
      onSubmit={onSubmit}
      defaultValues={{
        type: "Student",
      }}
      submitLabel="Create Event"
    />
  );
}
