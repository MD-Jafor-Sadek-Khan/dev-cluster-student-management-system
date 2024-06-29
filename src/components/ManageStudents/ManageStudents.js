import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai"

import { db } from "../../firebase"
import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"
import Modal from "react-modal"
import { saveAs } from "file-saver"
import ViewStudentModal from "./Modals/ViewModal"
import EditStudentModal from "./Modals/EditModal"
import DeleteStudentModal from "./Modals/DeleteModal"

const ManageStudents = () => {
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState("")
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteStudentId, setDeleteStudentId] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      const studentCollection = collection(db, "students")
      const studentSnapshot = await getDocs(studentCollection)
      const studentList = studentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setStudents(studentList)
    }

    fetchStudents()
  }, [])

  const handleDelete = (id) => {
    setDeleteStudentId(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    await deleteDoc(doc(db, "students", deleteStudentId))
    setStudents(students.filter((student) => student.id !== deleteStudentId))
    setIsDeleteModalOpen(false)
    setDeleteStudentId(null)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeleteStudentId(null)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(search.toLowerCase()) ||
      student.lastName.toLowerCase().includes(search.toLowerCase())
  )

  const handleExport = () => {
    const csvContent = [
      [
        "FirstName",
        "MiddleName",
        "LastName",
        "Class",
        "Division",
        "RollNumber",
        "AddressLine1",
        "AddressLine2",
        "Landmark",
        "City",
        "Pincode",
      ],
      ...students.map((student) => [
        student.firstName,
        student.middleName,
        student.lastName,
        student.class,
        student.division,
        student.rollNumber,
        student.addressLine1,
        student.addressLine2,
        student.landmark,
        student.city,
        student.pincode,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    saveAs(blob, "students.csv")
  }

  const handlePrint = () => {
    window.print()
  }

  const openViewModal = (student) => {
    setSelectedStudent(student)
    setIsViewModalOpen(true)
  }

  const closeViewModal = () => {
    setIsViewModalOpen(false)
  }

  const openEditModal = (student) => {
    setSelectedStudent(student)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setSelectedStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const studentDoc = doc(db, "students", selectedStudent.id)
    await setDoc(studentDoc, selectedStudent)
    setStudents(
      students.map((student) =>
        student.id === selectedStudent.id ? selectedStudent : student
      )
    )
    closeEditModal()
  }

  function formatDate(date) {
    const options = { day: "2-digit", month: "long", year: "numeric" }
    const formattedDate = date.toLocaleDateString("en-GB", options)
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    return `${formattedDate} ${formattedTime}`
  }

  const currentDateTime = formatDate(new Date())

  return (
    <Container>
      <Header>
        <Title>Manage Students</Title>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
          <SearchIcon />
        </SearchWrapper>
        <ActionButton onClick={handleExport}>Export</ActionButton>
        <ActionButton>Filter</ActionButton>
        <ActionButton onClick={handlePrint}>Print</ActionButton>

        <Timestamp>{currentDateTime}</Timestamp>
      </Header>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Roll No.</th>
            <th>View / Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{`${student.firstName} ${student.middleName} ${student.lastName}`}</td>
              <td>{student.class}</td>
              <td>{student.rollNumber}</td>
              <td>
                <IconWrapper onClick={() => openViewModal(student)}>
                  <AiOutlineEye />
                </IconWrapper>
                <IconWrapper onClick={() => openEditModal(student)}>
                  <AiOutlineEdit />
                </IconWrapper>
                <IconWrapper onClick={() => handleDelete(student.id)}>
                  <AiOutlineDelete />
                </IconWrapper>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <Modal
        isOpen={isViewModalOpen}
        onRequestClose={closeViewModal}
        style={ModalStyle}
        contentLabel="View Student Details"
      >
        <ModalHeader>
          <h2>View Student Details</h2>
          <button onClick={closeViewModal}>&times;</button>
        </ModalHeader>
        {selectedStudent && (
          <ModalContent>
            <p>
              <strong>First Name:</strong> {selectedStudent.firstName}
            </p>
            <p>
              <strong>Middle Name:</strong> {selectedStudent.middleName}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedStudent.lastName}
            </p>
            <p>
              <strong>Class:</strong> {selectedStudent.class}
            </p>
            <p>
              <strong>Division:</strong> {selectedStudent.division}
            </p>
            <p>
              <strong>Roll Number:</strong> {selectedStudent.rollNumber}
            </p>
            <p>
              <strong>Address Line 1:</strong> {selectedStudent.addressLine1}
            </p>
            <p>
              <strong>Address Line 2:</strong> {selectedStudent.addressLine2}
            </p>
            <p>
              <strong>Landmark:</strong> {selectedStudent.landmark}
            </p>
            <p>
              <strong>City:</strong> {selectedStudent.city}
            </p>
            <p>
              <strong>Pincode:</strong> {selectedStudent.pincode}
            </p>
          </ModalContent>
        )}
      </Modal> */}

      <ViewStudentModal
        student={selectedStudent}
        isOpen={isViewModalOpen}
        onRequestClose={closeViewModal}
        key={selectedStudent?.rollNumber}
      />

      {/* <Modal
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
      </Modal> */}

      <EditStudentModal
        selectedStudent={selectedStudent}
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        handleEditChange={handleEditChange}
        handleSave={handleSave}
        key={selectedStudent?.rollNumber}
      />

      {/* <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        style={ModalStyle}
        contentLabel="Delete Confirmation"
      >
        <ModalHeader>
          <h2>Delete Confirmation</h2>
          <button onClick={closeDeleteModal}>&times;</button>
        </ModalHeader>
        <ModalContent>
          <p>Are you sure you want to delete this item?</p>
          <ButtonWrapper>
            <ModalButtonForDelete onClick={confirmDelete}>
              Delete
            </ModalButtonForDelete>
            <CancelButton onClick={closeDeleteModal}>Cancel</CancelButton>
          </ButtonWrapper>
        </ModalContent>
      </Modal> */}


      <DeleteStudentModal isOpen={isDeleteModalOpen} confirmDelete={confirmDelete} onRequestClose={closeDeleteModal} key={deleteStudentId}/>
    </Container>
  )
}

export default ManageStudents

const Container = styled.div`
  background-color: #fffcfb;
  border-radius: 8px;
  margin-top: 1.3rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.93rem;
  align-items: center;
  margin-bottom: 32px;
`

const Title = styled.h1`
  color: #000;
  font-size: 16px;
  margin: 0;
`

const SearchWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const SearchInput = styled.input`
  padding: 8px 10px 8px 40px;
  border-radius: 10px;
  width: 266px;
  height: 52px;
  background: #eff3f6;
  border: none;
  outline: none;
  ::placeholder {
    font-size: 13px;
    color: #b5b8bf;
  }
`

const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  top: 50%;
  left: 17px;
  transform: translateY(-50%);
  color: #637381;
  font-size: 0.8rem;
`
const ActionButton = styled.button`
  padding: 16px 35.5px;
  background-color: #f8f9fb;
  color: #4e5159;
  border: 0.5px solid #647887;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    box-shadow: 0px 4px 4px 0px #00000040;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  th,
  td {
    padding: 1rem 2.5rem;
    text-align: center;
  }

  td {
    padding: 0 2.5rem;
    border: none;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  th:last-child,
  td:last-child {
    text-align: right;
  }

  th {
    background-color: #f33823;
    color: #fff;
    font-weight: normal;
  }

  tbody tr:nth-child(odd) {
    background-color: #fff;
  }

  tbody tr:nth-child(even) {
    background-color: #fff6f5;
  }

  td {
    border-bottom: none;
  }

  td:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 13px;
  box-sizing: content-box;
  background-color: transparent;
  transition: background-color 0.3s;
  border-radius: 55px;

  svg {
    color: #f33823;
    cursor: pointer;
    transition: color 0.3s;
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: #f33823;
    svg {
      color: #fff;
      cursor: pointer;
      transition: color 0.3s;
    }
  }
`

const Timestamp = styled.div`
  color: #000;
  font-size: 14px;
`

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
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

const ModalButtonForDelete = styled(ModalButton)`
  width: unset;
`

const CancelButton = styled(ModalButton)`
  background-color: #ddd;
  color: #333;
  width: unset;
  &:hover {
    background-color: #ccc;
  }
`

Modal.setAppElement("#root")
