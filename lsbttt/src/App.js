import React, { useState } from 'react';
import Game from './components/Game';
import MainMenu from './components/MainMenu';
import PlayerSelect from './components/PlayerSelect';
import './App.css';

function App() {
  const [gameState, setGameState] = useState({
    mode: null,
    playerMark: 'X',
    view: 'menu'
  });

  const handleModeSelect = (mode) => {
    if (mode === 'pvp') {
      setGameState({ mode: 'pvp', playerMark: 'X', view: 'game' });
    } else {
      setGameState(prev => ({ ...prev, mode: 'pva', view: 'playerSelect' }));
    }
  };

  const handlePlayerSelect = (mark) => {
    setGameState(prev => ({ ...prev, playerMark: mark, view: 'game' }));
  };

  const goToHome = () => {
    setGameState({ mode: null, playerMark: 'X', view: 'menu' });
  };

  const renderView = () => {
    switch (gameState.view) {
      case 'menu':
        return <MainMenu onSelectMode={handleModeSelect} />;
      case 'playerSelect':
        return <PlayerSelect onSelectPlayer={handlePlayerSelect} />;
      case 'game':
        return (
          <Game
            key={`${gameState.mode}-${gameState.playerMark}`}
            gameMode={gameState.mode}
            playerMark={gameState.playerMark}
            onGoHome={goToHome}
          />
        );
      default:
        return <MainMenu onSelectMode={handleModeSelect} />;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>틱택토</h1>
      </header>
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;