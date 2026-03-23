"use client";
import { useState } from "react";
import { useEffect } from "react";
import DeleteEventButton from "../events/DeleteEventButton";
import EditEvent from "../events/EditEvent";
import { Button } from "../ui/Button";
import AddEvent from "./AddEvent";
import ShowEvent from "../events/ShowEvent";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import { EventData } from "@/types/general";

export function EventsTable() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
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
  };

  const handleSuccess = () => {
    setEditingId(null);
    fetchEvents();
  };

  const addSuccess = (event: EventData) => {
	setEvents((prev) => [... prev, event])
  }

  const reRender = () => {
    fetchEvents();
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-600">Loading events...</p>
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

          <AddEvent onEventCreated={addSuccess} />
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
                  <tr
                    key={event.id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
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
                              prev.filter((e) => e.id !== event.id),
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
        <Modal isOpen={!!editingId}>
          <ModalBody>
            <EditEvent id={editingId} onSuccess={handleSuccess} />
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setEditingId(null)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}
