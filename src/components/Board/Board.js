import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { cordsToIndex, edgeNode, Point, Boxify, RowStyle, ColumnStyle } from './Helpers'

import './Board.css'

export default function Board({maze}) {
    const [gridSize,setGridSize] = useState( !!maze ? Math.floor(Math.sqrt(maze.length)) + 2 : 16)
    const [grid,setGrid] = useState(
        Array(gridSize).fill().map( (_,i) => (
            Array(gridSize).fill().map( (_,j) => (
                edgeNode(Point(i,j),gridSize) ? 'X' :
                maze[cordsToIndex(i-1,j-1,gridSize - 2)]
            ))
        ))
    )

    return (
        <div className='board' >
            {
                grid.map(row=> (
                    <div className='board-row' style={RowStyle(gridSize)}>
                        {
                            row.map(col=>(
                                <div className='board-column' style={ColumnStyle(gridSize)}>
                                    {Boxify(col)}
                                </div>
                            ))
                        }
                    </div>
                ))}
        </div>
    )
}

Board.propTypes= {
    maze:PropTypes.array,
}