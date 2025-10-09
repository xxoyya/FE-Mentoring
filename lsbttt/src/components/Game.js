import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Modal from './Modal';
import './Game.css';

const INITIAL_SQUARES = Array(9).fill(null);
const INITIAL_SCORES = { X: 0, O: 0, Tie: 0 };

function Game({ gameMode, playerMark, onGoHome }) {
  const [squares, setSquares] = useState(INITIAL_SQUARES);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [gameResult, setGameResult] = useState(null);

  const aiMark = playerMark === 'X' ? 'O' : 'X';
  const isAiTurn = gameMode === 'pva' && (xIsNext ? 'X' === aiMark : 'O' === aiMark);
  
  const handlePlay = useCallback((newSquares) => {
      setSquares(newSquares);
      setXIsNext(prev => !prev);
  }, []);

  useEffect(() => {
    const winner = calculateWinner(squares);
    const isBoardFull = squares.every(square => square !== null);

    if (winner) {
      setGameResult(winner);
      setScores(prevScores => ({...prevScores, [winner]: prevScores[winner] + 1 }));
    } else if (isBoardFull) {
      setGameResult('Tie');
      setScores(prevScores => ({ ...prevScores, Tie: prevScores.Tie + 1 }));
    } else if (isAiTurn) {
        
        const timeoutId = setTimeout(() => {
            const bestMove = findBestMove(squares, aiMark);
            const newSquares = squares.slice();
            newSquares[bestMove] = aiMark;
            handlePlay(newSquares);
        }, 500); // !딜레이 조절하는곳!
        return () => clearTimeout(timeoutId);
    }
  }, [squares, isAiTurn, aiMark, handlePlay]);


  const handleSquareClick = (i) => {
    if (squares[i] || calculateWinner(squares) || isAiTurn) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    handlePlay(newSquares);
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
  const winner = calculateWinner(squares);
  if (winner) {
    status = `승리: ${winner}`;
  } else if (squares.every(s => s)) {
    status = "결과: 무승부";
  } else {
    status = `현재 순서: ${xIsNext ? 'X' : 'O'}`;
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
        <button onClick={() => resetGame(false)}>게임 및 스코어 초기화</button>
      </div>
      <div className="score-board">
        <span>O 승리: {scores.O}</span>
        <span>무승부: {scores.Tie}</span>
        <span>X 승리: {scores.X}</span>
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
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function findBestMove(squares, aiMark) {
    const opponentMark = aiMark === 'X' ? 'O' : 'X';

    for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
            const tempSquares = squares.slice();
            tempSquares[i] = aiMark;
            if (calculateWinner(tempSquares) === aiMark) return i;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
            const tempSquares = squares.slice();
            tempSquares[i] = opponentMark;
            if (calculateWinner(tempSquares) === opponentMark) return i;
        }
    }

    if (!squares[4]) return 4;

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => !squares[i]);
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    const sides = [1, 3, 5, 7];
    const availableSides = sides.filter(i => !squares[i]);
    if (availableSides.length > 0) {
        return availableSides[Math.floor(Math.random() * availableSides.length)];
    }

    return null;
}


export default Game;