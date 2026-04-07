"use client";

import { useState } from "react";
import ShowEvent from "./ShowEvent";
import { EventData } from "@/types/general";

type Props = {
  event: EventData;
  currentUserId?: string | null;
  currentUserRole?: string | null;
  onUnsubscribe?: (id: string) => void;
};

const EventCard = ({
  event,
  currentUserId,
  currentUserRole,
  onUnsubscribe,
}: Props) => {
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

  const isIntra = event.creatorId === null && event.publicCreatorId === null;
  const isCreator = currentUserId && event.creatorId === currentUserId;
  const isPast = new Date(event.timeTo) < new Date();
  const showSubscribeButton = currentUserId && !isCreator && !isIntra && !isPast;
  const isFull = event.maxSpots > 0 && subscriberCount >= event.maxSpots;

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const method = isSubscribed ? "DELETE" : "POST";
      const res = await fetch(`/api/events/${event.id}/subscribe`, { method });
      if (res.ok) {
        setIsSubscribed(!isSubscribed);
        setSubscriberCount((c) => c + (isSubscribed ? -1 : 1));
        if (isSubscribed) {
          onUnsubscribe?.(event.id); // 👈 add this
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`relative pt-11 p-4 mt-4 min-w-80 rounded-xl shadow-sm cursor-pointer ${
          isIntra
            ? "border border-[#7e59e4] bg-[#feffee] text-black hover:bg-[#f1ecfb]"
            : "border border-[#3ebdd1] bg-[#feffee] text-black hover:bg-[#f3fbfc]"
        }`}
        onClick={() => setShowModal(true)}
      >
        {isIntra ? (
          <div className="absolute top-0 left-0 bg-[#e8e1fd] w-20 rounded-tl-xl rounded-br-xl">
            <p className="p-2 flex justify-center text-sm text-[#4821B5]">
              Intra
            </p>
          </div>
        ) : (
          <div className="absolute top-0 left-0 bg-[#daf6fb] w-20 rounded-tl-xl rounded-br-xl">
            <p className="p-2 flex justify-center text-sm text-[#2a5159]">
              Beentra
            </p>
          </div>
        )}
        <div>
          {isIntra ? (
            <h3 className="text-[#4821B5]">{event.title}</h3>
          ) : (
            <h3 className="text-[#015b8f]">{event.title}</h3>
          )}
          <p>
            {from} – {to}
          </p>
          <p>🧭 {event.location}</p>
          {/* {event.description && <p>{event.description}</p>} */}
          {event.maxSpots > 0 && (
            <p>
              {subscriberCount}/{event.maxSpots} spots taken
            </p>
          )}
          <div className="flex justify-between items-end mt-2">
            <p className="text-gray-500 text-sm">🤹 {event.organizer}</p>
            {showSubscribeButton && (
              <button
                className={`absolute bottom-0 right-0 cursor-pointer px-5 py-3 rounded-tl-xl rounded-br-xl text-lg ${
                  isIntra
                    ? "text-[#4821B5] bg-[#e8e1fd]"
                    : "text-[#015b8f] bg-[#daf6fb] hover:bg-[#b3eff9]"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe();
                }}
                disabled={loading || (!isSubscribed && isFull)}
              >
                {isSubscribed ? (
                  <span className="text-red-800">Unsubscribe</span>
                ) : isFull ? (
                  "Full"
                ) : (
                  "Subscribe"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <ShowEvent
        event={event}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
        onUnsubscribe={onUnsubscribe}
      />
    </>
  );
};

export default EventCard;
