"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { EventData } from "@/types/general";

type Props = {
  events: EventData[];
  currentUserId: string | null;
  currentUserRole?: string | null;
};

const FullEventList = ({ events: initialEvents, currentUserId, currentUserRole }: Props) => {
  const [events, setEvents] = useState(initialEvents);

  const handleUnsubscribe = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div className="max-w-200! mx-auto">
      {events.map((event, index) => {
        const currentDay = event.date.slice(0, 10);
        const prevDay = index > 0 ? events[index - 1].date.slice(0, 10) : null;
        const showDateHeader = currentDay !== prevDay;
        return (
          <div key={event.id}>
            {showDateHeader && (
              <h1 className="text-sm font-semibold text-gray-500 mt-6 mb-2">
                {new Date(currentDay).toLocaleDateString("en-FI", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h1>
            )}
            <EventCard
              event={event}
              currentUserId={currentUserId}
              currentUserRole={currentUserRole}
              onUnsubscribe={handleUnsubscribe}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FullEventList;
