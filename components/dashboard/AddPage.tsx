"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import ModalBody from "../ui/ModalBody";
import ModalFooter from "../ui/ModalFooter";
import PageForm from "../pages/PageForm";

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
      <Button variant="adding" size="medium" onClick={() => setShowModal(true)}>
        Add Page
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBody>
          <PageForm onSuccess={handleSuccess} />
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
