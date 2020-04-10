import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Boxify, RowStyle, ColumnStyle, gridNode } from './Utils'
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
                edgeNode(Point(i,j),gridSize) ? gridNode('X') :
                gridNode(maze[cordsToIndex(i-1,j-1,gridSize - 2)])
            ))
        ))
    )
    const onClick = async () => {
        let gridcpy_visited = grid.slice();
        let gridcpy_path = grid.slice();
        const { visited, path } = pathfinder(start,target,gridcpy_visited,'BFS')
        visited.map((vis,order) => {
            gridcpy_visited[vis.i][vis.j] = gridNode(
                'V_A',                  //type
                1,                      //duration (in s)
                order/visited.length    //delay (in s)
            );
            return 0;
        });
        setGrid(gridcpy_visited)
        await new Promise(resolve => {
            setTimeout(resolve,( 1 + 1) * 1000)
        })
        visited.map(vis => {
            gridcpy_path[vis.i][vis.j] = gridNode(
                'V', 0, 0
            )
            return 0;
        })
        path.map((s_path,order) => {
            gridcpy_path[s_path.i][s_path.j] = gridNode(
                'P', 1, order/path.length
            )
            return 0;
        }) 
        setGrid(gridcpy_path);

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