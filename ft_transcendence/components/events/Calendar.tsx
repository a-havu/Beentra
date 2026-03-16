"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInput } from "@fullcalendar/core";
import ShowEvent from "./ShowEvent";
import { fetchIntraEvents, IntraEventInput } from "@/lib/IntraEvents";

type EventAPI = {
  id: string;
  title: string;
  type: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  location: string;
  organizer: string;
  image: string | null;
  description: string | null;
  creatorId: string | null;
  maxSpots: number;
  subscriberCount: number;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
};

type ShowEventData = {
  id: string;
  title: string;
  type: string;
  date: Date;
  timeFrom: Date;
  timeTo: Date;
  location: string;
  organizer: string;
  description: string | null;
  creatorId: string | null;
  maxSpots: number;
  subscriberCount: number;
  isSubscribed: boolean;
};

type Props = {
  intraEvents: IntraEventInput[];
};

export default function Calendar({ intraEvents }: Props) {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ShowEventData | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [eventsRes, meRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/auth/me"),
        ]);

        if (!eventsRes.ok) throw new Error("Failed to fetch events");
        const data: EventAPI[] = await eventsRes.json();

        if (meRes.ok) {
          const me = await meRes.json();
          setCurrentUserId(me.userId ?? null);
        }

        const formatted: EventInput[] = data.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.timeFrom,
          end: event.timeTo,
          backgroundColor: "#3b82f6", // blue for your own events
          borderColor: "#2563eb",
          extendedProps: {
            ...event,
            date: new Date(event.date),
            timeFrom: new Date(event.timeFrom),
            timeTo: new Date(event.timeTo),
          },
        }));

        setEvents(formatted);

        const intraFormatted: EventInput[] = intraEvents.map((event) => ({
          id: String(event.id),
          title: event.name,
          start: event.begin_at,
          end: event.end_at,
          backgroundColor: "#8b5cf6", // purple for intra events
          borderColor: "#7c3aed",
          extendedProps: {
            ...event,
            timeFrom: new Date(event.begin_at),
            timeTo: new Date(event.end_at),
          },
        }));

        setEvents([...formatted, ...intraFormatted]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchAll();
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
        eventDidMount={(info) => {
          const bg = info.event.backgroundColor;
          const border = info.event.borderColor;
          if (bg) {
            info.el.style.backgroundColor = bg;
            info.el.style.borderColor = border;
          }
        }}
        eventClick={(info) => {
          const eventData = info.event.extendedProps as ShowEventData;
          setSelectedEvent(eventData);
          setIsModalOpen(true);
        }}
      />

      <ShowEvent
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUserId={currentUserId}
      />
    </>
  );
}
