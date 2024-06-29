// Modals/EditStudentModal.js

import React from "react"
import styled from "styled-components"
import Modal from "react-modal"

const EditStudentModal = ({
  isEditModalOpen,
  closeEditModal,
  selectedStudent,
  handleEditChange,
  handleSave,
}) => {
  return (
    <Modal
      isOpen={isEditModalOpen}
      onRequestClose={closeEditModal}
      style={ModalStyle}
      contentLabel="Edit Student Details"
    >
      <ModalHeader>
        <h2>Edit Student Details</h2>
        <button onClick={closeEditModal}>&times;</button>
      </ModalHeader>
      {selectedStudent && (
        <ModalContent as="form" onSubmit={handleSave}>
          <FormRow>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={selectedStudent.firstName}
              onChange={handleEditChange}
              required
            />
            <Input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={selectedStudent.middleName}
              onChange={handleEditChange}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={selectedStudent.lastName}
              onChange={handleEditChange}
              required
            />
          </FormRow>
          <FormRow>
            <Select
              name="class"
              value={selectedStudent.class}
              onChange={handleEditChange}
              required
            >
              <option value="">Select Class</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
            </Select>
            <Select
              name="division"
              value={selectedStudent.division}
              onChange={handleEditChange}
              required
            >
              <option value="">Select Division</option>
              <option value="A">Division A</option>
              <option value="B">Division B</option>
              <option value="C">Division C</option>
            </Select>
            <Input
              type="text"
              name="rollNumber"
              placeholder="Enter Roll Number in Digits"
              value={selectedStudent.rollNumber}
              onChange={handleEditChange}
              required
            />
          </FormRow>
          <FormRow>
            <Input
              type="text"
              name="addressLine1"
              placeholder="Address Line 1"
              value={selectedStudent.addressLine1}
              onChange={handleEditChange}
              required
            />
            <Input
              type="text"
              name="addressLine2"
              placeholder="Address Line 2"
              value={selectedStudent.addressLine2}
              onChange={handleEditChange}
            />
          </FormRow>
          <FormRow>
            <Input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={selectedStudent.landmark}
              onChange={handleEditChange}
            />
            <Input
              type="text"
              name="city"
              placeholder="City"
              value={selectedStudent.city}
              onChange={handleEditChange}
              required
            />
            <Input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={selectedStudent.pincode}
              onChange={handleEditChange}
              required
            />
          </FormRow>
          <ModalButton type="submit">Save</ModalButton>
        </ModalContent>
      )}
    </Modal>
  )
}

export default EditStudentModal

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
}

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
`

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
`

const FormRow = styled.div`
  display: flex;
  margin-bottom: 15px;
  gap: 10px;
`

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`

const Select = styled.select`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`

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
`
