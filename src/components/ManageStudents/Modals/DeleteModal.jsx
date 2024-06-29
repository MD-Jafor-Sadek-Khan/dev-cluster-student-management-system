// DeleteStudentModal.js

import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const DeleteStudentModal = ({ isOpen, onRequestClose, confirmDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={ModalStyle}
      contentLabel="Delete Confirmation"
    >
      <ModalHeader>
        <h2>Delete Confirmation</h2>
        <button onClick={onRequestClose}>&times;</button>
      </ModalHeader>
      <ModalContent>
        <p>Are you sure you want to delete this item?</p>
        <ButtonWrapper>
          <ModalButtonForDelete onClick={confirmDelete}>
            Delete
          </ModalButtonForDelete>
          <CancelButton onClick={onRequestClose}>Cancel</CancelButton>
        </ButtonWrapper>
      </ModalContent>
    </Modal>
  );
};

export default DeleteStudentModal;

const ModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;

  h2 {
    margin: 0;
    font-size: 18px;
    color: #ff3b3f;
  }

  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #ff3b3f;

    &:hover {
      color: #000;
    }
  }
`;

const ModalContent = styled.div`
  margin-top: 20px;

  p {
    margin: 5px 0;
    font-size: 14px;
    color: #333;

    strong {
      color: #ff3b3f;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 15px 20px;
  background-color: #f33823;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;

  &:hover {
    background-color: #e22e31;
  }
`;

const ModalButtonForDelete = styled(ModalButton)`
  width: unset;
`;

const CancelButton = styled(ModalButton)`
  background-color: #ddd;
  color: #333;
  width: unset;
  &:hover {
    background-color: #ccc;
  }
`;

Modal.setAppElement('#root');
