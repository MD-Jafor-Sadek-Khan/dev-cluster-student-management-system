// src/components/SidePanel.js
import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FaUserPlus, FaUsers, FaSignOutAlt } from "react-icons/fa"

const SidePanel = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(location.pathname)

  const handleLogout = () => {
    setSelected("/logout")
    navigate("/login")
  }

  return (
    <Sidebar>
      <CompanyName>Dev Cluster</CompanyName>
      <Menu>
        <MenuItem
          primary={selected === "/add-student"}
          onClick={() => setSelected("/add-student")}
        >
          <FaUserPlus />
          <StyledLink primary={selected === "/add-student"} to="/add-student">
            Add Student
          </StyledLink>
        </MenuItem>
        <MenuItem
          primary={selected === "/manage-students"}
          onClick={() => setSelected("/manage-students")}
        >
          <FaUsers />
          <StyledLink
            primary={selected === "/manage-students"}
            to="/manage-students"
          >
            Manage Students
          </StyledLink>
        </MenuItem>
        <MenuItem primary={selected === "/logout"} onClick={handleLogout}>
          <FaSignOutAlt />
          <StyledLink primary={selected === "/logout"} to="#">
            Logout
          </StyledLink>
        </MenuItem>
      </Menu>
    </Sidebar>
  )
}

export default SidePanel

const Sidebar = styled.div`
  width: 280px;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CompanyName = styled.div`
  margin-left: 4rem;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #e53935;
`

const Menu = styled.div`
  margin-top: 50%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const MenuItem = styled.div`
  margin-bottom: 20px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.primary ? "#e53935" : "transparent")};
  border-radius: 5px;
  cursor: pointer;
  svg {
    margin-right: 10px;
    color: ${(props) => (props.primary ? "#fff" : "#000")};
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.primary ? "#fff" : "#000")};
  font-size: 16px;
  font-weight: bold;
`