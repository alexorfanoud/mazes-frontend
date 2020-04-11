import axios from 'axios'
import { LOGIN_SUCCESS } from '../../constants/ActionTypes'

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
