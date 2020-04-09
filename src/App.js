import React from 'react';
import './App.css';

import Board from './components/Board/Board'
import { SpiralMaze,EmptyMaze } from './constants/Mazes'

function App() {
  return (
    <div className="App">
      <Board maze={EmptyMaze.maze}/>
    </div>
  );
}

export default App;
