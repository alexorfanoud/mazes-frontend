import React,{ useState, useEffect, useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {v4 as uuidv4} from 'uuid'

import Board from '../../Board/Board'
import { EmptyMaze } from '../../../constants/Mazes'
import { MazeInteraction } from '../../../actions/Mazes/Interactions'
import { handleMazeRequest} from '../../../helpers/MazeRequests'
import { MazeRequestDelete } from '../../../actions/Mazes/Interactions'
import { AddMaze } from '../../../actions/Mazes/Requests'

import './CreatePage.css'
import { Icon } from 'semantic-ui-react'



export default function CreatePage() {
    const mazeId = EmptyMaze.maze_id
    const dispatch = useDispatch();
    const [activeItem,setActiveItem] = useState()              

    const [solveRequestId] = useState(uuidv4())
    const [saveRequestId] = useState(uuidv4())
    const mazeRequests = useSelector(state=>state.Mazes.requests[mazeId]) //TODO HANDLE SELECTORS MAN
    useEffect(()=>{
        if(!!mazeRequests && !!mazeRequests[solveRequestId] && mazeRequests[solveRequestId].status==='resolved') dispatch(MazeRequestDelete({path:[mazeId,solveRequestId]}))
        if(!!mazeRequests && !!mazeRequests[saveRequestId] && mazeRequests[saveRequestId].status==='resolved') {console.log(mazeRequests[saveRequestId].maze);dispatch(AddMaze(mazeRequests[saveRequestId].maze));dispatch(MazeRequestDelete({path:[mazeId,saveRequestId]}))} //TODO CATCH ERROR IN ADD MAZE
    },[dispatch,mazeRequests,solveRequestId,saveRequestId,mazeId])
    const handleMazeRequests = useCallback(handleMazeRequest,[]) 

    const handleClick = (name) => {
        const currentInteraction = {
            path:[mazeId],
            info:{
                mode:'Edit',
                box:`${name}`
            }
        }
        dispatch(MazeInteraction(currentInteraction))
        setActiveItem(name);
    }
    
    return (
        <div className='canvas-container'>
            <div className='sidebar'>
                <div className='sidebar-item' onClick={()=>handleClick('Start')}>
                    <Icon name='flag' size='huge' color='olive'/>
                    <h3>Start</h3>
                </div>
                <div className='sidebar-item' onClick={()=>handleClick('Target')}>
                    <Icon name='crosshairs' size='huge' color='red'/>
                    <h3>Target</h3>
                </div>
                <div className='sidebar-item' onClick={()=>handleClick('Obstacle')}>
                    <Icon name='bomb' size='huge' color='black'/>
                    <h3>Obstacle</h3>
                </div>
                <div className='sidebar-item' onClick={()=>handleMazeRequests('solve',mazeId,solveRequestId,dispatch)}>
                    <Icon name='lightbulb' size='huge' color='yellow'/>
                    <h3>Solve</h3>
                </div>
                <div className='sidebar-item' onClick={()=>handleMazeRequests('save',mazeId,saveRequestId,dispatch)}>
                    <Icon name='plus' size='huge' color='green'/>
                    <h3>Save</h3>
                </div>
            </div>
            <Board mazeId={EmptyMaze.maze_id} maze={EmptyMaze.maze}/>
        </div>
        
    )
}
