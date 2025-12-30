// src/App.jsx
// React wrapper with 70/30 layout for Phaser game + Quiz panel

import React, { useEffect, useRef } from 'react';
import { initGame, destroyGame } from './game.js';
import QuizPanel from './components/QuizPanel.jsx';
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

      {/* Right: Quiz panel (30%) */}
      <div className="quiz-panel">
        <QuizPanel />
      </div>
    </div>
  );
}

export default App;
