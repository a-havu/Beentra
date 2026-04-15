"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import CreateEvent from "../events/CreateEvent";
import { EventData } from "@/types/general";

type Props = {
  onSuccess?: () => void;
  onEventCreated?: (event: EventData) => void;
  modalBg?: string;
};

function AddEvent({ onSuccess, onEventCreated, modalBg }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleSuccess = () => {
    setShowModal(false);
    onSuccess?.();
  };

  return (
    <>
      <Button variant="adding" onClick={() => setShowModal(true)} size="large">
        Add Event
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} bgColor={modalBg}>
        <ModalBody>
          <CreateEvent
            onSuccess={handleSuccess}
            onEventCreated={onEventCreated}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" form="create-event-form" variant="primary">
            Create
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddEvent;
