import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import {v4 as uuidv4} from 'uuid'

import { LoginRequest, LoginSuccess } from '../../../actions/User/Authentication'
import { MazeRequest, MazeRequestDelete } from '../../../actions/Mazes/Interactions'
import { SignupMaze } from '../../../constants/Mazes'
import LoginForm from '../../Forms/Login/LoginForm'
import Board from '../../Board/Board'
import { getStateElement } from '../../../helpers/ReduxStore'


export default function LoginPage() {

    const dispatch = useDispatch();
    const [requestId] = useState(uuidv4());
    const [userOpts,setUserOpts] = useState({})
    const RequestStatus = useSelector(state=> getStateElement(state,['Mazes','requests',SignupMaze.maze_id,requestId,'status']))
    const requestPayload = {
        path:[SignupMaze.maze_id,requestId],
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
        return dispatch(LoginRequest(user))
            .then(response => {
                dispatch(MazeRequest(requestPayload))
                setUserOpts(response.data)
            })
            
    }
    return (
        <Board maze={SignupMaze.maze} mazeId={SignupMaze.maze_id} Content={()=><LoginForm onSubmit={onSubmit}/>} contentSize={{hor:0.37, ver:0.5}} />
    )
}
