"use client";

import EventCard, { EventData } from "./EventCard";

type Props = {
  events: EventData[];
  currentUserId?: string | null;
  currentUserRole?: string | null;
};

const EventList = ({ events, currentUserId, currentUserRole }: Props) => {
  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} currentUserId={currentUserId} currentUserRole={currentUserRole} />
      ))}
    </div>
  );
};

export default EventList;
