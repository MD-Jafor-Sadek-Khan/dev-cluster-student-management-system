import React from "react"
import styled from "styled-components"
import Modal from "react-modal"
import { FaTimes } from "react-icons/fa"

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
        <Title>Edit Student Details</Title>
        <CloseButton onClick={closeEditModal}>
          <FaTimes />
        </CloseButton>
      </ModalHeader>
      {selectedStudent && (
        <ModalContent as="form" onSubmit={handleSave}>
          <FormRow>
            <Label>
              First Name
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={selectedStudent.firstName}
                onChange={handleEditChange}
                required
              />
            </Label>
            <Label>
              Middle Name
              <Input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                value={selectedStudent.middleName}
                onChange={handleEditChange}
              />
            </Label>
            <Label>
              Last Name
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={selectedStudent.lastName}
                onChange={handleEditChange}
                required
              />
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Class
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
            </Label>
            <Label>
              Division
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
            </Label>
            <Label>
              Roll Number
              <Input
                type="text"
                name="rollNumber"
                placeholder="Enter Roll Number"
                value={selectedStudent.rollNumber}
                onChange={handleEditChange}
                required
              />
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Address Line 1
              <Input
                type="text"
                name="addressLine1"
                placeholder="Address Line 1"
                value={selectedStudent.addressLine1}
                onChange={handleEditChange}
                required
              />
            </Label>
            <Label>
              Address Line 2
              <Input
                type="text"
                name="addressLine2"
                placeholder="Address Line 2"
                value={selectedStudent.addressLine2}
                onChange={handleEditChange}
              />
            </Label>
          </FormRow>
          <FormRow>
            <Label>
              Landmark
              <Input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={selectedStudent.landmark}
                onChange={handleEditChange}
              />
            </Label>
            <Label>
              City
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={selectedStudent.city}
                onChange={handleEditChange}
                required
              />
            </Label>
            <Label>
              Pincode
              <Input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={selectedStudent.pincode}
                onChange={handleEditChange}
                required
              />
            </Label>
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
    width: "60%",
    padding: " 2.5rem 3rem",
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
  font-size: 20px;
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
  margin: 3.2rem 0 0 0;
`

const FormRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 15px;
`

const Label = styled.label`
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #333;
`

const Input = styled.input`
  margin: 5px 0;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.3s;

  &:focus {
    border-color: #f33823;
    outline: none;
  }
`

const Select = styled.select`
  margin: 5px 0;

  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.3s;

  &:focus {
    border-color: #f33823;
    outline: none;
  }
`

const ModalButton = styled.button`
  padding: 16px 0;
  background-color: #f33823;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-top: 30px;
  font-size: 18px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e22e31;
  }
`
