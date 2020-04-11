import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'

import Board from '../../Board/Board'
import { EmptyMaze } from '../../../constants/Mazes'

import './CreatePage.css'
import { Icon } from 'semantic-ui-react'

export default function CreatePage() {

    const [activeItem,setActiveItem] = useState()
    const dispatch=useDispatch();
    
    const handleClick = (name) => {
       
        setActiveItem(name);
        //dispatch(MazeInteract(name))
    }
    return (
        <div className='canvas-container'>
            <div className='sidebar'>
                <div className='sidebar-item' onClick={()=>handleClick('start')}>
                    <Icon name='flag' size='huge' color='olive'/>
                    <h3>Start</h3>
                </div>
                <div className='sidebar-item'>
                    <Icon name='crosshairs' size='huge' color='red'/>
                    <h3>Target</h3>
                </div>
                <div className='sidebar-item'>
                    <Icon name='bomb' size='huge' color='black'/>
                    <h3>Obstacle</h3>
                </div>
                <div className='sidebar-item'>
                    <Icon name='lightbulb' size='huge' color='yellow'/>
                    <h3>Solve</h3>
                </div>
                <div className='sidebar-item'>
                    <Icon name='plus' size='huge' color='green'/>
                    <h3>Save</h3>
                </div>
            </div>
            <Board mazeId={EmptyMaze.maze_id} maze={EmptyMaze.maze}/>
        </div>
        
    )
}
