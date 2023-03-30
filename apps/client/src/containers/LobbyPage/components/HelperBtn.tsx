import styled from 'styled-components';
import { useModal } from '../../../hooks/useModal';
import HelperModal from '../modal/HelperModal';

const HelperBtn = () => {
  const { isOpen, handleOpenModal, handleCloseModal } = useModal();
  return (
    <>
      <Button src="../assets/help.png" alt="none" onClick={handleOpenModal} />
      {isOpen && <HelperModal setHelperModalOpen={handleCloseModal} />}
    </>
  );
};

export default HelperBtn;

const Button = styled.img`
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
  margin-right: 15px;
`;
