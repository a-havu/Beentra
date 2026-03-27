"use client";

import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
      toCalendarEvent(e, { bg: "#d3f7fc", border: "#3ebdd1" })
    ),
    ...intraEvents.map((e) =>
      toCalendarEvent(e, { bg: "#EAE1FF", border: "#7e59e4" })
    ),
  ];

  return (
    <>
      <FullCalendar
        contentHeight={isMobile ? "auto" : 700}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: isMobile ? "listWeek,dayGridMonth" : "dayGridMonth,timeGridWeek",
        }}
        initialView={isMobile ? "listWeek" : "timeGridWeek"}
        firstDay={1}
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
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
