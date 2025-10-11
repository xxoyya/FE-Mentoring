import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import './App.css';

function App() {
  const [gameSettings, setGameSettings] = useState(null);

  const handleStartGame = (mode, player1Mark) => {
    setGameSettings({ mode, player1Mark });
  };

  const handleQuit = () => {
    setGameSettings(null);
  };

  return (
    <div className="App">
      {!gameSettings ? (
        <MainMenu onStartGame={handleStartGame} />
      ) : (
        <Game
          gameMode={gameSettings.mode}
          player1Mark={gameSettings.player1Mark}
          onQuit={handleQuit}
        />
      )}
    </div>
  );
}

export default App;