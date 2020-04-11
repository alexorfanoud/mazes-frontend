import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {v4 as uuidv4} from 'uuid'

import { LoginRequest } from '../../../actions/User/Authentication'
import { MazeRequest } from '../../../actions/Mazes/Requests'
import { SpiralMaze } from '../../../constants/Mazes'
import LoginForm from '../../Forms/Login/LoginForm'
import Board from '../../Board/Board'


export default function LoginPage() {

    const dispatch = useDispatch();
    const [requestId] = useState(uuidv4());
    console.log(requestId);
    const requestPayload = {
        mazeId : SpiralMaze.maze_id,
        requestId: requestId,
        request:'solve',
        algorithm:'BFS'
    }
    const onSubmit = (user) => {
        return dispatch(LoginRequest(user))
            .then(response => {
                dispatch(MazeRequest(requestPayload))

                //dispatch(MazeRequest(SpiralMaze.maze_id, requestId, 'solve', 'BFS'))
                //dispatch(requestmaze('solve',id,algorithm))
                console.log(response)
            })
            
    }
    return (
        <Board maze={SpiralMaze.maze} Content={()=><LoginForm onSubmit={onSubmit}/>} contentSize={{hor:0.3, ver:0.5}} />
    )
}
