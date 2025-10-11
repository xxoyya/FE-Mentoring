import React from 'react';
import './Modal.css';
import iconX from '../assets/icon_x.png';
import iconO from '../assets/icon_o.png';

const Modal = ({ type, winner, onQuit, onNextRound, onCancel, onConfirmRestart }) => {
  const renderContent = () => {
    switch (type) {
      case 'winner':
        return (
          <>
            <p className="modal-subtitle">PLAYER {winner} WINS!</p>
            <div className={`winner-title ${winner === 'X' ? 'x-win' : 'o-win'}`}>
              <img src={winner === 'X' ? iconX : iconO} alt={`${winner} icon`} />
              <h1>TAKES THE ROUND</h1>
            </div>
          </>
        );
      case 'tie':
        return <h1 className="tie-title">ROUND TIED</h1>;
      case 'restart':
        return <h1 className="restart-title">RESTART GAME?</h1>;
      default:
        return null;
    }
  };

  const renderButtons = () => {
    if (type === 'restart') {
      return (
        <>
          <button className="modal-button quit-button" onClick={onCancel}>NO, CANCEL</button>
          <button className="modal-button next-button" onClick={onConfirmRestart}>YES, RESTART</button>
        </>
      );
    }
    return (
      <>
        <button className="modal-button quit-button" onClick={onQuit}>QUIT</button>
        <button className="modal-button next-button" onClick={onNextRound}>NEXT ROUND</button>
      </>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {renderContent()}
        <div className="modal-buttons">
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

export default Modal;