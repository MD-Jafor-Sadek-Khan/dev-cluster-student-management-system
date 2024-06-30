import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"

const FilterModal = ({ isOpen, onRequestClose, applyFilter, buttonRef }) => {
  const [filters, setFilters] = useState({
    class: "",
    division: "",
    rollNumber: "",
    viewAll: false,
  })
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      })
    }
  }, [buttonRef, isOpen])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleApply = () => {
    applyFilter(filters)
    onRequestClose()
  }

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <StyledModal style={{ top: modalPosition.top, left: modalPosition.left }}>
      <ModalHeader>
        <ModalTitle>Filter Students</ModalTitle>
        <CloseButton onClick={onRequestClose}>
          <FaTimes />
        </CloseButton>
      </ModalHeader>
      <ModalBody>
        <ModalInput
          type="text"
          name="class"
          placeholder="Class"
          value={filters.class}
          onChange={handleChange}
          disabled={filters.viewAll}
        />
        <ModalInput
          type="text"
          name="division"
          placeholder="Division"
          value={filters.division}
          onChange={handleChange}
          disabled={filters.viewAll}
        />
        <ModalInput
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={filters.rollNumber}
          onChange={handleChange}
          disabled={filters.viewAll}
        />
        <CheckboxLabel>
          <input
            type="checkbox"
            name="viewAll"
            checked={filters.viewAll}
            onChange={handleChange}
          />
          View All Students
        </CheckboxLabel>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleApply}>Apply</ModalButton>
        <ModalButton cancel onClick={onRequestClose}>
          Cancel
        </ModalButton>
      </ModalFooter>
    </StyledModal>,
    document.body
  )
}

export default FilterModal

const StyledModal = styled.div`
  position: absolute;
  background: #fffcfb;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const ModalTitle = styled.h2`
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

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 30px;
`

const ModalButton = styled.button`
  background: ${(props) => (props.cancel ? "#6c757d" : "#f33823")};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: ${(props) => (props.cancel ? "#5a6268" : "#d32f2f")};
  }
`

const ModalInput = styled.input`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
`

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
`
