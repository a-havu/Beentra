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

  const isActiveToday = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return isSameDay(endDate) || (startDate <= today && endDate >= today);
  };

  const todaysEvents = [
    ...events.filter((e) => isActiveToday(e.date, e.timeTo)),
    ...formattedIntraEvents.filter((e) => isActiveToday(e.date, e.timeTo)),
  ];

  function addEvent(event: EventData) {
    setEvents((prev) => [...prev, event]);
  }

  return (
    <>
      <div className=" gap-8 min-h-[60vh] flex flex-col md:flex-row">
        <div className="flex-1">
          <h2 className="pb-2 flex justify-center">Today's Events</h2>
          <EventList
            events={todaysEvents}
            currentUserId={currentUserId}
            currentUserRole={currentUserRole}
          />
          <div className="mt-10 flex justify-center">
            <AddEvent modalBg="#CDCEFF" onEventCreated={addEvent} />
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
