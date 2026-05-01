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
    paymentMethod: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // 🔥 NEW STATES
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentDone, setPaymentDone] = useState(false);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔥 FAKE PAYMENT FUNCTION
  const handlePayment = () => {
    if (!formData.paymentMethod) {
      setPaymentStatus('Select payment method first ❌');
      return;
    }

    setPaymentStatus('Processing payment...');

    setTimeout(() => {
      setPaymentStatus('Payment successful ✅');
      setPaymentDone(true);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageFile = imageInputRef.current?.files?.[0];

    // 🔥 VALIDATION
    if (
      !formData.playerName ||
      !formData.email ||
      !formData.phone ||
      !formData.age ||
      !formData.sport ||
      !imageFile ||
      !formData.paymentMethod
    ) {
      setMessage('Please fill all fields');
      return;
    }

    // 🔥 IMPORTANT PAYMENT CHECK
    if (!paymentDone) {
      setMessage('Please complete payment first ❌');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      data.append('image', imageFile);

      await axios.post('http://localhost:5000/api/players/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Player registered successfully! ✓');

      // RESET
      setFormData({
        playerName: '',
        email: '',
        phone: '',
        age: '',
        sport: '',
        jersey_number: '',
        position: '',
        paymentMethod: ''
      });

      setImagePreview(null);
      setPaymentDone(false);
      setPaymentStatus('');

      if (imageInputRef.current) imageInputRef.current.value = '';

      setTimeout(() => setMessage(''), 3000);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1>Player Registration</h1>

        <form onSubmit={handleSubmit} className="registration-form">

          {message && <div className="message error">{message}</div>}

          {/* NAME */}
          <div className="form-group">
            <label>Player Name *</label>
            <input
              type="text"
              name="playerName"
              value={formData.playerName}
              onChange={handleInputChange}
            />
          </div>

          {/* EMAIL + PHONE */}
          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* AGE + SPORT */}
          <div className="form-row">
            <div className="form-group">
              <label>Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Sport *</label>
              <input
                type="text"
                name="sport"
                value={formData.sport}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* OPTIONAL */}
          <div className="form-row">
            <div className="form-group">
              <label>Jersey Number</label>
              <input
                type="number"
                name="jersey_number"
                value={formData.jersey_number}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* IMAGE */}
          <div className="form-group">
            <label>Upload Image *</label>
            <input type="file" ref={imageInputRef} onChange={handleImageChange} />
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="preview-img" />
            )}
          </div>

          {/* PAYMENT */}
          <div className="form-group">
            <label>Payment Method *</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="">Select Payment</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          {/* PAY BUTTON */}
          <button
            type="button"
            className="pay-btn"
            onClick={handlePayment}
          >
            Pay Now
          </button>

          {paymentStatus && (
            <p className={`payment-status ${paymentDone ? 'success' : 'failed'}`}>
              {paymentStatus}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="submit-btn"
            disabled={!paymentDone || loading}
          >
            {loading ? 'Registering...' : 'Register Player'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default PlayerRegistration;