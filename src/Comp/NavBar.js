import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="logo">Mini Orange Assignment</h1>
      <div className="nav-buttons">
        <button onClick={() => navigate('/')}>Dashboard</button>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </nav>
  );
};

export default NavBar;
