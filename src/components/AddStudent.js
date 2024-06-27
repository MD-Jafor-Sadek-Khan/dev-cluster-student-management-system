// src/components/AddStudent.js
import React, { useState } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { addStudent } from "../store/studentSlice"

const AddStudent = () => {
  const dispatch = useDispatch()
  const [student, setStudent] = useState({
    name: "",
    age: "",
    gender: "",
    course: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setStudent({ ...student, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addStudent(student))
    setStudent({ name: "", age: "", gender: "", course: "" })
  }

  return (
    <Container>
      <Header>
        <Title>Add Student</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="age"
          placeholder="Age"
          value={student.age}
          onChange={handleChange}
          required
        />
        <Select
          name="gender"
          value={student.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>
        <Input
          type="text"
          name="course"
          placeholder="Course"
          value={student.course}
          onChange={handleChange}
          required
        />
        <Button type="submit">Add Student</Button>
      </Form>
    </Container>
  )
}

export default AddStudent

const Container = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  margin: 20px;
  width: 50%;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`

const Button = styled.button`
  width: 100%;
  padding: 15px 20px;
  background-color: #e53935;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #d32f2f;
  }
`