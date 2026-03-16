"use client";

import { useEffect, useState } from "react";
import EventCard, { EventData } from "./EventCard";

const EventList = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [eventsRes, meRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/auth/me"),
        ]);

        if (!eventsRes.ok) throw new Error("Failed to fetch events");
        const data: EventData[] = await eventsRes.json();

        if (meRes.ok) {
          const me = await meRes.json();
          setCurrentUserId(me.userId ?? null);
        }

        const today = new Date();
        const todaysEvents = data.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getFullYear() === today.getFullYear() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getDate() === today.getDate()
          );
        });

        setEvents(todaysEvents);
      } catch {
        setError("Could not load events.");
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} currentUserId={currentUserId} />
      ))}
    </div>
  );
};

export default EventList;
