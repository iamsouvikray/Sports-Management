import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import PlayerRegistration from './components/PlayerRegistration';
import AdminDashboard from './components/AdminDashboard';
import ThemeSwitcher from './components/ThemeSwitcher';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

// 🔒 Protect admin route
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<PlayerRegistration />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* 🔒 Admin Protected */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ThemeSwitcher />
    </Router>
  );
};

export default App;