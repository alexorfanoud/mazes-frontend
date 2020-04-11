const initialState = !!localStorage.user ? JSON.parse(localStorage.user) : {}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'LOGIN_SUCCESS':
        return { ...state, ...payload }

    default:
        return state
    }
}
