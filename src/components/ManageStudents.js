// src/components/ManageStudents.js
import React from 'react';
import styled from 'styled-components';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const ManageStudents = () => {
  return (
    <Container>
      <Header>
        <Title>Manage Students</Title>
        <Actions>
          <SearchInput type="text" placeholder="Search" />
          <ActionButton>Export</ActionButton>
          <ActionButton>Filter</ActionButton>
          <ActionButton>Print</ActionButton>
        </Actions>
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
          <tr>
            <td>Bruce Banner</td>
            <td>VI-A</td>
            <td>12</td>
            <td>
              <IconWrapper><FaEye /></IconWrapper>
              <IconWrapper><FaEdit /></IconWrapper>
              <IconWrapper><FaTrash /></IconWrapper>
            </td>
          </tr>
          <tr>
            <td>Doctor Strange</td>
            <td>VII-A</td>
            <td>13</td>
            <td>
              <IconWrapper><FaEye /></IconWrapper>
              <IconWrapper><FaEdit /></IconWrapper>
              <IconWrapper><FaTrash /></IconWrapper>
            </td>
          </tr>
          <tr>
            <td>Scarlet Witch</td>
            <td>VII-B</td>
            <td>14</td>
            <td>
              <IconWrapper><FaEye /></IconWrapper>
              <IconWrapper><FaEdit /></IconWrapper>
              <IconWrapper><FaTrash /></IconWrapper>
            </td>
          </tr>
          <tr>
            <td>Captain America</td>
            <td>VIII-A</td>
            <td>15</td>
            <td>
              <IconWrapper><FaEye /></IconWrapper>
              <IconWrapper><FaEdit /></IconWrapper>
              <IconWrapper><FaTrash /></IconWrapper>
            </td>
          </tr>
          <tr>
            <td>Black Widow</td>
            <td>VI-A</td>
            <td>16</td>
            <td>
              <IconWrapper><FaEye /></IconWrapper>
              <IconWrapper><FaEdit /></IconWrapper>
              <IconWrapper><FaTrash /></IconWrapper>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </Table>
      <Footer>
        <Timestamp>25 June 2024 16:10</Timestamp>
      </Footer>
    </Container>
  );
};

export default ManageStudents;

const Container = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
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

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 15px;
    text-align: left;
  }

  th {
    background-color: #ff3b3f;
    color: #fff;
    font-weight: normal;
  }

  tbody tr:nth-child(odd) {
    background-color: #fefefe;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  td {
    border-bottom: 1px solid #ddd;
  }

  td:last-child {
    display: flex;
    gap: 10px;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: transparent;
  transition: background-color 0.3s;

  svg {
    color: #ff3b3f;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #fff;
    }
  }

  &:hover {
    background-color: #ff3b3f;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`;

const Timestamp = styled.div`
  color: #999;
  font-size: 14px;
`;
