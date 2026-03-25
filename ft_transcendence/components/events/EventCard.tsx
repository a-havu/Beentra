"use client";

import { useState } from "react";
import ShowEvent from "./ShowEvent";
import { EventData } from "@/types/general";

type Props = {
  event: EventData;
  currentUserId?: string | null;
  currentUserRole?: string | null;
};

const EventCard = ({ event, currentUserId, currentUserRole }: Props) => {
  const [subscriberCount, setSubscriberCount] = useState(event.subscriberCount);
  const [isSubscribed, setIsSubscribed] = useState(event.isSubscribed);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  console.log(event.creatorId);
  console.log(currentUserId);

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
    <>
      <div
        className={`relative p-4 mt-4 rounded-lg shadow-md cursor-pointer ${
          event.creatorId === null
            ? "border border-[#7e59e4] bg-[#EAE1FF] text-black hover:bg-[#f1ecfb]"
            : "border border-[#3ebdd1] bg-[#d3f7fc] text-black hover:bg-[#f3fbfc]"
        }`}
        onClick={() => setShowModal(true)}
      >
		{event.creatorId === null
		? <p className="text-[#4821B5] text-sm">Intra</p>
		: <p className="text-[#19525a] text-sm">Student</p>}
        <h2>{event.title}</h2>
        <p>{from} – {to}</p>
        <p>Where: {event.location}</p>
        {/* {event.description && <p>{event.description}</p>} */}
        {event.maxSpots > 0 && (
          <p>
            {subscriberCount}/{event.maxSpots} spots taken
          </p>
        )}
		<div className="flex flex-col right-2 absolute bottom-3">
		<p className="text-gray-500 text-sm">Organizer: {event.organizer}</p>
        {showSubscribeButton && (
          <button className="cursor-cell text-red-400"
            onClick={(e) => {
              e.stopPropagation();
              handleSubscribe();
            }}
            disabled={loading || (!isSubscribed && isFull)}
          >
            {isSubscribed ? "Unsubscribe" : isFull ? "Full" : "Subscribe"}
          </button>
        )}
		</div>
      </div>
      <ShowEvent
        event={event}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
    </>
  );
};

export default EventCard;
