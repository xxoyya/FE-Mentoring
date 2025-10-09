import React from 'react';
import './Square.css';

function Square({ value, onClick, isNext, isWinner }) {
  const playerClass = value === 'X' ? 'x' : 'o';
  const filledClass = value ? 'filled' : '';
  const winnerClass = isWinner ? 'disabled' : '';
  
  return (
    <button
      className={`square ${playerClass} ${filledClass} ${winnerClass}`}
      onClick={onClick}
      disabled={isWinner}
      data-hover={isNext}
    >
      {value}
    </button>
  );
}

export default Square;