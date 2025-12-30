// src/main.jsx
// React entry point (S7-003)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';

// Create root and render app
// Note: StrictMode removed - causes double mount which destroys Phaser game
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
