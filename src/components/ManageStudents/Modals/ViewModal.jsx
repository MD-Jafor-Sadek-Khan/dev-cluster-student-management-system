import React from "react"
import Modal from "react-modal"
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"

const ViewStudentModal = ({ isOpen, onRequestClose, student }) => {
  if (!student) return null

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="View Student Details"
    >
      <ModalHeader>
        <Title>View Student Details</Title>
        <CloseButton onClick={onRequestClose}>
          <FaTimes />
        </CloseButton>
      </ModalHeader>
      <ModalContent>
        <Section>
          <SectionTitle>Personal Details</SectionTitle>
          <DetailsTable>
            <tbody>
              {renderDetailRow("First Name", student.firstName)}
              {renderDetailRow("Middle Name", student.middleName)}
              {renderDetailRow("Last Name", student.lastName)}
              {renderDetailRow("Class", student.class)}
              {renderDetailRow("Division", student.division)}
              {renderDetailRow("Roll Number", student.rollNumber)}
            </tbody>
          </DetailsTable>
        </Section>
        <Section>
          <SectionTitle>Address Details</SectionTitle>
          <DetailsTable>
            <tbody>
              {renderDetailRow("Address Line 1", student.addressLine1)}
              {renderDetailRow("Address Line 2", student.addressLine2)}
              {renderDetailRow("Landmark", student.landmark)}
              {renderDetailRow("City", student.city)}
              {renderDetailRow("Pincode", student.pincode)}
            </tbody>
          </DetailsTable>
        </Section>
      </ModalContent>
    </StyledModal>
  )
}

const renderDetailRow = (label, value) => (
  <DetailRow>
    <DetailLabel>{label}:</DetailLabel>
    <DetailValue>{value}</DetailValue>
  </DetailRow>
)

export default ViewStudentModal

const StyledModal = styled(Modal)`
  &.ReactModal__Content {
    top: 50%;
    left: 50%;
    right: 50%;
    bottom: 50%;
    margin-right: -50%;
    transform: translate(40%, 10%);
    width: 60%;
    max-width: 800px;
    padding: 2.5rem 3rem;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    color: #343a40;
    transition: all 0.3s ease;
    max-height: 80vh;
    overflow-y: auto;

    @media (max-width: 768px) {
      width: 90%;
      transform: translate(7%, 10%);

      padding: 20px;
    }

    @media (max-width: 480px) {
      width: 95%;
      transform: translate(3%, 10%);

      padding: 15px;
    }
  }
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
`

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #f33823;

  @media (max-width: 480px) {
    font-size: 20px;
  }
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
  margin-top: 20px;

  @media (max-width: 480px) {
    margin-top: 15px;
  }
`

const Section = styled.div`
  margin-bottom: 30px;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`

const SectionTitle = styled.h3`
  font-size: 16px;
  padding: 8px;
  margin-bottom: 15px;
  background: #f33823;
  border-radius: 5px;
  color: #fff;
  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`

const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const DetailRow = styled.tr`
  &:nth-child(even) {
    background-color: #fff6f5;
  }
`

const DetailLabel = styled.td`
  font-weight: 600;
  padding: 12px 15px;
  width: 35%;
  color: #495057;

  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 14px;
  }
`

const DetailValue = styled.td`
  padding: 12px 15px;
  color: #495057;

  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 14px;
  }
`
