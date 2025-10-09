import React from 'react';
import './Modal.css';

function Modal({ result, onRestart, onGoHome }) {
  if (!result) return null;

  const message = result === 'Tie' ? "It's a Tie!" : `Player ${result} Wins!`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Game Over</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onRestart}>Play Again</button>
          <button onClick={onGoHome}>Go to Home</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;