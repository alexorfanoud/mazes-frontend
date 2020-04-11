import { combineReducers } from 'redux'
import UserReducer from './Users'
import MazeReducer from './Mazes'


export default combineReducers({
    'Users':UserReducer,
    'Mazes':MazeReducer
})