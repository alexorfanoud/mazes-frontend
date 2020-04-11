import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from './Reducers/index.js'

const store = createStore(
    RootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store


export const updateState = (state,endpoints,payload) => {
    if(endpoints.length === 0 ) return payload;
    else {
        let currentEndpoint = endpoints.shift();
        if(!!state) return {...state,[currentEndpoint]:updateState(state[currentEndpoint],endpoints,payload)}
        else return {[currentEndpoint]:updateState({},endpoints,payload)}
    }
     
}

export const deleteStateItem = (state,endpoints) => {
    for(let i=0;i<endpoints.length-1;i++){
        state=state[endpoints[i]]
    }
    delete state[endpoints.pop()]
    return state
}