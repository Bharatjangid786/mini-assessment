import React, { useState } from 'react';
import './Register.css';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  

    const payload = {
      id: 2,
      name: formData.name,
    //   name: 'Bharat Jangid',
      email: formData.email,
    // email: 'jangidbharat2004@gmail.com',
      password: formData.password,
    // password: "12345678",
    };

    try {
        console.log('BHje Rha hun bhai');
      setLoading(true);

      
      const response = await fetch('http://192.168.29.159:8080/auth/signup-to-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.text();
 
      setLoading(false);

      if (response.ok) {
        console.log('✅ API Response:', result);
        alert(result.message || 'Registration successful!');

        // Move to OTP input step
        setStep(2);
      } else {
        console.log('bhje dya bhai response');
        alert(result.message || 'Registration failed');
        console.warn('❌ Error:', result);
      }
    } catch (error) {
      setLoading(false);
      
      console.error('❌ Network Error:', error);
      alert('Network error. Please try again.');
    }
  };
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
        otp: parseInt(formData.otp),
        user: {
          id: '2',
          name: formData.name,
          email: formData.email,
          // email: 'jangidbharat2004@gmail.com',
            password: formData.password,
        }
      };
    try {
      setLoading(true);
  
      const response = await fetch('http://192.168.29.159:8080/auth/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),  // Send JSON with direct OTP value
      });
  
      const result = await response.text(); // assuming your backend returns plain text
      setLoading(false);
  
      if (response.ok) {
        console.log('✅ OTP Verified:', result);
        alert(result || 'OTP verification successful!');
        // Redirect or clear form here if needed
      } else {
        console.warn('❌ OTP Verification Failed:', result);
        alert(result || 'OTP verification failed');
      }
    } catch (error) {
      setLoading(false);
      console.error('❌ Network Error:', error);
      alert('Network error during OTP verification. Please try again.');
    }
  };
  
  
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={step === 1 ? handleRegisterSubmit : handleOtpSubmit}>
        <h2>{step === 1 ? 'Register' : 'Enter OTP'}</h2>

        {step === 1 ? (
          <>
            <input
              type="text"
              name="id"
              placeholder="User ID"
              value={formData.id}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>

            <div className="social-login">
              <p>Or sign up with</p>
              <div className="icons">
                <FaGoogle className="icon google" />
                <FaFacebookF className="icon facebook" />
              </div>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
            <button type="submit">Verify OTP</button>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
