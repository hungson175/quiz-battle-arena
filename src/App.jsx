// src/App.jsx
// Main React app with 70% Phaser / 30% Quiz layout (S7-003)

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene.js';
import { QuizPanel } from './components/QuizPanel.jsx';
import { useGameBridge } from './hooks/useGameBridge.js';

// Game configuration
const gameConfig = {
  type: Phaser.AUTO,
  width: 672,  // 70% of 960 original width
  height: 540,
  parent: 'phaser-container',
  backgroundColor: '#87ceeb',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [GameScene]
};

export function App() {
  const gameRef = useRef(null);
  const {
    quizState,
    moneyState,
    waveState,
    handleQuizAnswer,
    handleContinue
  } = useGameBridge(gameRef);

  // Mount Phaser game on component mount
  useEffect(() => {
    // Create game instance
    gameRef.current = new Phaser.Game(gameConfig);

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="app-container">
      {/* Left: Phaser game (70%) */}
      <div id="phaser-container" className="game-panel"></div>

      {/* Right: Quiz panel (30%) */}
      <div className="quiz-panel">
        <QuizPanel
          quizState={quizState}
          moneyState={moneyState}
          waveState={waveState}
          onAnswer={handleQuizAnswer}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
}

export default App;
