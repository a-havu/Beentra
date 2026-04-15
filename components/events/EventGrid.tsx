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
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPast, setShowPast] = useState(false);

  const handleUnsubscribe = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.timeTo) >= now);
  const past = events.filter((e) => new Date(e.timeTo) < now);

  const groupByDay = (list: EventData[]) =>
    list.reduce<Record<string, EventData[]>>((acc, event) => {
      const day = event.date.slice(0, 10);
      (acc[day] ??= []).push(event);
      return acc;
    }, {});

  const renderSection = (list: EventData[]) => {
    const grouped = groupByDay(list);
    return Object.entries(grouped).map(([day, dayEvents]) => (
      <div key={day}>
        <h2 className="text-md font-semibold text-black mt-6 mb-2">
          {new Date(day).toLocaleDateString("en-FI", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <div className="flex flex-col gap-4">
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
    ));
  };

  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div className="flex flex-col gap-10 w-full items-center md:w-[40dvw]">
      <div className="flex gap-3">
        <button
          onClick={() => setShowUpcoming((v) => !v)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            showUpcoming
              ? "bg-[#daf6fb] border-[#3ebdd1] text-[#015b8f]"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          }`}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          onClick={() => setShowPast((v) => !v)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            showPast
              ? "bg-[#daf6fb] border-[#3ebdd1] text-[#015b8f]"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          }`}
        >
          Past ({past.length})
        </button>
      </div>
      {showUpcoming && (
        <div>
          {upcoming.length === 0 ? (
            <p className="text-gray-500 mt-2">No upcoming events.</p>
          ) : (
            renderSection(upcoming)
          )}
        </div>
      )}
      {showPast && (
        <div>
          {past.length === 0 ? (
            <p className="text-gray-500 mt-2">No past events.</p>
          ) : (
            renderSection(past)
          )}
        </div>
      )}
    </div>
  );
};

export default EventGrid;
