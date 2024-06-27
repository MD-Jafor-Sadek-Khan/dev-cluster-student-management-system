import React from 'react';
import styled from 'styled-components';

const AddStudent = () => {
  return (
    <Container>
      <Header>
        <Title>Add Student</Title>
        <DateTime>25 Jul 2022 16:10</DateTime>
      </Header>
      <Form>
        <FormRow>
          <Input type="text" placeholder="First Name" />
          <Input type="text" placeholder="Middle Name" />
          <Input type="text" placeholder="Last Name" />
        </FormRow>
        <FormRow>
          <Select>
            <option>Select Class</option>
          </Select>
          <Select>
            <option>Select Division</option>
          </Select>
          <Input type="text" placeholder="Enter Roll Number in Digits" />
        </FormRow>
        <FormRow>
          <Input type="text" placeholder="Address Line 1" />
          <Input type="text" placeholder="Address Line 2" />
        </FormRow>
        <FormRow>
          <Input type="text" placeholder="Landmark" />
          <Input type="text" placeholder="City" />
          <Input type="text" placeholder="Pincode" />
        </FormRow>
        <Button>Add Student</Button>
      </Form>
    </Container>
  );
};

export default AddStudent;

const Container = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #000;
  font-size: 24px;
  margin: 0;
`;

const DateTime = styled.div`
  color: #666;
  font-size: 14px;
`;

const Form = styled.form`
  background-color: #fff;
`;

const FormRow = styled.div`
  display: flex;
  margin-bottom: 15px;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Select = styled.select`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 15px 20px;
  background-color: #ff3b3f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;
