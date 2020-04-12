import {MAZE_REQUEST, MAZE_REQUEST_RESOLVE, MAZE_REQUEST_DELETE, MAZE_INTERACTION, MAZES_RECEIVED } from '../constants/ActionTypes'
import { updateState,deleteStateItem } from '../helpers/ReduxStore'

const initialState = {
    requests : {},
    interaction:{},
    mazeList:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case MAZE_REQUEST:
         return updateState(state,['requests',...payload.path],{...payload.info,status:'pending'})
    case MAZE_REQUEST_RESOLVE:
         return updateState(state,['requests',...payload.path],{...payload.info,status:'resolved'})
    case MAZE_REQUEST_DELETE:
         deleteStateItem(state,['requests',...payload.path]);
         return state
    case MAZE_INTERACTION:
        return updateState(state,['interaction',...payload.path],payload.info);
    case MAZES_RECEIVED:
        return {...state, mazeList:{...state.mazeList,...payload}}
    default:
        return state
    }
}



