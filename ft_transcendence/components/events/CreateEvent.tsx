"use client";

import EventForm from "./EventForm";
import { eventSchema } from "@/lib/validation";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

type FormValues = z.input<typeof eventSchema>;

type Props = {
  onSuccess?: () => void; // A void function that we can send, for example to close the modal
};

export default function CreateEvent({ onSuccess }: Props) {
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Omit the FileList — send undefined so the key is excluded from JSON
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image: _image, ...rest } = data;
      const formData = {
        ...rest,
        maxSpots: rest.maxSpots ?? 0,
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(`Failed to create event (${res.status}): ${JSON.stringify(err)}`);
      }

      console.log("Event created successfully!");

      // If there is a function sent, lets run it
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <EventForm
      onSubmit={onSubmit}
      defaultValues={{
        type: "Student",
        maxSpots: 0,
      }}
      submitLabel="Create Event"
      mode="create"
    />
  );
}
