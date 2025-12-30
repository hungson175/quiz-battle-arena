// src/hooks/useGameBridge.js
// Event bridge between Phaser and React (S7-003)

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to bridge Phaser game events with React state
 * @param {Object} gameRef - React ref to Phaser game instance
 * @returns {Object} Game state and event handlers
 */
export function useGameBridge(gameRef) {
  // Quiz state
  const [quizState, setQuizState] = useState({
    active: false,
    question: null,
    selectedAnswer: null,
    locked: false
  });

  // Money state
  const [moneyState, setMoneyState] = useState({
    current: 200,
    earned: 0,
    lost: 0
  });

  // Wave state
  const [waveState, setWaveState] = useState({
    current: 0,
    total: 5,
    state: 'waiting'
  });

  // Handle quiz answer from React
  const handleQuizAnswer = useCallback((answerIndex) => {
    if (!gameRef.current || quizState.locked) return;

    const scene = gameRef.current.scene.getScene('GameScene');
    if (scene) {
      // Emit event to Phaser
      scene.events.emit('quiz:answer', answerIndex);
    }
  }, [gameRef, quizState.locked]);

  // AC5: Handle continue button - dismiss quiz
  const handleContinue = useCallback(() => {
    if (!gameRef.current) return;

    const scene = gameRef.current.scene.getScene('GameScene');
    if (scene) {
      scene.events.emit('quiz:continue');
    }

    // Reset local state
    setQuizState({
      active: false,
      question: null,
      selectedAnswer: null,
      locked: false
    });
  }, [gameRef]);

  // Setup event listeners
  useEffect(() => {
    // Wait for game to be ready
    const checkGame = setInterval(() => {
      if (!gameRef.current) return;

      const scene = gameRef.current.scene.getScene('GameScene');
      if (!scene) return;

      // Clear interval once we have scene
      clearInterval(checkGame);

      // Listen for quiz:show event
      scene.events.on('quiz:show', (question) => {
        setQuizState({
          active: true,
          question,
          selectedAnswer: null,
          locked: false
        });
      });

      // Listen for quiz:hide event
      scene.events.on('quiz:hide', () => {
        setQuizState({
          active: false,
          question: null,
          selectedAnswer: null,
          locked: false
        });
      });

      // Listen for quiz:result event
      scene.events.on('quiz:result', ({ correct, correctIndex }) => {
        setQuizState(prev => ({
          ...prev,
          locked: true,
          correct,
          correctIndex
        }));
      });

      // Listen for money:update event
      scene.events.on('money:update', (money) => {
        setMoneyState(money);
      });

      // Listen for wave:update event
      scene.events.on('wave:update', (wave) => {
        setWaveState(wave);
      });
    }, 100);

    return () => {
      clearInterval(checkGame);
      if (gameRef.current) {
        const scene = gameRef.current.scene.getScene('GameScene');
        if (scene) {
          scene.events.off('quiz:show');
          scene.events.off('quiz:hide');
          scene.events.off('quiz:result');
          scene.events.off('money:update');
          scene.events.off('wave:update');
        }
      }
    };
  }, [gameRef]);

  return {
    quizState,
    moneyState,
    waveState,
    handleQuizAnswer,
    handleContinue
  };
}
