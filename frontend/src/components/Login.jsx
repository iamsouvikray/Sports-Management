import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // ✅ Save user with role
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // 🔥 Update navbar instantly
      window.dispatchEvent(new Event('storage'));

      alert('Login successful ✅');
      navigate('/');

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed ❌');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
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

        <div className="login-footer">
          Don’t have an account?{' '}
          <span onClick={() => navigate('/signup')}>Signup</span>
        </div>
      </div>
    </div>
  );
};

export default Login;