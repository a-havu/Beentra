"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "../ui/SubmitFormButton";

type FormValues = {
  title: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  location: string;
  organizer: string;
  type: "Student" | "External";
  image: FileList | null;
  description: string;
};

export default function CreateEvent() {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      type: "Student",
    },
  });

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
        console.error("Failed to create event");
        return;
      }

      const result = await res.json();
      console.log("Event Created:", result);

      reset();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Event
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            id="title"
            {...register("title", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter event title"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            {...register("date", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Time */}
        <div className="mb-4">
          <label
            htmlFor="timeFrom"
            className="block text-sm font-medium text-gray-700"
          >
            Time:
          </label>
          <div className="flex space-x-4">
            <input
              type="time"
              {...register("timeFrom", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="time"
              {...register("timeTo", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location:
          </label>
          <input
            {...register("location", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter location"
          />
        </div>

        {/* Organizer */}
        <div className="mb-4">
          <label
            htmlFor="organizer"
            className="block text-sm font-medium text-gray-700"
          >
            Organizer:
          </label>
          <input
            {...register("organizer", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter organizer name"
          />
        </div>

        {/* Type */}
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type:
          </label>
          <select
            {...register("type", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="Student">Student</option>
            <option value="External">External</option>
          </select>
        </div>

        {/* Image */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image (optional):
          </label>
          <input
            type="file"
            {...register("image")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter event description"
          />
        </div>

        <CustomButton type="submit">Publish Event</CustomButton>
      </form>
    </div>
  );
}
