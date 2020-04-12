import { MAZE_INTERACTION } from '../../constants/ActionTypes'
import { MAZE_REQUEST, MAZE_REQUEST_RESOLVE, MAZE_REQUEST_DELETE } from '../../constants/ActionTypes'

export const MazeRequest = (payload) => ({
    type: MAZE_REQUEST,
    payload
})

export const MazeRequestResolve = (payload) => ({
    type: MAZE_REQUEST_RESOLVE,
    payload
})

export const MazeRequestDelete = (payload) => ({
    type: MAZE_REQUEST_DELETE,
    payload
})

export const MazeInteraction = (payload) => ({
    type: MAZE_INTERACTION,
    payload
})
