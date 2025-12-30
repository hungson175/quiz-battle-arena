// src/main.jsx
// React entry point (S7-003)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';

// Create root and render app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
