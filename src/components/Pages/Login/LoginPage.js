import React from 'react'
import { useDispatch } from 'react-redux'

import { LoginRequest } from '../../../actions/User/Authentication'
import { SpiralMaze } from '../../../constants/Mazes'
import LoginForm from '../../Forms/Login/LoginForm'
import Board from '../../Board/Board'


export default function LoginPage() {
    const dispatch = useDispatch();
    const onSubmit = (user) => {
        return dispatch(LoginRequest(user))
            .then(response => {
                console.log(response)
            })
            .catch(err=>console.log(err))
    }
    return (
        <Board maze={SpiralMaze.maze} Content={()=><LoginForm onSubmit={onSubmit}/>} contentSize={{hor:0.3, ver:0.4}} />
    )
}
