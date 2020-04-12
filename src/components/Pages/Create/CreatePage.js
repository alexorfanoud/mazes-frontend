import React,{ useState, useEffect, useCallback } from 'react'
import { useDispatch,useSelector, batch } from 'react-redux'
import {v4 as uuidv4} from 'uuid'

import Board from '../../Board/Board'
import { EmptyMaze } from '../../../constants/Mazes'
import { MazeInteraction } from '../../../actions/Mazes/Interactions'
import { handleMazeRequest} from '../../../helpers/MazeRequests'
import { MazeRequestDelete } from '../../../actions/Mazes/Interactions'
import { AddMaze } from '../../../actions/Mazes/Requests'
import { getStateElement } from '../../../helpers/ReduxStore'

import './CreatePage.css'
import { Icon } from 'semantic-ui-react'



export default function CreatePage() {
    const mazeId = EmptyMaze.maze_id
    const dispatch = useDispatch();
    const [activeItem,setActiveItem] = useState()        

    const [solveRequestId] = useState(uuidv4())
    const [saveRequestId] = useState(uuidv4())
    const solveRequest = useSelector(state=>getStateElement(state,['Mazes','requests',mazeId,solveRequestId]))
    const saveRequest = useSelector(state=>getStateElement(state,['Mazes','requests',mazeId,saveRequestId]))
    useEffect(()=>{
        if(!!solveRequest && solveRequest.status==='resolved') {
            dispatch(MazeRequestDelete({path:[mazeId,solveRequestId]}))
        }
        if(!!saveRequest && saveRequest.status==='resolved') {
            batch(()=>{
                dispatch(MazeRequestDelete({path:[mazeId,saveRequestId]}))
                dispatch(AddMaze(saveRequest.maze)) //TODO HANDLE ADD MAZE FAILURE
            })
        }
    },[dispatch,solveRequestId,saveRequestId,mazeId,saveRequest,solveRequest])
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
    const className = useCallback((item)=>(
        item===activeItem ? 'sidebar-item active':
        'sidebar-item'
    ),[activeItem])
    return (
        <div className='canvas-container'>
            <div className='sidebar'>
                <div className={className('Start')} onClick={()=>handleClick('Start')}>
                    <Icon name='flag' size='huge' color='blue'/>
                    <h3>Start</h3>
                </div>
                <div className={className('Target')} onClick={()=>handleClick('Target')}>
                    <Icon name='crosshairs' size='huge' color='red'/>
                    <h3>Target</h3>
                </div>
                <div className={className('Obstacle')} onClick={()=>handleClick('Obstacle')}>
                    <Icon name='bomb' size='huge' color='black'/>
                    <h3>Obstacle</h3>
                </div>
                <div className={className('Solve')} onClick={()=>handleMazeRequests('solve',mazeId,solveRequestId,dispatch)}>
                    <Icon name='lightbulb' size='huge' color='violet'/>
                    <h3>Solve</h3>
                </div>
                <div className={className('Save')} onClick={()=>handleMazeRequests('save',mazeId,saveRequestId,dispatch)}>
                    <Icon name='plus' size='huge' color='green'/>
                    <h3>Save</h3>
                </div>
            </div>
            <Board mazeId={EmptyMaze.maze_id} maze={EmptyMaze.maze}/>
        </div>
        
    )
}
