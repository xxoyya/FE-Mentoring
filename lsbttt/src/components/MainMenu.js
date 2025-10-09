import React from 'react';
import './MainMenu.css';

function MainMenu({ onSelectMode }) {
  return (
    <div className="main-menu">
      <h2>게임 모드</h2>
      <button onClick={() => onSelectMode('pvp')}>플레이어 vs 플레이어</button>
      <button onClick={() => onSelectMode('pva')}>플레이어 vs 인공지능</button>
    </div>
  );
}

export default MainMenu;