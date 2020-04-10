import React from 'react';
import './App.css';

import Board from './components/Board/Board'
import { SpiralMaze,EmptyMaze, SignupMaze, SpiralSlide } from './constants/Mazes'

function App() {

  return (
    <div className="App">
      <Board Content={()=><div>hello</div>} contentSize={{hor:0.5,ver:0.5}}/>
    </div>
  );
}

export default App;
