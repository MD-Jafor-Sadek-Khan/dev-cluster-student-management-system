import React from "react"
import styled from "styled-components"
import { FaUser } from "react-icons/fa"
import { useSelector } from "react-redux"
import { FiUser } from "react-icons/fi"
import { BiUser } from "react-icons/bi"
import { CgUser } from "react-icons/cg"
import { LiaUser } from "react-icons/lia"
import { IoPersonOutline } from "react-icons/io5"

import { LuUser } from "react-icons/lu"

const Navbar = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <Nav>
      <UserInfo>
        <UserIcon />
        <Username>{user ? user.email : "Guest"}</Username>
      </UserInfo>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  margin-top: 1.5rem;
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fffcfb;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 15px 48px;
  background: #fffcfb;
  margin-right: 8rem;
  box-shadow: 0px 0px 3px 0px #00000033;

  border-radius: 5px;
`

const UserIcon = styled(LuUser)`
  font-size: 16px;
  margin-right: 10px;
  width: 24px;
  height: 24px;
`

const Username = styled.div`
  font-size: 14px;
  color: #000;
`
