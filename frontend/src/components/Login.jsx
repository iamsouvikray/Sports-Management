import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
<<<<<<< HEAD
  const [step, setStep] = useState(1); // 👈 added
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(''); // 👈 added
  const navigate = useNavigate();

  // STEP 1 → LOGIN
=======
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

>>>>>>> d267c95cc6815e8ce460dd1f3a81ee7a541c8a72
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
<<<<<<< HEAD
      await axios.post('http://localhost:5000/api/auth/login', {
=======
      const res = await axios.post('http://localhost:5000/api/auth/login', {
>>>>>>> d267c95cc6815e8ce460dd1f3a81ee7a541c8a72
        email,
        password
      });

<<<<<<< HEAD
      alert('OTP sent (use 123456)');
      setStep(2); // 👈 move to OTP step

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed ❌');
    }
  };

  // STEP 2 → VERIFY OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp
      });

      // ✅ SAME AS YOUR OLD LOGIN
      localStorage.setItem('user', JSON.stringify(res.data.user));
=======
      // ✅ Save user with role
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // 🔥 Update navbar instantly
>>>>>>> d267c95cc6815e8ce460dd1f3a81ee7a541c8a72
      window.dispatchEvent(new Event('storage'));

      alert('Login successful ✅');
      navigate('/');

    } catch (err) {
<<<<<<< HEAD
      alert(err.response?.data?.message || 'Invalid OTP ❌');
=======
      alert(err.response?.data?.message || 'Login failed ❌');
>>>>>>> d267c95cc6815e8ce460dd1f3a81ee7a541c8a72
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
<<<<<<< HEAD

        <h2>{step === 1 ? "Login" : "Enter OTP"}</h2>

        {step === 1 ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button type="submit">Verify OTP</button>
          </form>
        )}
=======
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
>>>>>>> d267c95cc6815e8ce460dd1f3a81ee7a541c8a72

        <div className="login-footer">
          Don’t have an account?{' '}
          <span onClick={() => navigate('/signup')}>Signup</span>
        </div>
<<<<<<< HEAD

=======
>>>>>>> d267c95cc6815e8ce460dd1f3a81ee7a541c8a72
      </div>
    </div>
  );
};

export default Login;