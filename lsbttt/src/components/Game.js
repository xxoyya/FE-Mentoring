import React, { useState, useEffect } from 'react';
import Board from './Board';
import Modal from './Modal';
import './Game.css';

const INITIAL_SQUARES = Array(9).fill(null);
const INITIAL_SCORES = { X: 0, O: 0, Tie: 0 };

function Game({ onGoHome }) {
  const [squares, setSquares] = useState(INITIAL_SQUARES);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [gameResult, setGameResult] = useState(null);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);

  useEffect(() => {
    if (winner) {
      setGameResult(winner);
      setScores(prevScores => ({...prevScores, [winner]: prevScores[winner] + 1 }));
    } else if (isBoardFull) {
      setGameResult('Tie');
      setScores(prevScores => ({ ...prevScores, Tie: prevScores.Tie + 1 }));
    }
  }, [winner, isBoardFull]);

  const handleSquareClick = (i) => {
    if (squares[i] || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };
  
  const resetGame = (keepScores = false) => {
    setSquares(INITIAL_SQUARES);
    setXIsNext(true);
    setGameResult(null);
    if (!keepScores) {
      setScores(INITIAL_SCORES);
    }
  };

  const handlePlayAgain = () => {
    resetGame(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = "Result: Tie";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          onClick={handleSquareClick}
          xIsNext={xIsNext}
          gameResult={gameResult}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <button onClick={() => resetGame(false)}>Reset Game & Scores</button>
      </div>
      <div className="score-board">
        <span>O Wins: {scores.O}</span>
        <span>Ties: {scores.Tie}</span>
        <span>X Wins: {scores.X}</span>
      </div>
      <Modal 
        result={gameResult} 
        onRestart={handlePlayAgain}
        onGoHome={onGoHome}
      />
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;