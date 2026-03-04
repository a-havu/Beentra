"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Event } from "@/lib/generated/prisma/client";
import { EventInput } from "@fullcalendar/core";
import ShowEvent from "./ShowEvent";

type EventAPI = Omit<
  Event,
  "date" | "timeFrom" | "timeTo" | "createdAt" | "updatedAt"
> & {
  date: string;
  timeFrom: string;
  timeTo: string;
  createdAt: string;
  updatedAt: string;
};

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data: EventAPI[] = await res.json();

        const formatted: EventInput[] = data.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.timeFrom,
          end: event.timeTo,
          extendedProps: {
            ...event,
            date: new Date(event.date),
            timeFrom: new Date(event.timeFrom),
            timeTo: new Date(event.timeTo),
            createdAt: new Date(event.createdAt),
            updatedAt: new Date(event.updatedAt),
          },
        }));

        setEvents(formatted);
      } catch (err) {
        console.error(err);
      }
    }

    fetchEvents();
  }, []);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        initialView="timeGridWeek"
        allDaySlot={false}
        height="80vh"
        events={events}
        eventClick={(info) => {
          const eventData = info.event.extendedProps as Event;
          setSelectedEvent(eventData);
          setIsModalOpen(true);
        }}
      />

      <ShowEvent
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
