import { MAZE_REQUEST, MAZE_REQUEST_RESOLVE} from '../../constants/ActionTypes'

export const MazeRequest = (payload) => ({
    type: MAZE_REQUEST,
    payload
})

export const MazeRequestResolve = (payload) => ({
    type: MAZE_REQUEST_RESOLVE,
    payload
})