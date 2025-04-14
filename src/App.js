import React from 'react';
// import NavBar from '../NavBar';
import NavBar from './Comp/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Comp/Dashboard';
import Login from './Comp/Login';
import Register from './Comp/Register';
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
