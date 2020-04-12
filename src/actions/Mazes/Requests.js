import axios from 'axios'

import { MAZES_RECEIVED } from '../../constants/ActionTypes' 

export const AddMaze = (maze) => (
    dispatch => (
        axios.post('/mazes',{maze:maze})
            .then(response=>{
                dispatch(AddAvailableMazes(response.data.reduce((acc,mazeElem) => {
                        acc[mazeElem.Id] = mazeElem.maze;
                        return acc
                },{})))
                return response
            })
            
    )
)

export const GetMazes = (id) => (
    dispatch => (
        axios.get(`/mazes/${!!id ? id : ''}`)
            .then(response=>{
                dispatch(AddAvailableMazes(response.data.reduce((acc,mazeElem) => {
                    acc[mazeElem.Id] = mazeElem.maze;
                    return acc
                },{})))
                return response
            })
            
    )
)

export const AddAvailableMazes = (payload) => ({
    type: MAZES_RECEIVED,
    payload:payload
})