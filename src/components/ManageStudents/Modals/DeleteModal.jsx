import React from "react"
import styled from "styled-components"
import Modal from "react-modal"
import { FaTimes } from "react-icons/fa"

const DeleteStudentModal = ({ isOpen, onRequestClose, confirmDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={ModalStyle}
      contentLabel="Delete Confirmation"
    >
      <ModalHeader>
        <Title>Delete Confirmation</Title>
        <CloseButton onClick={onRequestClose}>
          <FaTimes />
        </CloseButton>
      </ModalHeader>
      <ModalContent>
        <Message>Are you sure you want to delete this item?</Message>
        <ButtonWrapper>
          <DeleteButton onClick={confirmDelete}>Delete</DeleteButton>
          <CancelButton onClick={onRequestClose}>Cancel</CancelButton>
        </ButtonWrapper>
      </ModalContent>
    </Modal>
  )
}

export default DeleteStudentModal

const ModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    padding: "2.5rem 3rem",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
  },
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  color: #ff3b3f;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #e63946;
  transition: color 0.3s ease;

  &:hover {
    color: #d00000;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`
const ModalContent = styled.div`
  margin-top: 25px;
`

const Message = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
  margin: 6rem 0;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`

const ModalButton = styled.button`
  padding: 15px 20px;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  flex: 1;
  text-align: center;
`

const DeleteButton = styled(ModalButton)`
  background-color: #f33823;

  &:hover {
    background-color: #e22e31;
  }
`

const CancelButton = styled(ModalButton)`
  background-color: #ddd;
  color: #333;

  &:hover {
    background-color: #ccc;
  }
`

Modal.setAppElement("#root")
