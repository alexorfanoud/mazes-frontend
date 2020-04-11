import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Boxify, RowStyle, ColumnStyle, contentStyle } from './Utils'
import { cordsToIndex, edgeNode, Point, mapInputToGrid, generateGrid, gridNode, randomPositionGenerator, nodeEquals,  } from '../../helpers/BoardFunctions'
import { pathfinder } from '../../algorithms/pathfinder'

import './Board.css'

export default function Board({maze, Content, contentSize}) {
    const difficulty = 100;
    const density = 1.2
    const defaultSize = 16;
    const [gridSize,setGridSize] = useState( !!maze ? Math.floor(Math.sqrt(maze.length)) + 2 : defaultSize)
    const [start,setStart] = useState(!!maze ? mapInputToGrid(maze.findIndex(el => el==='S'),gridSize):randomPositionGenerator(gridSize));
    const [grid,setGrid] = useState(
        !!maze ? generateGrid(maze,gridSize):
        generateGrid(null,gridSize, start, density)
    )
    const [target,setTarget] = useState(
        !!maze ? mapInputToGrid(maze.findIndex(el => el==='T'),gridSize):
        () => {
            const visited = pathfinder(start,Point(-1,-1),grid,'slide').visited
            const targetPos = visited[Math.floor((visited.length-1) *(difficulty/100))];
            let gridcpy = grid.slice();
            gridcpy[targetPos.i][targetPos.j] = gridNode('T')
            setGrid(gridcpy);
            return targetPos;
        }
    );


    const onClick = async () => {
        let gridcpy_visited = grid.slice();
        let gridcpy_path = grid.slice();
        const { visited, path } = pathfinder(start,target,gridcpy_visited,'slide')
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
            setTimeout(resolve,( 1 + 1) * 1000) // wait for visited animation to finish
        })
        visited.map(vis => {
            gridcpy_path[vis.i][vis.j] = gridNode(
                'V', 0, 0
            )
            return 0;
        })
        path.map((s_path,order) => {
            if(!nodeEquals(s_path,target)) {
                gridcpy_path[s_path.i][s_path.j] = gridNode(
                    'P', 1, order/path.length
                )
            }
            return 0;
        }) 
        setGrid(gridcpy_path);

    }

    return (
        <div className='grid'>
            {!!Content && Object.keys(contentSize).length===2 &&
                <div className='custom-content' style={contentStyle(contentSize,gridSize)}>
                    {Content()}
                </div>
            }   
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
        </div>
        
    )
}

Board.propTypes= {
    maze:PropTypes.array,
}