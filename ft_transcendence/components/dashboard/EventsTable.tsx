
"use client";
import { useState } from "react";
import { useEffect } from "react";
import DeleteEventButton from "../events/DeleteEventButton";
import EditEvent from "../events/EditEvent";
import { Button } from "../ui/Button";
import AddEvent from "./AddEvent";
import ShowEvent from "../events/ShowEvent";

type Event = {
  id: string;
  title: string;
  type: string;
  date: Date;
  timeFrom: Date;
  timeTo: Date;
  location: string;
  organizer: string;
  image: string | null;
  description: string | null;
  creatorId: string | null;
  maxSpots: number;
  subscriberCount: number;
  isSubscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function EventsTable() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);

        const response = await fetch("/api/events", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Events");
        }

        const data = await response.json();

        setEvents(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching events: ", err);
        setError("Failed to load events. Please try again");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Event Management</h2>

          <AddEvent />
        </div>
        <div>
          {/* Table header */}
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Organizer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Modify
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {events.map((event, index) => {
                return (
                  <tr key={event.id} className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => setSelectedEvent(event)}>
                    <td className="px6 py-4 text-center text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px6 py-4 text-center text-sm text-gray-600">
                      {event.title}
                    </td>
                    <td className="px6 py-4 text-center text-sm text-gray-600">
                      {event.location}
                    </td>
                    <td className="px6 py-4 text-center text-sm text-gray-600">
                      {event.organizer}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="edit"
                          onClick={() => setEditingId(event.id)}
                        >
                          Edit
                        </Button>
                        <DeleteEventButton
                          id={event.id}
                          onDeleted={() => {
                            setEvents((prev) =>
                              prev.filter((e) => e.id !== event.id)
                            );
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {selectedEvent && (
        <ShowEvent
          event={selectedEvent}
          isOpen={!!selectedEvent} // Turns the value to a boolean and then checks if its true or not (is there event or not)
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {editingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative">
            <button
              onClick={() => setEditingId(null)}
              className="absolute top-2 right-2 text-gray-600"
            >
              ✕
            </button>

            <EditEvent id={editingId} />
          </div>
        </div>
      )}
    </>
  );
}
