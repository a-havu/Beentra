"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInput } from "@fullcalendar/core";
import ShowEvent from "./ShowEvent";

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

export default function Calendar() {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ShowEventData | null>(null);
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
          extendedProps: {
            ...event,
            date: new Date(event.date),
            timeFrom: new Date(event.timeFrom),
            timeTo: new Date(event.timeTo),
          },
        }));

        setEvents(formatted);
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
