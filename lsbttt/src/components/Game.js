import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Modal from './Modal';
import { calculateWinner, findBestMove } from '../utils/gameLogic';

import './Game.css';
import logo from '../assets/Menu_ox.png';
import restartIcon from '../assets/restart_main.png';
import xTurnIcon from '../assets/x_turn.png';
import oTurnIcon from '../assets/o_turn.png';

const INITIAL_SCORES = { X: 0, O: 0, Ties: 0 };

const Game = ({ gameMode, player1Mark, onQuit }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [modalInfo, setModalInfo] = useState({ show: false, type: '', winner: null });

  const player2Mark = player1Mark === 'X' ? 'O' : 'X';
  const isCpuTurn = gameMode === 'pva' && (isXTurn ? 'X' !== player1Mark : 'O' !== player1Mark);

  const handleGameEnd = useCallback((winner) => {
    setModalInfo({ show: true, type: winner ? 'winner' : 'tie', winner });
    setScores(prev => ({
      ...prev,
      [winner || 'Ties']: prev[winner || 'Ties'] + 1
    }));
  }, []);

  useEffect(() => {
    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(Boolean);

    if (winner || isDraw) {
      setTimeout(() => handleGameEnd(winner), 500);
      return;
    }

    if (isCpuTurn) {
      const cpuMark = isXTurn ? 'X' : 'O';
      const timeoutId = setTimeout(() => {
        const bestMove = findBestMove(squares, cpuMark);
        if (bestMove !== null) {
          const newSquares = [...squares];
          newSquares[bestMove] = cpuMark;
          setSquares(newSquares);
          setIsXTurn(prev => !prev);
        }
      }, 700);
      return () => clearTimeout(timeoutId);
    }
  }, [squares, isCpuTurn, handleGameEnd]);

  const handleSquareClick = (index) => {
    if (squares[index] || calculateWinner(squares) || isCpuTurn) return;

    const newSquares = [...squares];
    newSquares[index] = isXTurn ? 'X' : 'O';
    setSquares(newSquares);
    setIsXTurn(!isXTurn);
  };

  const handleNextRound = () => {
    setSquares(Array(9).fill(null));
    setIsXTurn(true);
    setModalInfo({ show: false, type: '', winner: null });
  };
  
  const openRestartModal = () => {
    setModalInfo({ show: true, type: 'restart' });
  };
  
  const closeRestartModal = () => {
    setModalInfo({ show: false, type: '' });
  };

  const confirmRestart = () => {
    handleNextRound();
    setScores(INITIAL_SCORES);
  };

  return (
    <>
      <div className="game-container">
        <header className="game-header">
          <img src={logo} alt="Logo" />
          <div className="turn-indicator">
            <img src={isXTurn ? xTurnIcon : oTurnIcon} alt={`${isXTurn ? 'X' : 'O'}'s turn`} />
          </div>
            <button 
              className="restart-button" 
              onClick={openRestartModal} 
              aria-label="Restart Game"
            ></button>
        </header>

        <Board squares={squares} onSquareClick={handleSquareClick} currentTurn={isXTurn ? 'X' : 'O'} />

        <footer className="score-board">
          <div className="score-box x-score">
            <h3>X ({gameMode === 'pvp' ? 'P1' : (player1Mark === 'X' ? 'YOU' : 'CPU')})</h3>
            <p>{scores.X}</p>
          </div>
          <div className="score-box ties-score">
            <h3>TIES</h3>
            <p>{scores.Ties}</p>
          </div>
          <div className="score-box o-score">
            <h3>O ({gameMode === 'pvp' ? 'P2' : (player1Mark === 'O' ? 'YOU' : 'CPU')})</h3>
            <p>{scores.O}</p>
          </div>
        </footer>
      </div>
      {modalInfo.show && (
        <Modal
          type={modalInfo.type}
          winner={modalInfo.winner}
          onQuit={onQuit}
          onNextRound={handleNextRound}
          onCancel={closeRestartModal}
          onConfirmRestart={confirmRestart}
        />
      )}
    </>
  );
};

export default Game;