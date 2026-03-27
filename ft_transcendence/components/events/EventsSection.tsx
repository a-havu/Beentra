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
      <div className=" gap-8 min-h-[60vh] flex flex-col md:flex-row">
        <div className="flex-1">
          <h2 className="pb-2">Today's Events</h2>
          <EventList
            events={todaysEvents}
            currentUserId={currentUserId}
            currentUserRole={currentUserRole}
          />
          <div className="mt-10 flex justify-center">
            <AddEvent onEventCreated={addEvent} />
          </div>
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
