import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../styles/PlayerRegistration.css';

const PlayerRegistration = () => {
  const [formData, setFormData] = useState({
    playerName: '',
    email: '',
    phone: '',
    age: '',
    sport: '',
    jersey_number: '',
    position: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const imageInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const imageFile = imageInputRef.current?.files?.[0];
    
    // Validation
    if (!formData.playerName || !formData.email || !formData.phone || !formData.age || !formData.sport || !imageFile) {
      setMessage('Please fill all required fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('playerName', formData.playerName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('age', formData.age);
      data.append('sport', formData.sport);
      data.append('jersey_number', formData.jersey_number);
      data.append('position', formData.position);
      data.append('image', imageFile);

      const response = await axios.post('http://localhost:5000/api/players/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Player registered successfully! ✓');
      
      // Reset form
      setFormData({
        playerName: '',
        email: '',
        phone: '',
        age: '',
        sport: '',
        jersey_number: '',
        position: '',
      });
      setImagePreview(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1>Player Registration</h1>
        <p className="subtitle">Register as a new player</p>

        <form onSubmit={handleSubmit} className="registration-form">
          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="form-group">
            <label>Player Name *</label>
            <input
              type="text"
              name="playerName"
              value={formData.playerName}
              onChange={handleInputChange}
              placeholder="Enter full name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter age"
                min="15"
                max="80"
              />
            </div>

            <div className="form-group">
              <label>Sport *</label>
              <select name="sport" value={formData.sport} onChange={handleInputChange}>
                <option value="">Select Sport</option>
                <option value="Football">Football</option>
                <option value="Basketball">Basketball</option>
                <option value="Cricket">Cricket</option>
                <option value="Tennis">Tennis</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Baseball">Baseball</option>
                <option value="Badminton">Badminton</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Jersey Number</label>
              <input
                type="number"
                name="jersey_number"
                value={formData.jersey_number}
                onChange={handleInputChange}
                placeholder="Enter jersey number"
              />
            </div>

            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Enter position (e.g., Forward, Goalkeeper)"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Profile Photo *</label>
            <div className="image-upload">
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="image-input"
              />
              <label htmlFor="image-input" className="upload-label">
                {imagePreview ? 'Change Photo' : 'Choose Photo'}
              </label>
            </div>
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register Player'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerRegistration;
