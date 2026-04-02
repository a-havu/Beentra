'use client'
import { deletePage } from '@/app/(protected)/actions'
import { useState } from 'react';
import { Button } from '../ui/Button';
import Modal from '../ui/Modal';
import ModalBody from '../ui/ModalBody';
import ModalFooter from '../ui/ModalFooter';
import PageForm from '../pages/PageForm';

type Props = {
  id: number;
  initialData: { title: string; text: string };
}

export default function FunctionalButtons({ id, initialData }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    const deleted = await deletePage(id);
    if (deleted.success) {
      alert(`Page "${deleted.data?.title}" deleted`);
    }
  }

  return (
    <div className="flex gap-2">

	<Button variant="secondary" onClick={() => setShowEditModal(true)}>
        Edit
    </Button>

      <Button variant="delete" onClick={handleDelete}>
        Delete
      </Button>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <ModalBody>
          <PageForm
            id={id}
            initialData={initialData}
            onSuccess={() => setShowEditModal(false)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}