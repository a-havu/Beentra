"use client";

import { useState } from "react";

export type EventData = {
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
};

type Props = {
  event: EventData;
  currentUserId?: string | null;
};

const EventCard = ({ event, currentUserId }: Props) => {
  const [subscriberCount, setSubscriberCount] = useState(event.subscriberCount);
  const [isSubscribed, setIsSubscribed] = useState(event.isSubscribed);
  const [loading, setLoading] = useState(false);

  const date = new Date(event.date).toLocaleDateString();
  const from = new Date(event.timeFrom).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const to = new Date(event.timeTo).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isCreator = currentUserId && event.creatorId === currentUserId;
  const showSubscribeButton = currentUserId && !isCreator;
  const isFull = event.maxSpots > 0 && subscriberCount >= event.maxSpots;

  console.log(event.creatorId)
  console.log(currentUserId)

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const method = isSubscribed ? "DELETE" : "POST";
      const res = await fetch(`/api/events/${event.id}/subscribe`, { method });
      if (res.ok) {
        setIsSubscribed(!isSubscribed);
        setSubscriberCount((c) => c + (isSubscribed ? -1 : 1));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
      <h2>{event.title}</h2>
      <p>Organizer: {event.organizer}</p>
      <p>Date: {date}</p>
      <p>
        Time: {from} – {to}
      </p>
      <p>Location: {event.location}</p>
      {event.description && <p>{event.description}</p>}
      {event.maxSpots > 0 && (
        <p>
          {subscriberCount}/{event.maxSpots} spots taken
        </p>
      )}
      {showSubscribeButton && (
        <button
          onClick={handleSubscribe}
          disabled={loading || (!isSubscribed && isFull)}
        >
          {isSubscribed ? "Unsubscribe" : isFull ? "Full" : "Subscribe"}
        </button>
      )}
    </div>
  );
};

export default EventCard;
