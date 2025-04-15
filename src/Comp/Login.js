import React, { useState } from 'react';
import './Login.css';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch('http://192.168.29.159:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      const result = await response.text(); // if backend returns plain text
      if (response.ok) {
        console.log('✅ Login successful:', result);
        alert(result || 'Login successful!');
        // Redirect or store token here
      } else {
        console.warn('❌ Login failed:', result);
        alert(result || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('Network error during login. Please try again.');
    }
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
