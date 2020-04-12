import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Board from '../Board/Board'

import './MazeList.css'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function MazeList({mazeList}) {
    const [randomMazeId] = useState('RandomMaze')
    return (
        <div className='mazeList'>
            <Link to={`/maze/${randomMazeId}`} className='mazeList-item random' key={randomMazeId} >
                <Icon name='question' size='massive' color='violet'/>
            </Link>
            {mazeList.map(elem => (
                <Link to={`/maze/${elem.Id}`} className='mazeList-item' key={elem.Id}>
                    <Board maze={elem.maze} mazeId={elem.Id} key={elem.Id} />
                </Link>
            ))}
        </div>
    )
}

MazeList.propTypes = {
    mazeList:PropTypes.array.isRequired,
}