import { useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, handleOpenModal, handleCloseModal, handleModal };
};
