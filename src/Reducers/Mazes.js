import {MAZE_REQUEST} from '../constants/ActionTypes'

const initialState = {

}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case MAZE_REQUEST:
        return { ...state, requests : {...state.requests, [payload.mazeId]:[{requestId:payload.requestId, request:payload.request, status:'pending'}]} }

    default:
        return state
    }
}
