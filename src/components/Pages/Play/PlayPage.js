import React from 'react'
import { useParams } from 'react-router'
import { getStateElement } from '../../../helpers/ReduxStore';
import { useSelector } from 'react-redux';
import Board from '../../Board/Board';

export default function PlayPage() {
    const id = useParams().id;
    const maze = useSelector(state=>getStateElement(state,['Mazes','mazeList',id]))
    return (
        <div className='canvas-container' >
            {!maze ? <Board mazeId={id} /> : <Board maze={maze} mazeId={id} />}
        </div>
        
    )
}
