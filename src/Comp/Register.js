import React, { useState } from 'react';
import './Register.css';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
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
    // const randomId = Math.floor(Math.random() * 10000) + 1;
    const payload = {
      // id: randomId,
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true);
      const response = await fetch('http://192.168.29.159:8080/auth/signup-to-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.text();
      setLoading(false);

      if (response.ok) {
        alert(result || 'OTP Sent');
        setStep(2);
       
      } else {
        alert(result || 'Registration failed');
      }
    } catch (error) {
      setLoading(false);
      alert('Network error. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      otp: parseInt(formData.otp),
      user: {
        // id: '2',
        name: formData.name,
        email: formData.email,
        password: formData.password,
      },
    };

    try {
      setLoading(true);
      const response = await fetch('http://192.168.29.159:8080/auth/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.text();
      setLoading(false);

      if (response.ok) {
        alert(result || 'OTP verification successful!');
        navigate('/login'); // Redirect to login after successful registration
      } else {
        alert(result || 'OTP verification failed');
      }
    } catch (error) {
      setLoading(false);
      alert('Network error during OTP verification. Please try again.');
    }
  };

  return (
    <>
      <NavBar /> {/* 🔥 Add the NavBar here */}
      <div className="register-container">
        <form
          className="register-form"
          onSubmit={step === 1 ? handleRegisterSubmit : handleOtpSubmit}
        >
          <h2>{step === 1 ? 'Register' : 'Enter OTP'}</h2>

          {step === 1 ? (
            <>
              {/* <input type="text" name="id" placeholder="User ID" value={formData.id} onChange={handleChange} required /> */}
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

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
              <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} required />
              <button type="submit" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Register;
