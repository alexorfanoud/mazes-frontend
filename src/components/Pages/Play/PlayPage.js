import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';

import { getStateElement } from '../../../helpers/ReduxStore';
import Board from '../../Board/Board';
import { MazeInteraction } from '../../../actions/Mazes/Interactions';

export default function PlayPage() {
    const dispatch = useDispatch();
    const mazeId = useParams().id;
    const maze = useSelector(state=>getStateElement(state,['Mazes','mazeList',mazeId]))

    useEffect(()=>{
        dispatch(MazeInteraction({
            path:[mazeId],
            info:{
                mode:'Play',
            }
        }))
    },[dispatch,mazeId])
    return (
        <div className='canvas-container' >
            {!maze ? <Board mazeId={mazeId} /> : <Board maze={maze} mazeId={mazeId} />}
        </div>
        
    )
}
