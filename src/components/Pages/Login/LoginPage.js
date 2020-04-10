import React from 'react'

import { SpiralMaze } from '../../../constants/Mazes'
import LoginForm from '../../Forms/Login/LoginForm'
import Board from '../../Board/Board'

export default function LoginPage() {
    const onSubmit = () => {
        console.log('submit')
    }
    return (
        <Board maze={SpiralMaze.maze} Content={()=><LoginForm onSubmit={onSubmit}/>} contentSize={{hor:0.3, ver:0.4}} />
    )
}
