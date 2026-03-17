"use client";

import { useState } from "react";
import AddEvent from "../dashboard/AddEvent";
import EventList from "./EventList";
import Calendar from "./Calendar";
import { FullEventData } from "./EventCard";
import { IntraEventInput } from "@/lib/IntraEvents";

type Props = {
  initialEvents: FullEventData[];
  intraEvents: IntraEventInput[];
  currentUserId: string | null;
  currentUserRole: string | null;
};

export default function EventsSection({ initialEvents, intraEvents, currentUserId, currentUserRole }: Props) {
  const [events, setEvents] = useState(initialEvents);

  const today = new Date();
  const todaysEvents = events.filter((event) => {
    const d = new Date(event.date);
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  });

  function addEvent(event: FullEventData) {
    setEvents((prev) => [...prev, event]);
  }

  return (
    <>
      <div className="mb-5">
        <AddEvent onEventCreated={addEvent} />
      </div>
      <div className="flex gap-8">
        <div className="flex-1">
          <h1>Todays Events</h1>
          <EventList events={todaysEvents} currentUserId={currentUserId} currentUserRole={currentUserRole} />
        </div>
        <div className="flex-2">
          <Calendar intraEvents={intraEvents} dbEvents={events} currentUserId={currentUserId} />
        </div>
      </div>
    </>
  );
}
