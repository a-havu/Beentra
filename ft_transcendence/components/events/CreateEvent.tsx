"use client";

import EventForm from "./EventForm";
import { eventSchema } from "@/lib/validation";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

type FormValues = z.input<typeof eventSchema>;

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
      mode="create"
    />
  );
}
