import React, { useEffect, useRef, useState } from "react"
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { db } from "../../firebase"
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore"
import { saveAs } from "file-saver"
import ViewStudentModal from "./Modals/ViewModal"
import EditStudentModal from "./Modals/EditModal"
import DeleteStudentModal from "./Modals/DeleteModal"
import FilterModal from "./Modals/FilterModal"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
  ActionButton,
  ActionButtonFilter,
  Container,
  Header,
  IconWrapper,
  PageNumber,
  Pagination,
  SearchIcon,
  SearchInput,
  SearchWrapper,
  Table,
  Timestamp,
  Title,
} from "./ManageStudents.styled"
import toast from "react-hot-toast"

const ManageStudents = () => {
  const [currentDateTime, setCurrentDateTime] = useState(formatDate(new Date()))
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState("")
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteStudentId, setDeleteStudentId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage] = useState(5)
  const [user, setUser] = useState(null)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isFilterApplied, setIsFilterApplied] = useState(false)
  const [filters, setFilters] = useState({
    class: "",
    division: "",
    rollNumber: "",
    viewAll: true,
  })

  const filterButtonRef = useRef(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(formatDate(new Date()))
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      const fetchStudents = async () => {
        try {
          const q = query(
            collection(db, "students"),
            where("userId", "==", user.uid)
          )
          const studentSnapshot = await getDocs(q)
          const studentList = studentSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setStudents(studentList)
        } catch (error) {
          console.error("Error fetching students: ", error.message)
        }
      }

      fetchStudents()
    }
  }, [user])

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

  const handleDelete = (id) => {
    setDeleteStudentId(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "students", deleteStudentId))
      setStudents(students.filter((student) => student.id !== deleteStudentId))
      setIsDeleteModalOpen(false)
      setDeleteStudentId(null)
      toast.success("Deleted Successfully")
    } catch (error) {
      console.error("Error deleting student: ", error.message)
    }
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeleteStudentId(null)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const applyFilter = (filters) => {
    setFilters(filters)
    setIsFilterApplied(
      filters.class !== "" ||
        filters.division !== "" ||
        filters.rollNumber !== "" ||
        filters.viewAll
    )
  }

  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.firstName} ${student.middleName} ${student.lastName}`.toLowerCase()
    const searchParts = search.toLowerCase().split(" ")
    const matchesSearch = searchParts.every((part) => fullName.includes(part))

    if (filters.viewAll) return matchesSearch

    const matchesFilters =
      (filters.class === "" || student.class === filters.class) &&
      (filters.division === "" || student.division === filters.division) &&
      (filters.rollNumber === "" ||
        student.rollNumber.toString().includes(filters.rollNumber))

    return matchesSearch && matchesFilters
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
    toast.success("Data Downloaded Successfully")
  }

  const handlePrint = () => {
    window.print()
  }

  const openViewModal = (student) => {
    setSelectedStudent(student)
    console.log({ student })
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
    try {
      const studentDoc = doc(db, "students", selectedStudent.id)
      await setDoc(studentDoc, selectedStudent)
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id ? selectedStudent : student
        )
      )
      closeEditModal()
      toast.success("Edited Successfully")
    } catch (error) {
      console.error("Error saving student: ", error.message)
    }
  }

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
        <ActionButtonFilter
          ref={filterButtonRef}
          onClick={() => setIsFilterModalOpen(true)}
          isFilterApplied={isFilterApplied}
        >
          Filter
        </ActionButtonFilter>
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
              <td>
                {student.class}-{student.division}
              </td>
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
        key={selectedStudent?.id}
      />

      <EditStudentModal
        selectedStudent={selectedStudent}
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        handleEditChange={handleEditChange}
        handleSave={handleSave}
        key={selectedStudent?.id}
      />

      <DeleteStudentModal
        isOpen={isDeleteModalOpen}
        confirmDelete={confirmDelete}
        onRequestClose={closeDeleteModal}
        key={selectedStudent?.id}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onRequestClose={() => setIsFilterModalOpen(false)}
        applyFilter={applyFilter}
        buttonRef={filterButtonRef}
        isFilterApplied={isFilterApplied}
      />
    </Container>
  )
}

export default ManageStudents
