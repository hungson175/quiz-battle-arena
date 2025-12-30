// src/main.jsx
// Entry point - NO React.StrictMode (breaks Phaser WebGL)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';

// WARNING: Do NOT wrap in <React.StrictMode>
// StrictMode causes double-mounting which destroys Phaser's WebGL context
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
