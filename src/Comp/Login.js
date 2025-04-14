import React, { useState } from 'react';
import './Login.css';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Add authentication logic here
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Submit</button>

        <div className="social-login">
          <p>Or login with</p>
          <div className="icons">
            <FaGoogle className="icon google" />
            <FaFacebookF className="icon facebook" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
