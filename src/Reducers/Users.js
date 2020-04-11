import { LOGIN_SUCCESS,LOGOUT_SUCCESS } from '../constants/ActionTypes'

const initialState = !!localStorage.user ? JSON.parse(localStorage.user) : {}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case LOGIN_SUCCESS:
        return { ...state, ...payload }
    case LOGOUT_SUCCESS:
        return {}

    default:
        return state
    }
}
