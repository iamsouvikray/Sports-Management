import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PlayerRegistration from './components/PlayerRegistration';
import AdminDashboard from './components/AdminDashboard';
import ThemeSwitcher from './components/ThemeSwitcher';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<PlayerRegistration />} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
      <ThemeSwitcher />
    </Router>
  );
};

export default App;
