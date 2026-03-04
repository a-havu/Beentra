"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalHeader from "../ui/ModalHeader";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import { Event } from "@/lib/generated/prisma/client";

type ShowEventProps = {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ShowEvent({ event, isOpen, onClose }: ShowEventProps) {
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
