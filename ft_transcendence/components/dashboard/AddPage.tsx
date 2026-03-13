"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import CreatePage from "../pages/CreatePage";

type Props = {
  onSuccess?: () => void;
};

export default function AddPage({ onSuccess }: Props) {
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
        Add Page
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBody>
          <CreatePage onSuccess={handleSuccess} />
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
