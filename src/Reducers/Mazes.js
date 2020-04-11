import {MAZE_REQUEST, MAZE_REQUEST_RESOLVE} from '../constants/ActionTypes'

const initialState = {
    requests : {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case MAZE_REQUEST:
        return {...state,requests : {...state.requests, [payload.mazeId] : !!state.requests[payload.mazeId] ? {...state.requests[payload.mazeId],[payload.requestId]:{...payload,status:'pending'}} : {[payload.requestId]:{...payload,status:'pending'}}}}
    case MAZE_REQUEST_RESOLVE:
        return { ...state, requests : {...state.requests, [payload.mazeId]: {...state.requests[payload.mazeId],[payload.requestId]:{status:'resolved'}}  } }
//TODO : CREATE FUNCTIONS TO HANDLE THE STATE CHANGES
    default:
        return state
    }
}
