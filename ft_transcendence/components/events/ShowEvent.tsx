"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import EditEvent from "./EditEvent";

type ShowEventData = {
  id: string;
  title: string;
  type: string;
  date: Date | string;
  timeFrom: Date | string;
  timeTo: Date | string;
  location: string;
  organizer: string;
  image?: string | null;
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
  currentUserRole?: string | null;
};

export default function ShowEvent({
  event,
  isOpen,
  onClose,
  currentUserId,
  currentUserRole,
}: ShowEventProps) {
  const [subscriberCount, setSubscriberCount] = useState(
    event?.subscriberCount ?? 0
  );
  const [isSubscribed, setIsSubscribed] = useState(
    event?.isSubscribed ?? false
  );
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
  const isAdmin = currentUserRole === "admin";
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

  if (isEditing) {
    return (
      <Modal isOpen={true} onClose={() => setIsEditing(false)}>
        <ModalBody>
          <EditEvent id={event.id} onSuccess={() => setIsEditing(false)} />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" form="edit-event-form" variant="primary">
            Update
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        {event.image && (
          <Image
            src={event.image}
            alt={event.title}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto max-h-64 rounded-md mb-4 object-cover"
          />
        )}
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
      </ModalBody>

      <ModalFooter>
        {showSubscribeButton && (
          <Button
            variant={isSubscribed ? "secondary" : "primary"}
            onClick={handleSubscribe}
            disabled={loading || (!isSubscribed && isFull)}
          >
            {isSubscribed ? "Unsubscribe" : isFull ? "Full" : "Subscribe"}
          </Button>
        )}
        {(isCreator || isAdmin) && event.creatorId && (
          <Button variant="edit" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
