import React from 'react';
import Game from './components/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Tic Tac Toe</h1>
      </header>
      <main>
        {/*메뉴가 들어올 곳, 일단 Game으로 대체*/}
        <Game />
      </main>
    </div>
  );
}

export default App;