import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Sports Manager</h1>
        <p className="subtitle">Manage your sports players and teams efficiently</p>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Easy Registration</h3>
            <p>Players can register with their basic details and profile photo in seconds</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Player Management</h3>
            <p>View, search, and manage all registered players from one dashboard</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Export to Excel</h3>
            <p>Export player data to Excel for reports and analysis</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Multi-Sport</h3>
            <p>Support for multiple sports and player positions</p>
          </div>
        </div>

        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">
            Register as Player
          </Link>
          <Link to="/admin" className="btn btn-secondary">
            Admin Dashboard
          </Link>
        </div>

        <div className="info-section">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Register</h4>
              <p>Players fill in their details and upload a photo</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Data Saved</h4>
              <p>Information is securely saved in the database</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>View & Manage</h4>
              <p>Admin can view and export all player data</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
