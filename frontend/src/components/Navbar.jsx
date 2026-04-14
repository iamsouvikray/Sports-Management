import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  // 🔄 Update navbar on login/logout
  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('storage', updateUser);
    window.addEventListener('focus', updateUser);

    return () => {
      window.removeEventListener('storage', updateUser);
      window.removeEventListener('focus', updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          Sports Manager
        </Link>

        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>

          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/register" className="nav-link" onClick={() => setIsOpen(false)}>
              Player Register
            </Link>
          </li>

          {/* 🔒 ADMIN ONLY */}
          {user && user.role === 'admin' && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link" onClick={() => setIsOpen(false)}>
                Admin Dashboard
              </Link>
            </li>
          )}

          {/* ❌ NOT LOGGED IN */}
          {!user && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/signup" className="nav-link" onClick={() => setIsOpen(false)}>
                  Signup
                </Link>
              </li>
            </>
          )}

          {/* ✅ LOGGED IN */}
          {user && (
            <>
              <li className="nav-item">
                <span className="nav-link">
                  Hi, {user.email} ({user.role})
                </span>
              </li>

              <li className="nav-item">
                <button className="nav-link logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;