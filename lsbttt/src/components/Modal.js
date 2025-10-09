import React from 'react';
import './Modal.css';

function Modal({ result, onRestart, onGoHome }) {
  if (!result) return null;

  const message = result === 'Tie' ? "무승부!" : `플레이어 ${result}가 이겼습니다!`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>게임 오버</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onRestart}>다시 플레이</button>
          <button onClick={onGoHome}>홈으로</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;