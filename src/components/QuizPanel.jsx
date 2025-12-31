// src/components/QuizPanel.jsx
// React component for quiz display

import React from 'react';
import { useQuizEvents } from '../hooks/useQuizEvents.js';
import './QuizPanel.css';

export default function QuizPanel() {
  const { question, result, streak, submitAnswer } = useQuizEvents();

  // Loading state - waiting for first question
  if (!question) {
    return (
      <div className="quiz-content">
        <div className="quiz-header">
          <h2>QUIZ</h2>
          <div className="stats">
            <div className="streak">Streak: {streak}</div>
          </div>
        </div>
        <div className="quiz-loading">
          <p>Waiting for game to start...</p>
          <p className="hint">Select a map and start the game!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-content">
      <div className="quiz-header">
        <h2>QUIZ</h2>
        <div className="stats">
          <div className="streak">Streak: {streak} 🔥</div>
        </div>
      </div>

      <div className="question-container">
        <div className="question-text">
          {question.question}
        </div>

        <div className="answers">
          {question.answers.map((answer, index) => {
            let buttonClass = 'answer-btn';

            if (result !== null) {
              if (index === result.correctIndex) {
                buttonClass += ' correct';
              } else if (index !== result.correctIndex && result.correct === false) {
                buttonClass += ' disabled';
              }
            }

            return (
              <button
                key={index}
                onClick={() => submitAnswer(index)}
                disabled={result !== null}
                className={buttonClass}
              >
                {answer}
              </button>
            );
          })}
        </div>

        {result && (
          <div className={`result-feedback ${result.correct ? 'correct' : 'wrong'}`}>
            {result.correct ? (
              <>
                <span className="result-icon">✓</span>
                <span>Correct! +{result.goldChange} Gold</span>
              </>
            ) : (
              <>
                <span className="result-icon">✗</span>
                <span>Wrong! {result.goldChange} Gold</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="quiz-footer">
        <p>Answer correctly to earn gold for towers!</p>
      </div>
    </div>
  );
}
