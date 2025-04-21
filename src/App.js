import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Comp/Dashboard';
import Login from './Comp/Login';
import Register from './Comp/Register';

function App() {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true); // 🚀 Add loading state
  const [ id , setId] = useState(''); // 🚀 Add id state

  const verifyUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, user is not authenticated');
      setLoading(false); // Done loading even if token not found
      return;
    }

    try {
      const verifyResponse = await fetch('http://192.168.29.159:8080/auth/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        const profileResponse = await fetch(`http://192.168.29.159:8081/user/profile/${verifyData.email}`);

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await profileResponse.json();
        setEmail(data.email);
        setPassword(data.password);
        setName(data.name);
        setUserData(data);
        setId(data.id); // Set the id from the profile response
      } else {
        console.log('❌ Token is not valid');
      }
    } catch (error) {
      console.error('❌ Auth error:', error);
    } finally {
      setLoading(false); // ✅ Always end loading after trying
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>🔄 Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={userData ? <Dashboard name={name} email={email} password={password}  id = {id} /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<Dashboard name={name} email={email} password={password} id = {id} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
