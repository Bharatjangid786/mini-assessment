import React, { useState } from 'react';
// import { useEffect } from 'react';
import './Login.css';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; // ⬅️ Import NavBar

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('http://192.168.29.159:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.text();
      console.log('Login response:', result);
       
      if (response.status === 401) {
        // Unauthorized - invalid credentials
        const errorMessage = await response.text();
        console.error("Login failed:", errorMessage);
        alert("Invalid email or password.");
        return;
      }
      if (response.ok) {
        console.log('Form submitted:', { email, password });
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        alert('Login successful!');
        localStorage.setItem('token', result);
        // navigate('/dashboard');

        const profileResponse = await fetch(`http://192.168.29.159:8081/user/profile/${email}`);
        const data = await profileResponse.json();
        console.log('User Profile:', data.name);
        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user details');
        }
        // alert('Profile response:', profileResponse);
        navigate('/dashboard', {
          state: {
            id : data.id,
            name: data.name,
            email: email,
            password: password,
          },
        }
      );
        

        
      } else {
        alert(result || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      alert('Network error during login. Please try again.');
    }
  };
 
  const handleLogin = () => {
    const clientId = '823003483060-2it9dk9u5b4c9u8vbggjv32sdof8h893.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:8080/oauth2/callback'; // Backend endpoint to handle OAuth2
    const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`;
     
    console.log('Google Login URL:', authUrl);
    window.location.href = authUrl;


  };
  // const GoogleLoginCallback = () => {
  //   useEffect(() => {
  //     // Extract the authorization code from the URL
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const authorizationCode = urlParams.get('code');
      
  //     if (authorizationCode) {
  //       // Send the authorization code to your backend to exchange for an access token
  //       fetch('http://localhost:8080/oauth2/token', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           code: authorizationCode,
  //           redirect_uri: 'http://localhost:8080/oauth2/callback',
  //         }),
  //       })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('Token data:', data);
  //         // Handle the received token or user information
  //         // For example, store the token in localStorage or global state
  //       })
  //       .catch(error => {
  //         console.error('Error during token exchange:', error);
  //       });
  //     } else {
  //       console.error('No authorization code found in the URL');
  //     }
  //   }, []);
  // }
  return (
    <>
      <NavBar /> {/* ⬅️ Render NavBar here */}
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
              <FaGoogle onClick={handleLogin} className="icon google" />
              <FaFacebookF className="icon facebook" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
