import axios from 'axios'
import { LOGIN_SUCCESS,LOGOUT_SUCCESS } from '../../constants/ActionTypes'

export const LoginRequest = (user) => (
    dispatch => (
        axios.post('/auth/login', {...user})
            .then( response => {
                localStorage.user = JSON.stringify(response.data);
                axios.defaults.headers.common['authorisation'] = response.data.token
                return response
            })
    )
)

export const LoginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
})


export const LogoutRequest = () => (
    dispatch => (
        axios.post('/auth/logout')
            .then( response => {
                console.log(response)
                localStorage.removeItem('user')
                delete axios.defaults.headers.common['authorisation']
                dispatch(LogoutSuccess())
                return response
            })
    )
)

export const LogoutSuccess = () => ({
    type:LOGOUT_SUCCESS
})