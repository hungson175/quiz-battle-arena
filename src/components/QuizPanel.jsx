// src/components/QuizPanel.jsx
// React Quiz panel component (S7-003)

import React, { useState } from 'react';

/**
 * Quiz panel displayed on the right side of the game
 */
export function QuizPanel({ quizState, moneyState, waveState, onAnswer, onContinue }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Handle answer selection
  const handleAnswerClick = (index) => {
    if (quizState.locked) return;
    setSelectedIndex(index);
  };

  // Handle submit
  const handleSubmit = () => {
    if (selectedIndex !== null && !quizState.locked) {
      onAnswer(selectedIndex);
    }
  };

  // Reset selection when new question appears
  React.useEffect(() => {
    if (quizState.active && quizState.question) {
      setSelectedIndex(null);
    }
  }, [quizState.question?.id]);

  return (
    <div className="quiz-panel-content">
      {/* Header: Money and Wave info */}
      <div className="quiz-header">
        <div className="money-display">
          <span className="money-icon">$</span>
          <span className="money-value">{moneyState.current}</span>
        </div>
        <div className="wave-display">
          Wave {waveState.current}/{waveState.total}
        </div>
      </div>

      {/* Quiz content or waiting state */}
      <div className="quiz-content">
        {quizState.active && quizState.question ? (
          <div className="quiz-question-container">
            {/* Topic */}
            <div className="quiz-topic">
              {quizState.question.topic}
            </div>

            {/* Question */}
            <div className="quiz-question">
              {quizState.question.question}
            </div>

            {/* Answer buttons */}
            <div className="quiz-answers">
              {quizState.question.answers.map((answer, index) => {
                let buttonClass = 'quiz-answer-button';

                if (quizState.locked) {
                  // Show correct/wrong after submission
                  if (index === quizState.correctIndex) {
                    buttonClass += ' correct';
                  } else if (index === selectedIndex && !quizState.correct) {
                    buttonClass += ' wrong';
                  }
                } else if (index === selectedIndex) {
                  buttonClass += ' selected';
                }

                return (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerClick(index)}
                    disabled={quizState.locked}
                  >
                    {answer}
                  </button>
                );
              })}
            </div>

            {/* Submit button */}
            {!quizState.locked && (
              <button
                className="quiz-submit-button"
                onClick={handleSubmit}
                disabled={selectedIndex === null}
              >
                Submit Answer
              </button>
            )}

            {/* Result feedback */}
            {quizState.locked && (
              <div className={`quiz-result ${quizState.correct ? 'correct' : 'wrong'}`}>
                {quizState.correct ? '+50 Correct!' : '-30 Wrong!'}
              </div>
            )}

            {/* Explanation (shown after submission) */}
            {quizState.locked && quizState.question.explanation && (
              <div className="quiz-explanation">
                {quizState.question.explanation}
              </div>
            )}

            {/* AC5: Continue button to dismiss quiz */}
            {quizState.locked && (
              <button
                className="quiz-continue-button"
                onClick={onContinue}
              >
                Continue
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-waiting">
            <div className="waiting-icon">?</div>
            <div className="waiting-text">Next question coming soon...</div>
            <div className="waiting-hint">Defend your house!</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPanel;
