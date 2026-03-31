"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { EventData } from "@/types/general";

type Props = {
  events: EventData[];
  currentUserId: string | null;
  currentUserRole?: string | null;
};

const EventGrid = ({
  events: initialEvents,
  currentUserId,
  currentUserRole,
}: Props) => {
  const [events, setEvents] = useState(initialEvents);

  const handleUnsubscribe = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  if (events.length === 0) return <p>No events found.</p>;

  const grouped = events.reduce<Record<string, EventData[]>>((acc, event) => {
    const day = event.date.slice(0, 10);
    (acc[day] ??= []).push(event);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([day, dayEvents]) => (
        <div key={day}>
          <h2 className="text-md font-semibold text-black mt-6 mb-2">
            {new Date(day).toLocaleDateString("en-FI", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
            {dayEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                currentUserId={currentUserId}
                currentUserRole={currentUserRole}
                onUnsubscribe={handleUnsubscribe}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventGrid;
