"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";

type ShowEventData = {
  id: string;
  title: string;
  type: string;
  date: Date | string;
  timeFrom: Date | string;
  timeTo: Date | string;
  location: string;
  organizer: string;
  description?: string | null;
  creatorId?: string | null;
  maxSpots: number;
  subscriberCount: number;
  isSubscribed: boolean;
};

type ShowEventProps = {
  event: ShowEventData | null;
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string | null;
};

export default function ShowEvent({ event, isOpen, onClose, currentUserId }: ShowEventProps) {
  const [subscriberCount, setSubscriberCount] = useState(event?.subscriberCount ?? 0);
  const [isSubscribed, setIsSubscribed] = useState(event?.isSubscribed ?? false);
  const [loading, setLoading] = useState(false);

  if (!event) return null;

  const formatDate = (value: Date | string) => {
    const date = new Date(value);
    return date.toLocaleDateString("fi-FI");
  };
  const formatTime = (value: Date | string) => {
    const date = new Date(value);
    return date.toLocaleTimeString("fi-FI", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isCreator = currentUserId && event.creatorId === currentUserId;
  const showSubscribeButton = currentUserId && !isCreator;
  const isFull = event.maxSpots > 0 && subscriberCount >= event.maxSpots;

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <h2 className="text-xl font-bold mb-4">{event.title}</h2>
        <p>
          <strong>Date:</strong> {formatDate(event.date)}
        </p>
        <p>
          <strong>From:</strong> {formatTime(event.timeFrom)}
          <strong> To:</strong> {formatTime(event.timeTo)}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Organizer:</strong> {event.organizer}
        </p>
        <p className="mt-4">{event.description}</p>
        {event.maxSpots > 0 && (
          <p className="mt-2">
            <strong>Spots:</strong> {subscriberCount}/{event.maxSpots} taken
          </p>
        )}
        {showSubscribeButton && (
          <button
            onClick={handleSubscribe}
            disabled={loading || (!isSubscribed && isFull)}
            className="mt-3"
          >
            {isSubscribed ? "Unsubscribe" : isFull ? "Full" : "Subscribe"}
          </button>
        )}
      </ModalBody>

      <ModalFooter>
        <Button variant="edit" onClick={onClose}>
          Edit
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
