"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInput } from "@fullcalendar/core";
import ShowEvent from "./ShowEvent";
import { IntraEventInput } from "@/lib/IntraEvents";
import { EventData } from "@/types/general";


type ShowEventData = {
  id: string;
  title: string;
  type: string;
  date: Date;
  timeFrom: Date;
  timeTo: Date;
  location: string;
  organizer: string;
  image: string | null;
  description: string | null;
  creatorId: string | null;
  maxSpots: number;
  subscriberCount: number;
  isSubscribed: boolean;
};

type Props = {
  intraEvents: IntraEventInput[];
  dbEvents: EventData[];
  currentUserId?: string | null;
};

export default function Calendar({
  intraEvents,
  dbEvents,
  currentUserId,
}: Props) {
  const [selectedEvent, setSelectedEvent] = useState<ShowEventData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatted: EventInput[] = dbEvents.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.timeFrom,
    end: event.timeTo,
    backgroundColor: "#3b82f6",
    borderColor: "#2563eb",
    extendedProps: {
      ...event,
      date: new Date(event.date),
      timeFrom: new Date(event.timeFrom),
      timeTo: new Date(event.timeTo),
    } satisfies ShowEventData,
  }));

  const intraFormatted: EventInput[] = intraEvents.map((event) => ({
    id: String(event.id),
    title: event.name,
    start: event.begin_at,
    end: event.end_at,
    backgroundColor: "#8b5cf6",
    borderColor: "#7c3aed",
    extendedProps: {
      id: String(event.id),
      title: event.name,
      type: event.kind ?? "Intra",
      date: new Date(event.begin_at),
      timeFrom: new Date(event.begin_at),
      timeTo: new Date(event.end_at),
      location: event.location ?? "",
      organizer: "42 Intra",
      description: event.description ?? null,
      image: null,
      creatorId: null,
      maxSpots: event.max_people ?? 0,
      subscriberCount: event.nbr_subscribers,
      isSubscribed: false,
    } satisfies ShowEventData,
  }));

  const events = [...formatted, ...intraFormatted];

  return (
    <>
      <FullCalendar
        //start:mk added please test
        scrollTime="10:00:00"      // but opens scrolled to 8am
        scrollTimeReset={false}
        //end:mk added please test
        height="100%"
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        initialView="timeGridWeek"
        allDaySlot={false}

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
