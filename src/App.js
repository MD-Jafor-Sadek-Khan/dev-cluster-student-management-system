import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SidePanel from './components/SidePanel';
import Content from './components/Content';
import AddStudent from './components/AddStudent';
import ManageStudents from './components/ManageStudents';
import Login from './components/Login';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <SidePanel />
        <MainContent>
          <Navbar />
          <ContentArea>
            <Routes>
              <Route path="/add-student" element={<AddStudent />} />
              <Route path="/manage-students" element={<ManageStudents />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </ContentArea>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ContentArea = styled.div`
  padding: 20px;
  flex-grow: 1;
`;
