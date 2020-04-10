import React from 'react';
import './App.css';

import Board from './components/Board/Board'
import { SpiralMaze,EmptyMaze, SignupMaze, SpiralSlide } from './constants/Mazes'

function App() {
  return (
    <div className="App">
      <Board maze={SpiralSlide.maze}/>
    </div>
  );
}

export default App;
