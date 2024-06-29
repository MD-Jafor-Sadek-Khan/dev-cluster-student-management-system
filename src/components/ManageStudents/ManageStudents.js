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
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage] = useState(5)

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

  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.firstName} ${student.middleName} ${student.lastName}`.toLowerCase()
    const searchParts = search.toLowerCase().split(" ")
    return searchParts.every((part) => fullName.includes(part))
  })

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

  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  )

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

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
          {currentStudents.map((student) => (
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
      <Pagination>
        <PageNumber onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </PageNumber>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageNumber
            key={i + 1}
            onClick={() => paginate(i + 1)}
            active={currentPage === i + 1}
          >
            {i + 1}
          </PageNumber>
        ))}
        <PageNumber onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </PageNumber>
      </Pagination>

      <ViewStudentModal
        student={selectedStudent}
        isOpen={isViewModalOpen}
        onRequestClose={closeViewModal}
        key={selectedStudent?.rollNumber}
      />

      <EditStudentModal
        selectedStudent={selectedStudent}
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        handleEditChange={handleEditChange}
        handleSave={handleSave}
        key={selectedStudent?.rollNumber}
      />

      <DeleteStudentModal
        isOpen={isDeleteModalOpen}
        confirmDelete={confirmDelete}
        onRequestClose={closeDeleteModal}
        key={deleteStudentId}
      />
    </Container>
  )
}

export default ManageStudents

const Container = styled.div`
  background-color: #fffcfb;
  border-radius: 8px;
  margin-top: 1.4rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1.93rem;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
`

const Title = styled.h1`
  color: #000;
  font-size: 16px;
  margin: 0;
`

const SearchWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 1rem;
  @media (max-width: 480px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
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
  @media (max-width: 768px) {
    width: 200px;
  }
  @media (max-width: 480px) {
    width: 100%;
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
  margin-right: 1rem;

  &:hover {
    box-shadow: 0px 4px 4px 0px #00000040;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    margin-right: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
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

  @media (max-width: 768px) {
    th,
    td {
      padding: 0.5rem 1rem;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 0.25rem 0.5rem;
    }
    th,
    td {
      display: block;
      text-align: right;
    }
    th {
      text-align: left;
    }
    td:last-child {
      justify-content: center;
    }
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
  @media (max-width: 480px) {
    margin-top: 0.5rem;
    width: 100%;
    text-align: left;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const PageNumber = styled.span`
  margin: 0 5px;
  padding: 9px 18px;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0px 0px 3px 0px #00000033;
  background-color: ${(props) => (props.active ? "#f33823" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};

  &:hover {
    background-color: #f33823;
    color: #fff;
  }

  ${(props) =>
    props.disabled &&
    `
    pointer-events: none;
    opacity: 0.5;
  `}
`
Modal.setAppElement("#root")
