import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const ViewStudentModal = ({ isOpen, onRequestClose, student }) => {
  if (!student) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={ModalStyle}
      contentLabel="View Student Details"
    >
      <ModalHeader>
        <h2>View Student Details</h2>
        <button onClick={onRequestClose}>&times;</button>
      </ModalHeader>
      <ModalContent>
        <p>
          <strong>First Name:</strong> {student.firstName}
        </p>
        <p>
          <strong>Middle Name:</strong> {student.middleName}
        </p>
        <p>
          <strong>Last Name:</strong> {student.lastName}
        </p>
        <p>
          <strong>Class:</strong> {student.class}
        </p>
        <p>
          <strong>Division:</strong> {student.division}
        </p>
        <p>
          <strong>Roll Number:</strong> {student.rollNumber}
        </p>
        <p>
          <strong>Address Line 1:</strong> {student.addressLine1}
        </p>
        <p>
          <strong>Address Line 2:</strong> {student.addressLine2}
        </p>
        <p>
          <strong>Landmark:</strong> {student.landmark}
        </p>
        <p>
          <strong>City:</strong> {student.city}
        </p>
        <p>
          <strong>Pincode:</strong> {student.pincode}
        </p>
      </ModalContent>
    </Modal>
  );
};

export default ViewStudentModal;

const ModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
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
