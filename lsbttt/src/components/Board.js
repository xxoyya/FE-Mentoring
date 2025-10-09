import React from 'react';
import Square from './Square';
import './Board.css';

function Board({ squares, onClick, xIsNext, gameResult }) {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isNext={xIsNext ? 'X' : 'O'}
        isWinner={gameResult !== null}
      />
    );
  };
  
  const boardClassName = `board-container ${xIsNext ? 'x-turn' : 'o-turn'}`;

  return (
    <div className={boardClassName}>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

export default Board;