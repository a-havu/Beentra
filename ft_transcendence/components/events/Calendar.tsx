"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventInput } from "@fullcalendar/core";
import ShowEvent from "./ShowEvent";
import { EventData } from "@/types/general";

type Props = {
  intraEvents: EventData[];
  dbEvents: EventData[];
  currentUserId?: string | null;
};

export default function Calendar({
  intraEvents,
  dbEvents,
  currentUserId,
}: Props) {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toCalendarEvent = (
    event: EventData,
    color: { bg: string; border: string }
  ): EventInput => ({
    id: event.id,
    title: event.title,
    start: event.timeFrom,
    end: event.timeTo,
    backgroundColor: color.bg,
    borderColor: color.border,
    extendedProps: event,
  });

  const events = [
    ...dbEvents.map((e) =>
      toCalendarEvent(e, { bg: "#e9fcff", border: "#7CEEFF" })
    ),
    ...intraEvents.map((e) =>
      toCalendarEvent(e, { bg: "#faf5ff", border: "#dab2ff" })
    ),
  ];

  return (
    <>
      <FullCalendar
        contentHeight={700}
        plugins={[dayGridPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        initialView="timeGridWeek"
        firstDay={1}
        allDaySlot={false}
        scrollTime="08:00:00"
        scrollTimeReset={false}
        slotDuration="00:30:00"
        slotLabelInterval="01:00:00"
        events={events}
        eventDidMount={(info) => {
          const bg = info.event.backgroundColor;
          if (bg) {
            info.el.style.backgroundColor = bg;
            info.el.style.borderColor = info.event.borderColor || "white";
          }
        }}
        eventClick={(info) => {
          setSelectedEvent(info.event.extendedProps as EventData);
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
