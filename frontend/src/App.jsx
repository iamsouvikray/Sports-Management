import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

<<<<<<< HEAD
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import PlayerRegistration from './components/PlayerRegistration.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import PaymentPage from './components/Payment.jsx';

import './App.css';

//  Protect admin route (UNCHANGED)
=======
import Navbar from './components/Navbar';
import Home from './components/Home';
import PlayerRegistration from './components/PlayerRegistration';
import AdminDashboard from './components/AdminDashboard';
import ThemeSwitcher from './components/ThemeSwitcher';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

// 🔒 Protect admin route
>>>>>>> d267c95cc6815e8ce460dd1f3a81ee7a541c8a72
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
<<<<<<< HEAD
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Player Registration (IMPORTANT FIX) */}
=======
        {/* Public */}
        <Route path="/" element={<Home />} />
>>>>>>> d267c95cc6815e8ce460dd1f3a81ee7a541c8a72
        <Route path="/register" element={<PlayerRegistration />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />

<<<<<<< HEAD
        {/* Fake Payment Page */}
        <Route path="/payment" element={<PaymentPage />} />

        {/* Admin Protected */}
=======
        {/* 🔒 Admin Protected */}
>>>>>>> d267c95cc6815e8ce460dd1f3a81ee7a541c8a72
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

<<<<<<< HEAD
        {/*  Fallback */}
=======
        {/* Fallback */}
>>>>>>> d267c95cc6815e8ce460dd1f3a81ee7a541c8a72
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <ThemeSwitcher />
    </Router>
  );
};

export default App;