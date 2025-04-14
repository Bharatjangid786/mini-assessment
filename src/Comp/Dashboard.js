import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({
    name: 'Bharat Jangid',
    email: 'bharat@example.com',
    phone: '123-456-7890',
  });

  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  const handleUpdate = () => {
    if (editMode) {
      setUser(tempUser);
    }
    setEditMode(!editMode);
  };

  return (
    <div className="dashboard-container">
      <h2>User Dashboard</h2>
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
        {editMode ? (
          <input type="text" name="phone" value={tempUser.phone} onChange={handleChange} />
        ) : (
          <p>{user.phone}</p>
        )}

        <button onClick={handleUpdate}>{editMode ? 'Save' : 'Update'}</button>
      </div>
    </div>
  );
};

export default Dashboard;
