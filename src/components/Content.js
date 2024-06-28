import React from "react"
import styled from "styled-components"

const Content = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>
}

export default Content

const ContentWrapper = styled.div`
  flex-grow: 1;
  background-color: #fffcfb;
  padding: 20px;
  overflow-y: auto;
`
