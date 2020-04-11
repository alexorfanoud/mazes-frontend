import {MAZE_REQUEST, MAZE_REQUEST_RESOLVE, MAZE_REQUEST_DELETE } from '../constants/ActionTypes'
import { updateState,deleteStateItem } from '../Store'

const initialState = {
    requests : {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case MAZE_REQUEST:
         return updateState(state,['requests',...payload.path],{...payload.info,status:'pending'})
    case MAZE_REQUEST_RESOLVE:
         return updateState(state,['requests',...payload.path],{status:'resolved'})
    case MAZE_REQUEST_DELETE:
         deleteStateItem(state,['requests',...payload.path]);
         return state
//TODO : CREATE FUNCTIONS TO HANDLE THE STATE CHANGES
    default:
        return state
    }
}



