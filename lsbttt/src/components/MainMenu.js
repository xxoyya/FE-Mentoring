import React, { useState } from 'react';
import './MainMenu.css';
import logo from '../assets/Menu_ox.png';

import f_o from '../assets/dark_o.png';
import t_o from '../assets/light_o.png';
import f_x from '../assets/dark_x.png';
import t_x from '../assets/light_x.png';

const MainMenu = ({ onStartGame }) => {
  const [player1Mark, setPlayer1Mark] = useState('O');

  return (
    <div className="main-menu-container">
      <img src={logo} alt="Tic Tac Toe Logo" className="logo" />

      <div className="settings-container">
        <h2 className="picker-title">PICK PLAYER 1'S MARK</h2>
        <div className="symbol-toggle-container">

          <button
            className={`toggle-symbol-button ${player1Mark === 'X' ? 'active' : ''}`}
            onClick={() => setPlayer1Mark('X')}
          >
            <img src={player1Mark === 'X' ? f_x : t_x} alt="X symbol" />
          </button>
          
          <button
            className={`toggle-symbol-button ${player1Mark === 'O' ? 'active' : ''}`}
            onClick={() => setPlayer1Mark('O')}
          >
            <img src={player1Mark === 'O' ? f_o : t_o} alt="O symbol" />
          </button>
        </div>
        <p className="reminder-text">REMEMBER: X GOES FIRST</p>
      </div>

      <div className="game-buttons">
        <button className="game-button cpu-button" onClick={() => onStartGame('pva', player1Mark)}>
          NEW GAME (VS CPU)
        </button>
        <button className="game-button player-button" onClick={() => onStartGame('pvp', player1Mark)}>
          NEW GAME (VS PLAYER)
        </button>
      </div>
    </div>
  );
};

export default MainMenu;