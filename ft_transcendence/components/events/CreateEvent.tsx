"use client";

import { useState } from "react";
import CustomButton from "../ui/SubmitFormButton";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [location, setLocation] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [type, setType] = useState("Student");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        date,
        timeFrom,
        timeTo,
        location,
        organizer,
        type,
        image,
        description,
      }),
    });

    if (!res.ok) {
      console.error("Failed to create event");
      return;
    }

    const data = await res.json();
    console.log("Event Created:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md gap-5"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Event
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Time (from - to) */}
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
              id="timeFrom"
              name="timeFrom"
              value={timeFrom}
              onChange={(e) => setTimeFrom(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="From"
            />
            <input
              type="time"
              id="timeTo"
              name="timeTo"
              value={timeTo}
              onChange={(e) => setTimeTo(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="To"
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
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            type="text"
            id="organizer"
            name="organizer"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
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
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="Student" className="text-blue-500">
              Student
            </option>
            <option value="External" className="text-red-500">
              External
            </option>
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
            id="image"
            name="image"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
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
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter event description"
          />
        </div>

        {/* Publish Button */}
        <CustomButton type="submit">Publish Event</CustomButton>
      </form>
    </div>
  );
}
