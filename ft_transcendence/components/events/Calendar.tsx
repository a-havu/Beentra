"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Event } from "@/lib/generated/prisma/client";
// import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/events");
      const data: Event[] = await res.json();

      const formatted: EventInput[] = data.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.timeFrom,
        end: event.timeTo,
        extendedProps: {
          description: event.description,
          location: event.location,
          organizer: event.organizer,
          image: event.image,
        },
      }));

      setEvents(formatted);
    }

    fetchEvents();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={(info) => {
        const { description, location } = info.event.extendedProps as {
          description?: string;
          location?: string;
        };

        alert(
          `${info.event.title}\n\n${description ?? ""}\n\nLocation: ${
            location ?? ""
          }`
        );
      }}
    />
  );
}
