import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {v4 as uuidv4} from 'uuid'

import { LoginRequest } from '../../../actions/User/Authentication'
import { MazeRequest } from '../../../actions/Mazes/Requests'
import { SpiralMaze } from '../../../constants/Mazes'
import LoginForm from '../../Forms/Login/LoginForm'
import Board from '../../Board/Board'


export default function LoginPage() {

    const dispatch = useDispatch();
    const [requestId] = useState(uuidv4());
    const Request = useSelector(state=> !!state.Mazes.requests[SpiralMaze.maze_id] ? state.Mazes.requests[SpiralMaze.maze_id][requestId] : {}) //TODO FIX STATE SELECROT? UNDEFINED ?
    // const requestPayload = {
    //     mazeId : SpiralMaze.maze_id,
    //     requestId: requestId,
    //     request:'solve',
    //     algorithm:'BFS'
    // }
    const requestPayload = {
        path:[SpiralMaze.maze_id,requestId],
        info:{
            request:'solve',
            algorithm:'BFS',
        }
    }
    useEffect(()=>{
        if(Request.status==='resolved') console.log('solved');//TODO HANDLE SUCCESSFUL LOGINREQUEST->SOLVED-> ?
    },[Request])
    const onSubmit = (user) => {
        return dispatch(LoginRequest(user))
            .then(response => {
                dispatch(MazeRequest(requestPayload))
                //console.log(response)
            })
            
    }
    return (
        <Board maze={SpiralMaze.maze} mazeId={SpiralMaze.maze_id} Content={()=><LoginForm onSubmit={onSubmit}/>} contentSize={{hor:0.3, ver:0.5}} />
    )
}
