// src/components/ManageStudents.js
import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { removeStudent } from "../store/studentSlice"

const ManageStudents = () => {
  const dispatch = useDispatch()
  const students = useSelector((state) => state.students)

  return (
    <Container>
      <Header>
        <Title>Manage Students</Title>
      </Header>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Age</TableHeader>
            <TableHeader>Gender</TableHeader>
            <TableHeader>Course</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>
                <RemoveButton onClick={() => dispatch(removeStudent(index))}>
                  Remove
                </RemoveButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default ManageStudents

const Container = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  margin: 20px;
  width: 80%;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h1`
  color: #000;
  font-size: 24px;
  margin: 0;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  background-color: #e53935;
  color: white;
`

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`

const RemoveButton = styled.button`
  padding: 8px 12px;
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`