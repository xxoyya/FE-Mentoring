import React from 'react';
import Square from './Square';
import './Board.css';

const Board = ({ squares, onSquareClick, currentTurn }) => {
  return (
    <div className="board">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onSquareClick(i)}
          currentTurn={currentTurn}
        />
      ))}
    </div>
  );
};

export default Board;