"use client";

import { useEffect, useState } from "react";
import EventForm from "./EventForm";
import { eventSchema } from "@/lib/validation";
import { z } from "zod";

type FormValues = z.input<typeof eventSchema>;

type Props = {
  id: string;
  onSuccess?: () => void;
};

const EditEvent = ({ id, onSuccess }: Props) => {
  const [defaultValues, setDefaultValues] = useState<Partial<FormValues>>();
  const [loading, setLoading] = useState(true);

  console.log(id);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const event = await response.json();

        const formatTime = (isoString: string) => {
          const date = new Date(isoString);
          const hours = date.getUTCHours();
          const minutes = date.getUTCMinutes();
          return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
        };

        const formatDate = (isoString: string) => {
          return new Date(isoString).toISOString().split("T")[0];
        };

        setDefaultValues({
          title: event.title,
          date: formatDate(event.date),
          timeFrom: formatTime(event.timeFrom),
          timeTo: formatTime(event.timeTo),
          location: event.location,
          organizer: event.organizer,
          type: event.type,
          image: event.image,
          description: event.description,
        });
        console.log("date: \n", event.date);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleEdit = async (data: FormValues) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      console.log("Event updated successfully!");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <EventForm
      defaultValues={defaultValues}
      onSubmit={handleEdit}
      submitLabel="Update Event"
      mode="edit"
    />
  );
};

export default EditEvent;
