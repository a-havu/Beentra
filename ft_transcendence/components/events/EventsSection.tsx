"use client";

import { useState } from "react";
import AddEvent from "../dashboard/AddEvent";
import EventList from "./EventList";
import Calendar from "./Calendar";
import { EventData } from "@/types/general";
import { IntraEventInput, formatIntraEvent } from "@/lib/IntraEvents";

type Props = {
  initialEvents: EventData[];
  intraEvents: IntraEventInput[];
  currentUserId: string | null;
  currentUserRole: string | null;
};

export default function EventsSection({
  initialEvents,
  intraEvents,
  currentUserId,
  currentUserRole,
}: Props) {
  const [events, setEvents] = useState(initialEvents);
  const formattedIntraEvents = intraEvents.map(formatIntraEvent);

  const today = new Date();
  const isSameDay = (d: Date) =>
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();

  const todaysEvents = [
    ...events.filter((e) => isSameDay(new Date(e.date))),
    ...formattedIntraEvents.filter((e) => isSameDay(new Date(e.date))),
  ];

  function addEvent(event: EventData) {
    setEvents((prev) => [...prev, event]);
  }

  return (
    <>
      <div className="mb-5">
        <AddEvent onEventCreated={addEvent} />
      </div>
      <div className="flex gap-8 min-h-[60vh] md:flex-row flex-col">
        <div className="flex-1">
          <h1 className="pb-2">Todays Events</h1>
          <EventList
            events={todaysEvents}
            currentUserId={currentUserId}
            currentUserRole={currentUserRole}
          />
        </div>
        <div className="flex-2">
          <Calendar
            intraEvents={formattedIntraEvents}
            dbEvents={events}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </>
  );
}
