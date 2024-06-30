import styled from "styled-components"
import Modal from "react-modal"
import { AiOutlineSearch } from "react-icons/ai"

export const Container = styled.div`
  background-color: #fffcfb;
  border-radius: 8px;
  margin-top: 1.4rem;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1.93rem;
  align-items: center;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
`

export const Title = styled.h1`
  color: #000;
  font-size: 16px;
  margin: 0;
`

export const SearchWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 1rem;
  @media (max-width: 480px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`

export const SearchInput = styled.input`
  padding: 8px 10px 8px 40px;
  border-radius: 10px;
  width: 266px;
  height: 52px;
  background: #eff3f6;
  border: none;
  outline: none;
  ::placeholder {
    font-size: 13px;
    color: #b5b8bf;
  }
  @media (max-width: 768px) {
    width: 200px;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`

export const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  top: 50%;
  left: 17px;
  transform: translateY(-50%);
  color: #637381;
  font-size: 0.8rem;
`

export const ActionButton = styled.button`
  padding: 16px 35.5px;
  background-color: #f8f9fb;
  color: #4e5159;
  border: 0.5px solid #647887;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 1rem;

  &:hover {
    box-shadow: 0px 4px 4px 0px #00000040;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    margin-right: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`
export const ActionButtonFilter = styled.button`
  padding: 16px 35.5px;
  background-color: #f8f9fb;
  color: #4e5159;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 1rem;
  border: ${(props) => (props.isFilterApplied ? "2px solid blue" : "0.5px solid #647887")};

  &:hover {
    box-shadow: 0px 4px 4px 0px #00000040;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    margin-right: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  th,
  td {
    padding: 1rem 2.5rem;
    text-align: center;
  }

  td {
    padding: 0 2.5rem;
    border: none;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  th:last-child,
  td:last-child {
    text-align: right;
  }

  th {
    background-color: #f33823;
    color: #fff;
    font-weight: normal;
  }

  tbody tr:nth-child(odd) {
    background-color: #fff;
  }

  tbody tr:nth-child(even) {
    background-color: #fff6f5;
  }

  td {
    border-bottom: none;
  }

  td:last-child {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 0.5rem 1rem;
    }
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 0.25rem 0.5rem;
    }
    th,
    td {
      display: block;
      text-align: right;
    }
    th {
      text-align: left;
    }
    td:last-child {
      justify-content: center;
    }
  }
`

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 13px;
  box-sizing: content-box;
  background-color: transparent;
  transition: background-color 0.3s;
  border-radius: 55px;

  svg {
    color: #f33823;
    cursor: pointer;
    transition: color 0.3s;
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: #f33823;
    svg {
      color: #fff;
      cursor: pointer;
      transition: color 0.3s;
    }
  }
`

export const Timestamp = styled.div`
  color: #000;
  font-size: 14px;
  @media (max-width: 480px) {
    margin-top: 0.5rem;
    width: 100%;
    text-align: left;
  }
`

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export const PageNumber = styled.span`
  margin: 0 5px;
  padding: 9px 18px;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0px 0px 3px 0px #00000033;
  background-color: ${(props) => (props.active ? "#f33823" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};

  &:hover {
    background-color: #f33823;
    color: #fff;
  }

  ${(props) =>
    props.disabled &&
    `
  pointer-events: none;
  opacity: 0.5;
`}
`
Modal.setAppElement("#root")
