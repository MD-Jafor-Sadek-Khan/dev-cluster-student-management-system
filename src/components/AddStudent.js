import React, { useState } from "react"
import styled from "styled-components"
import { db } from "../firebase" 
import { collection, addDoc } from "firebase/firestore"

const AddStudent = () => {
  const [student, setStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    class: "",
    division: "",
    rollNumber: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    pincode: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setStudent({ ...student, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "students"), student)
      console.log("Document written with ID: ", docRef.id)
      setStudent({
        firstName: "",
        middleName: "",
        lastName: "",
        class: "",
        division: "",
        rollNumber: "",
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        city: "",
        pincode: "",
      })
    } catch (e) {
      console.error("Error adding document: ", e)
    }
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
        <Title>Add Student</Title>
        <DateTime>{currentDateTime}</DateTime>
      </Header>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={student.firstName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={student.middleName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={student.lastName}
            onChange={handleChange}
            required
          />
        </FormRow>
        <FormRow>
          <Select
            name="class"
            value={student.class}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
          </Select>
          <Select
            name="division"
            value={student.division}
            onChange={handleChange}
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
            value={student.rollNumber}
            onChange={handleChange}
            required
          />
        </FormRow>
        <FormRow>
          <Input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            value={student.addressLine1}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            value={student.addressLine2}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow>
          <Input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={student.landmark}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={student.city}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={student.pincode}
            onChange={handleChange}
            required
          />
        </FormRow>
        <Button type="submit">Add Student</Button>
      </Form>
    </Container>
  )
}

export default AddStudent

const Container = styled.div`
  background-color: #fffcfb;
  border-radius: 8px;
  margin-top: 1.7rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`

const Title = styled.h1`
  color: #000;
  font-size: 16px;
  margin: 0;
`

const DateTime = styled.div`
  color: #000;
  font-size: 14px;
`

const Form = styled.form`
  background-color: #fff;
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

const Button = styled.button`
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
`
