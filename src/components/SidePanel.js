import React, { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { LuUsers, LuLayoutList, LuLogOut } from "react-icons/lu"

const SidePanel = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(location.pathname)

  useEffect(() => {
    setSelected(location.pathname)
  }, [location.pathname])

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <Sidebar>
      <CompanyName>Dev Cluster</CompanyName>
      <Menu>
        <MenuItem
          primary={selected === "/add-student"}
          onClick={() => {
            setSelected("/add-student")
            navigate("/add-student")
          }}
        >
          <LuUsers />
          <StyledLink primary={selected === "/add-student"} to="/add-student">
            Add Student
          </StyledLink>
        </MenuItem>
        <MenuItem
          primary={selected === "/manage-students"}
          onClick={() => {
            setSelected("/manage-students")
            navigate("/manage-students")
          }}
        >
          <LuLayoutList />
          <StyledLink
            primary={selected === "/manage-students"}
            to="/manage-students"
          >
            Manage Students
          </StyledLink>
        </MenuItem>
        <MenuItem primary={selected === "/logout"} onClick={handleLogout}>
          <LuLogOut />
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
  background-color: #fffcfb;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CompanyName = styled.div`
  margin-left: 4rem;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #f33823;
  margin-top: 1.7rem;
`

const Menu = styled.div`
  margin-top: 7.6rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`

const MenuItem = styled.div`
  margin-bottom: 20px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.primary ? "#f33823" : "#fffcfb")};
  border-radius: 5px;
  cursor: pointer;
  svg {
    margin-right: 10px;
    height: 24px;
    width: 24px;
    color: ${(props) => (props.primary ? "#fff" : "rgba(0,0,0,0.6)")};
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.primary ? "#fff" : "rgba(0,0,0,0.6)")};
  font-size: 16px;
`
