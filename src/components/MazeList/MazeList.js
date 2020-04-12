import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

import Board from '../Board/Board'

import './MazeList.css'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function MazeList({mazeList}) {
    const [randomMazeId] = useState(uuidv4())
    return (
        <div className='sidebar'>
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