"use client";

import EventForm from "./EventForm";
import { eventSchema } from "@/lib/validation";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { FullEventData } from "./EventCard";

type FormValues = z.input<typeof eventSchema>;

type Props = {
  onSuccess?: () => void;
  onEventCreated?: (event: FullEventData) => void;
};

export default function CreateEvent({ onSuccess, onEventCreated }: Props) {
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image: _image, ...rest } = data;
    const formData = { ...rest, maxSpots: rest.maxSpots ?? 0 };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          `Failed to create event (${res.status}): ${JSON.stringify(err)}`
        );
      }

      const newEvent = await res.json();
      onEventCreated?.({
        ...newEvent,
        subscriberCount: 0,
        isSubscribed: false,
      });
      onSuccess?.();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <EventForm
      onSubmit={onSubmit}
      defaultValues={{ type: "Student", maxSpots: 0 }}
      submitLabel="Create Event"
      mode="create"
    />
  );
}
