import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id,name, email, password } = location.state || {};
 
  console.log('Name:', name); 
  console.log('Email:', email);
  console.log(password)
  const [user, setUser] = useState({
    id: id || '',
    name:  name ||  props.name ||'Bharat Jangid',
    email:  email || props.email  || 'bharat@example.com',
    phone: '123-456-7890',
    password: '********' ||  password ||props.password || '',
  });
  

  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleUpdate = async () => {
    if (editMode) {
      try {
        const userId = user.id || tempUser.id || 'yourUserId'; // Replace 'yourUserId' with a real fallback if needed
  
        const response = await fetch(`http://192.168.29.159:8081/user/update/${userId}`, {
          method: "PUT", // Or "POST" if your API uses that
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: tempUser.name,
            password: tempUser.password,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
  
        const updatedUser = { ...tempUser, id: userId };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update profile");
      }
    }
    setEditMode(!editMode);
  };
  
  // const handleUpdate = () => {
  //   if (editMode) {
  //     setUser(tempUser);
  //     localStorage.setItem('user', JSON.stringify(tempUser));
  //   }
  //   setEditMode(!editMode);
  // };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  
    // Reset user state to default
    // useState({  
    //   props.name ='';
    //   props.email ='';
    //   props.password ='';
    // });
    setUser({
      name: '',
      email: '',
      phone: '123-456-7890',
      password: '********',
    });
  
    alert('Logged out successfully!');
    navigate('/login');
  };
  
  return (
    <div className="dashboard-container">
      <div className="navbar">
        <div className="logo">Mini Orange Assignment</div>
        <div className="nav-buttons">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <h2>User Profile</h2>
      <div className="dashboard-card">
        <label>Name:</label>
        {editMode ? (
          <input type="text" name="name" value={tempUser.name} onChange={handleChange} />
        ) : (
          <p>{user.name}</p>
        )}

        <label>Email:</label>
        {editMode ? (
          <input type="email" name="email" value={tempUser.email} onChange={handleChange} />
        ) : (
          <p>{user.email}</p>
        )}

        <label>Phone:</label>
        <p>{user.phone}</p> {/* Phone remains constant */}

        <label>Password:</label>
        {editMode ? (
          <input type="password" name="password" value={tempUser.password} onChange={handleChange} />
        ) : (
          <p>{user.password}</p>
        )}

        <button onClick={handleUpdate}>{editMode ? 'Save' : 'Update'}</button>
      </div>
    </div>
  );
};

export default Dashboard;
