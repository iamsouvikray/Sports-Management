import React, { useState } from 'react';
import '../styles/ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { name: 'Default', class: '', colors: ['#667eea', '#764ba2'] },
    { name: 'Football', class: 'theme-football', colors: ['#1e3a8a', '#3b82f6'] },
    { name: 'Basketball', class: 'theme-basketball', colors: ['#dc2626', '#ef4444'] },
    { name: 'Cricket', class: 'theme-cricket', colors: ['#166534', '#16a34a'] },
    { name: 'Tennis', class: 'theme-tennis', colors: ['#7c2d12', '#ea580c'] },
    { name: 'Volleyball', class: 'theme-volleyball', colors: ['#7c3aed', '#a855f7'] },
    { name: 'Baseball', class: 'theme-baseball', colors: ['#1f2937', '#374151'] },
    { name: 'Dark Mode', class: 'theme-dark', colors: ['#374151', '#1f2937'] },
    { name: 'High Contrast', class: 'theme-high-contrast', colors: ['#000000', '#333333'] },
  ];

  const applyTheme = (themeClass) => {
    // Remove all theme classes
    document.documentElement.className = document.documentElement.className
      .split(' ')
      .filter(cls => !cls.startsWith('theme-'))
      .join(' ');

    // Apply new theme
    if (themeClass) {
      document.documentElement.classList.add(themeClass);
    }

    setIsOpen(false);
  };

  const setCustomColors = () => {
    const primary1 = prompt('Enter primary color 1 (hex):', '#667eea');
    const primary2 = prompt('Enter primary color 2 (hex):', '#764ba2');

    if (primary1 && primary2) {
      document.documentElement.style.setProperty('--primary-color-1', primary1);
      document.documentElement.style.setProperty('--primary-color-2', primary2);
      setIsOpen(false);
    }
  };

  return (
    <div className="theme-switcher">
      <button
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Theme"
      >
        🎨
      </button>

      {isOpen && (
        <div className="theme-menu">
          <div className="theme-menu-header">
            <h4>Choose Theme</h4>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="theme-grid">
            {themes.map((theme) => (
              <button
                key={theme.name}
                className="theme-option"
                onClick={() => applyTheme(theme.class)}
                title={theme.name}
              >
                <div
                  className="theme-preview"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors[0]} 0%, ${theme.colors[1]} 100%)`
                  }}
                ></div>
                <span className="theme-name">{theme.name}</span>
              </button>
            ))}

            <button
              className="theme-option custom-theme"
              onClick={setCustomColors}
              title="Custom Colors"
            >
              <div className="theme-preview custom-preview">
                <span>+</span>
              </div>
              <span className="theme-name">Custom</span>
            </button>
          </div>

          <div className="theme-info">
            <small>Click any theme to apply it instantly!</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
