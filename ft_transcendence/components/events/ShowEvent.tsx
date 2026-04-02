"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import EditEvent from "./EditEvent";
import { useRouter } from "next/navigation";

type ShowEventData = {
  id: string;
  title: string;
  type?: string | null;
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
  onUnsubscribe?: (id: string) => void;
};

export default function ShowEvent({
  event,
  isOpen,
  onClose,
  currentUserId,
  currentUserRole,
  onUnsubscribe,
}: ShowEventProps) {
  const [localEvent, setLocalEvent] = useState(event);
  const [subscriberCount, setSubscriberCount] = useState(
    event?.subscriberCount ?? 0
  );
  const [isSubscribed, setIsSubscribed] = useState(
    event?.isSubscribed ?? false
  );

  useEffect(() => {
    setLocalEvent(event);
    setSubscriberCount(event?.subscriberCount ?? 0);
    setIsSubscribed(event?.isSubscribed ?? false);
    setSubscribers(null);
  }, [event]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subscribers, setSubscribers] = useState<
    { username: string; fullName: string | null }[] | null
  >(null);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const router = useRouter();

  const handleSpotsHover = async () => {
    if (subscribers !== null) {
      setShowSubscribers(true);
      return;
    }
    const res = await fetch(`/api/events/${localEvent?.id}/subscribe`);
    if (res.ok) setSubscribers(await res.json());
    setShowSubscribers(true);
  };

  if (!localEvent) return null;

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

  const isCreator = currentUserId && localEvent.creatorId === currentUserId;
  const isAdmin = currentUserRole === "admin";
  const isPast = new Date(localEvent.timeTo) < new Date();
  const showSubscribeButton =
    currentUserId && !isCreator && localEvent.creatorId !== null && !isPast;
  const isFull =
    localEvent.maxSpots > 0 && subscriberCount >= localEvent.maxSpots;

  // inside the component:

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const method = isSubscribed ? "DELETE" : "POST";
      const res = await fetch(`/api/events/${localEvent.id}/subscribe`, {
        method,
      });
      if (res.ok) {
        setIsSubscribed(!isSubscribed);
        setSubscriberCount((c) => c + (isSubscribed ? -1 : 1));
        if (isSubscribed) {
          onUnsubscribe?.(localEvent.id);
          onClose();
        }
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <Modal isOpen={true} onClose={() => setIsEditing(false)}>
        <ModalBody>
          <EditEvent
            id={localEvent.id}
            onSuccess={() => setIsEditing(false)}
            onEventUpdated={(updated) =>
              setLocalEvent((prev) =>
                prev ? ({ ...prev, ...updated } as ShowEventData) : prev
              )
            }
          />
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
        {localEvent.image && (
          <Image
            src={localEvent.image}
            alt={localEvent.title}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto max-h-64 rounded-md mb-4 object-cover"
          />
        )}
        <h2 className="text-xl font-bold mb-4">{localEvent.title}</h2>
        <p>
          <strong>Date:</strong> {formatDate(localEvent.date)}
        </p>
        <p>
          <strong>From:</strong> {formatTime(localEvent.timeFrom)}
          <strong> To:</strong> {formatTime(localEvent.timeTo)}
        </p>
        <p>
          <strong>Location:</strong> {localEvent.location}
        </p>
        <p>
          <strong>Organizer:</strong> {localEvent.organizer}
        </p>
        <p className="mt-4 whitespace-pre-wrap">{localEvent.description}</p>
        {localEvent.maxSpots > 0 && (
          <div
            className="mt-2 relative inline-block cursor-default"
            onMouseEnter={handleSpotsHover}
            onMouseLeave={() => setShowSubscribers(false)}
          >
            <strong>Spots:</strong> {subscriberCount}/{localEvent.maxSpots}{" "}
            taken
            {showSubscribers && (
              <span className="absolute left-0 bottom-full mb-1 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-sm min-w-32 whitespace-nowrap">
                {subscribers === null ? (
                  <span className="text-gray-400">Loading...</span>
                ) : subscribers.length === 0 ? (
                  <span className="text-gray-400">No subscribers yet</span>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {subscribers.map((u) => (
                      <li key={u.username}>{u.fullName ?? u.username}</li>
                    ))}
                  </ul>
                )}
              </span>
            )}
          </div>
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
        {(isCreator || isAdmin) && localEvent.creatorId && (
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
