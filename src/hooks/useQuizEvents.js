// src/hooks/useQuizEvents.js
// React hook for quiz event communication with Phaser

import { useEffect, useState, useCallback } from 'react';

export function useQuizEvents() {
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState(null);
  const [gold, setGold] = useState(300); // Starting gold
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Handle new question
    const handleShow = (e) => {
      setQuestion(e.detail.question);
      setStreak(e.detail.streak);
      setGold(e.detail.gold);
      setResult(null); // Clear previous result
    };

    // Handle answer result
    const handleResult = (e) => {
      setResult(e.detail);
      setGold(e.detail.gold);
      setStreak(e.detail.streak);
    };

    // Handle gold updates from game
    const handleGoldUpdate = (e) => {
      setGold(e.detail.gold);
    };

    // Add listeners on mount
    window.addEventListener('quiz:show', handleShow);
    window.addEventListener('quiz:result', handleResult);
    window.addEventListener('game:goldUpdate', handleGoldUpdate);

    console.log('[useQuizEvents] Event listeners registered');

    // Cleanup on unmount
    return () => {
      window.removeEventListener('quiz:show', handleShow);
      window.removeEventListener('quiz:result', handleResult);
      window.removeEventListener('game:goldUpdate', handleGoldUpdate);
    };
  }, []); // Empty deps = on mount only

  // Submit answer to Phaser
  const submitAnswer = useCallback((answerIndex) => {
    window.dispatchEvent(new CustomEvent('quiz:answer', {
      detail: { answerIndex }
    }));
  }, []);

  return {
    question,
    result,
    gold,
    streak,
    submitAnswer
  };
}
