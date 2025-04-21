import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './NavBar.css';
import './NavBarLogin.css';
// import Login from './Comp/Login';
// import Register from './Comp/Register';
const NavBarLogin = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="logo">Mini Orange Assignment</h1>
      <div className="nav-buttons">
        {
           <>
           <button onClick={() => navigate('/login')}>Login</button>
           <button onClick={() => navigate('/register')}>Register</button>
         </>
        }
      </div>
    </nav>
  );
};

export default NavBarLogin;
