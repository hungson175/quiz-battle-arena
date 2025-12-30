// src/App.jsx
// React wrapper with 70/30 layout for Phaser game + Quiz panel

import React, { useEffect, useRef } from 'react';
import { initGame, destroyGame } from './game.js';
import './App.css';

function App() {
  const gameInitialized = useRef(false);

  useEffect(() => {
    // Guard against double initialization (React StrictMode or HMR)
    if (gameInitialized.current) {
      return;
    }
    gameInitialized.current = true;

    // Initialize Phaser game
    console.log('[App] Initializing Phaser game...');
    initGame('game-container');

    // Cleanup on unmount
    return () => {
      console.log('[App] Cleaning up Phaser game...');
      destroyGame();
      gameInitialized.current = false;
    };
  }, []);

  return (
    <div className="app-container">
      {/* Left: Phaser game (70%) */}
      <div id="game-container" className="game-panel"></div>

      {/* Right: Quiz panel (30%) - placeholder for now */}
      <div className="quiz-panel">
        <div className="quiz-placeholder">
          <h2>QUIZ</h2>
          <p>Quiz panel coming soon...</p>
          <p>Gold from quizzes only!</p>
        </div>
      </div>
    </div>
  );
}

export default App;
