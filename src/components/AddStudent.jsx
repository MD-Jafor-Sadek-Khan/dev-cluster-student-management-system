import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { db, auth } from "../firebase" 
import { collection, addDoc } from "firebase/firestore"
import toast from "react-hot-toast"

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
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        setUserId(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setStudent({ ...student, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!userId) {
      toast.error("User not logged in")
      return
    }

    // Validation logic
    const { firstName, lastName, class: studentClass, division, rollNumber, addressLine1, city, pincode } = student

    if (!firstName || !lastName || !studentClass || !division || !rollNumber || !addressLine1 || !city || !pincode) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!/^[A-Za-z]+$/.test(firstName)) {
      toast.error("First Name should contain only letters")
      return
    }

    if (student.middleName && !/^[A-Za-z]+$/.test(student.middleName)) {
      toast.error("Middle Name should contain only letters")
      return
    }

    if (!/^[A-Za-z]+$/.test(lastName)) {
      toast.error("Last Name should contain only letters")
      return
    }

    if (!isValidRomanNumeral(studentClass)) {
      toast.error("Class should be a valid Roman numeral between I and XII")
      return
    }

    if (!/^[A-E]$/.test(division)) {
      toast.error("Division should be between A and E")
      return
    }

    if (!/^\d{2}$/.test(rollNumber)) {
      toast.error("Roll Number should be a 2-digit number")
      return
    }

    if (!/^\d{4,6}$/.test(pincode)) {
      toast.error("Pincode should be between 4 to 6 digits")
      return
    }

    try {
      const studentWithUser = { ...student, userId }
      const docRef = await addDoc(collection(db, "students"), studentWithUser)
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
      toast.success("Student Added Successfully")
    } catch (e) {
      toast.error("Error adding document: ", e)
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
        <FormDivider>
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
            <SelectWrapper>
              <Select
                name="class"
                value={student.class}
                onChange={handleChange}
                required
              >
                <option value="" disabled></option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
                <option value="X">X</option>
                <option value="XI">XI</option>
                <option value="XII">XII</option>
              </Select>
              <SelectPlaceholder isSelected={student.class !== ""}>
                Select Class
              </SelectPlaceholder>
              <ArrowIcon />
            </SelectWrapper>
            <SelectWrapper>
              <Select
                name="division"
                value={student.division}
                onChange={handleChange}
                required
              >
                <option value="" disabled></option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </Select>
              <SelectPlaceholder isSelected={student.division !== ""}>
                Select Division
              </SelectPlaceholder>
              <ArrowIcon />
            </SelectWrapper>
            <Input
              type="text"
              name="rollNumber"
              placeholder="Enter Roll Number in Digits"
              value={student.rollNumber}
              onChange={handleChange}
              required
            />
          </FormRow>
        </FormDivider>
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

const isValidRomanNumeral = (str) => {
  const romanNumeralRegex = /^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)$/
  return romanNumeralRegex.test(str)
}

const Container = styled.div`
  background-color: #fffcfb;
  border-radius: 8px;
  margin-top: 2rem;

  @media (max-width: 480px) {
    margin-top: 1rem;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`

const Title = styled.h1`
  color: #000;
  font-size: 16px;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`

const DateTime = styled.div`
  color: #000;
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`

const Form = styled.form`
  background-color: #fff;
`

const FormDivider = styled.div`
  margin-bottom: 3rem;
  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
`

const FormRow = styled.div`
  display: flex;
  margin-bottom: 15px;
  gap: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media (max-width: 480px) {
    gap: 5px;
  }
`

const Input = styled.input`
  flex: 1;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &::placeholder {
    padding: 0.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 12px;
  }
`

const SelectWrapper = styled.div`
  position: relative;
  flex: 1;
`

const Select = styled.select`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #000;
  appearance: none;
  background: transparent;
  width: 100%;
  box-sizing: border-box;
  height: 3.4rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
    height: auto;
  }
  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 12px;
  }
`

const SelectPlaceholder = styled.div`
  position: absolute;
  top: 10%;
  left: 14px;
  padding: 10px;
  color: #999;
  pointer-events: none;

  font-size: 14px;
  transition: opacity 0.3s;
  opacity: ${({ isSelected }) => (isSelected ? 0 : 1)};

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 12px;
  }
`

const ArrowIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  pointer-events: none;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #000;
  transform: translateY(-50%);
`

const Button = styled.button`
  padding: 15px 8rem;
  background-color: #f33823;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 14px;
  }
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`
