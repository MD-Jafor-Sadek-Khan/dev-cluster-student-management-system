// src/components/Navbar.js
import React from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Nav>
      <UserInfo>
        <UserIcon />
        <Username>{user ? user.email : "Guest"}</Username>
      </UserInfo>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  padding: 15px 40px;
  margin-top: 15px;
  margin-right: 8rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const UserIcon = styled(FaUser)`
  font-size: 16px;
  margin-right: 10px;
  color: #000;
`;

const Username = styled.div`
  font-size: 14px;
  color: #000;
`;