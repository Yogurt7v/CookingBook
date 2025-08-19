'use client';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/react';
import { ReactNode } from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function CustomModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'xs',
}: IProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size} className="bg-gray-500">
        <ModalContent>
          <ModalHeader className="border-b">
            <h3 className="text-xl text-background font-semibold">{title}</h3>
          </ModalHeader>
          <ModalBody className="space-y-4 py-6">{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
