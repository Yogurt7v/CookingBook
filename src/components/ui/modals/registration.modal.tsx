'use client';

import CustomModal from '@/components/common/modal';
import RegistrationForm from '@/forms/register-form';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: IProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Создание аккаунта" size="xs">
      <RegistrationForm onClose={onClose} />
    </CustomModal>
  );
}
