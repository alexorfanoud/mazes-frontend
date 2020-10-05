import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import {v4 as uuidv4} from 'uuid'

import { getStateElement } from '../../../helpers/ReduxStore';
import Board from '../../Board/Board';
import { MazeInteraction, MazeRequest, MazeRequestDelete } from '../../../actions/Mazes/Interactions';

import { Icon } from 'semantic-ui-react'

export default function PlayPage() {
    const dispatch = useDispatch();
    const mazeId = useParams().id;
    const maze = useSelector(state=>getStateElement(state,['Mazes','mazeList',mazeId]))
    const [solveRequestId] = useState(uuidv4())
    const solveRequest = useSelector(state=>getStateElement(state,['Mazes','requests',mazeId,solveRequestId]))

    useEffect(()=>{
        dispatch(MazeInteraction({
            path:[mazeId],
            info:{
                mode:'Play',
            }
        }))
        if(!!solveRequest && solveRequest.status==='resolved') {
            dispatch(MazeRequestDelete({path:[mazeId,solveRequestId]}))
        }
    },[dispatch,mazeId, solveRequestId, solveRequest])

    const solve = useCallback((alg) => {
        console.log(alg)
        dispatch(MazeRequest({
            path:[mazeId,solveRequestId],
            info:{
                request:'solve',
                algorithm: alg
            }
        }))
    }, [dispatch, mazeId, solveRequestId])

    return (
        <div className='canvas-container' >
            <div className='sidebar' >
                <div className='sidebar-item' onClick={()=>solve('BFS')}>
                    <Icon name='bullseye' size='huge' color='blue'/>
                    <h3>BFS</h3>
                </div>
                <div className='sidebar-item' onClick={()=>solve('slide')}>
                    <Icon name='arrows alternate' size='huge' color='green'/>
                    <h3>Ricochet</h3>
                </div>
                <div className='sidebar-item' onClick={()=>solve('ASTAR')}>
                    <Icon name='location arrow' size='huge' color='red'/>
                    <h3>ASTAR</h3>
                </div>
            </div>
            {!maze ? <Board mazeId={mazeId} /> : <Board maze={maze} mazeId={mazeId} />}
        </div>
        
    )
}
