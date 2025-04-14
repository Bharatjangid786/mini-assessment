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
  

    // const payload = {
    //     registration: {
    //       applicationId: "10000000-0000-0002-0000-000000000001",
    //       data: {
    //         displayName: "Johnny",
    //         favoriteSports: ["Football", "Basketball"]
    //       },
    //       id: "00000000-0000-0002-0000-000000000000",
    //       preferredLanguages: ["en", "fr"],
    //       roles: ["user", "community_helper"],
    //       timezone: "America/Chicago",
    //       username: "johnny123"
    //     }
    //   };
    const payload = {
      id: 2,
    //   name: formData.name,
      name: 'Bharat Jangid',
    //   email: formData.email,
    email: 'jangidbharat2222@gmail.com',
    //   password: formData.password,
    password: "12345678",
    };

    try {
        console.log('BHje Rha hun bhai');
      setLoading(true);
    //   const response = await fetch(`http://your-api-url.com/api/user/registration/${2}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });
    //   const response = await fetch('http://192.168.29.159/auth/signup-to-otp', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });
      
      const response = await fetch('http:// 192.168.29.159/auth/signup-to-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    //   console.log('bhje dya bhai response');
      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log('✅ API Response:', result);
        alert(result.message || 'Registration successful!');

        // Move to OTP input step
        setStep(2);
      } else {
        alert(result.message || 'Registration failed');
        console.warn('❌ Error:', result);
      }
    } catch (error) {
      setLoading(false);
      console.log('bhje dya bhai response');
      console.error('❌ Network Error:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    alert(`OTP Submitted: ${formData.otp}`);
    // You can handle OTP verification here
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
