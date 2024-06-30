import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SidePanel from './components/SidePanel';
import AddStudent from './components/AddStudent';
import ManageStudents from './components/ManageStudents/ManageStudents';
import Login from './components/Login/Login';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <SidePanel />
        <div className="flex flex-col flex-grow">
          <Navbar />
          <div className="p-5 flex-grow">
            <Routes>
              <Route path="/add-student" element={<AddStudent />} />
              <Route path="/manage-students" element={<ManageStudents />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
