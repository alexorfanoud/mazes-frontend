import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'
import {v4 as uuidv4} from 'uuid'

import { LoginRequest, LoginSuccess } from '../../../actions/User/Authentication'
import { MazeRequest, MazeRequestDelete } from '../../../actions/Mazes/Requests'
import { SpiralMaze } from '../../../constants/Mazes'
import LoginForm from '../../Forms/Login/LoginForm'
import Board from '../../Board/Board'


export default function LoginPage() {

    const dispatch = useDispatch();
    const [requestId] = useState(uuidv4());
    const [userOpts,setUserOpts] = useState({})
    const Request = useSelector(state=> !!state.Mazes.requests[SpiralMaze.maze_id] ? state.Mazes.requests[SpiralMaze.maze_id][requestId] : {}) //TODO FIX STATE SELECROT? UNDEFINED ?

    const requestPayload = {
        path:[SpiralMaze.maze_id,requestId],
        info:{
            request:'solve',
            algorithm:'BFS',
        }
    }

    useEffect(()=>{
        if( !!Request && Request.status==='resolved') {
            batch(()=>{
                dispatch(MazeRequestDelete(requestPayload));
                dispatch(LoginSuccess(userOpts))
            })
            
        }
    },[Request,dispatch,userOpts,requestPayload])

    const onSubmit = (user) => {
        return dispatch(LoginRequest(user))
            .then(response => {
                dispatch(MazeRequest(requestPayload))
                setUserOpts(response.data)
            })
            
    }
    return (
        <Board maze={SpiralMaze.maze} mazeId={SpiralMaze.maze_id} Content={()=><LoginForm onSubmit={onSubmit}/>} contentSize={{hor:0.37, ver:0.5}} />
    )
}
