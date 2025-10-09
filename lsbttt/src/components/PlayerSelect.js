import React from 'react';
import './MainMenu.css';

function PlayerSelect({ onSelectPlayer }) {
  return (
    <div className="main-menu">
      <h2>당신의 턴을 선택하세요</h2>
      <p>(X가 먼저 시작합니다)</p>
      <button onClick={() => onSelectPlayer('X')}>X로 플레이</button>
      <button onClick={() => onSelectPlayer('O')}>O로 플레이</button>
    </div>
  );
}

export default PlayerSelect;