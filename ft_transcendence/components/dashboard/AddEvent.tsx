"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import CreateEvent from "../events/CreateEvent";

type Props = {
  onSuccess?: () => void;
};

function AddEvent({ onSuccess }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleSuccess = () => {
    setShowModal(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      <Button variant="adding" onClick={() => setShowModal(true)} size="large">
        Add Event
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBody>
          <CreateEvent onSuccess={handleSuccess} />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddEvent;
