import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Boxify, RowStyle, ColumnStyle } from './Utils'
import { cordsToIndex, edgeNode, Point, mapInputToGrid } from '../../helpers/BoardFunctions'
import { pathfinder } from '../../algorithms/pathfinder'

import './Board.css'

export default function Board({maze}) {
    const [gridSize,setGridSize] = useState( !!maze ? Math.floor(Math.sqrt(maze.length)) + 2 : 16)
    const [start,setStart] = useState(!!maze ? mapInputToGrid(maze.findIndex(el => el==='S'),gridSize):Point(1,1));
    const [target,setTarget] = useState(!!maze ? mapInputToGrid(maze.findIndex(el => el==='T'),gridSize):Point(1,1));
    const [grid,setGrid] = useState(
        Array(gridSize).fill().map( (_,i) => (
            Array(gridSize).fill().map( (_,j) => (
                edgeNode(Point(i,j),gridSize) ? 'X' :
                maze[cordsToIndex(i-1,j-1,gridSize - 2)]
            ))
        ))
    )
    const onClick = () => {
        let gridcpy = grid.slice();
        pathfinder(start,target,gridcpy,'BFS').visited.map(vis => {
            gridcpy[vis.i][vis.j] = 'V';
            return 0;
        });
        setGrid(gridcpy)
    }
    return (
        <div className='board' >
            {
                grid.map((row,i)=> (
                    <div className='board-row' style={RowStyle(gridSize)} key={i}>
                        {
                            row.map((col,j)=>(
                                <div className='board-column' style={ColumnStyle(gridSize)} key={cordsToIndex(i,j,gridSize)}>
                                    {Boxify(col)}
                                </div>
                            ))
                        }
                    </div>
                ))}
            <button onClick={onClick}>solve</button>
        </div>
    )
}

Board.propTypes= {
    maze:PropTypes.array,
}