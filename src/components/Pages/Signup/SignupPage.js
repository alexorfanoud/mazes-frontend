import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import {v4 as uuidv4} from 'uuid'

import { SignupRequest, LoginSuccess } from '../../../actions/User/Authentication'
import { MazeRequest, MazeRequestDelete } from '../../../actions/Mazes/Interactions'
import { SpiralMaze } from '../../../constants/Mazes'
import SignupForm from '../../Forms/Signup/SignupForm'
import Board from '../../Board/Board'
import { getStateElement } from '../../../helpers/ReduxStore'


export default function SignupPage() {

    const dispatch = useDispatch();
    const [requestId] = useState(uuidv4());
    const [userOpts,setUserOpts] = useState({})
    const RequestStatus = useSelector(state=> getStateElement(state,['Mazes','requests',SpiralMaze.maze_id,requestId,'status']))
    const requestPayload = {
        path:[SpiralMaze.maze_id,requestId],
        info:{
            request:'solve',
            algorithm:'BFS',
        }
    }

    useEffect(()=>{
        if( RequestStatus==='resolved') {
            batch(()=>{
                dispatch(MazeRequestDelete(requestPayload));
                dispatch(LoginSuccess(userOpts))
            })
            
        }
    },[RequestStatus,dispatch,userOpts,requestPayload])

    const onSubmit = (user) => {
        return dispatch(SignupRequest(user))
            .then(response => {
                dispatch(MazeRequest(requestPayload))
                setUserOpts(response.data)
            })
            
    }
    return (
        <Board maze={SpiralMaze.maze} mazeId={SpiralMaze.maze_id} Content={()=><SignupForm onSubmit={onSubmit}/>} contentSize={{hor:0.37, ver:0.5}} />
    )
}
