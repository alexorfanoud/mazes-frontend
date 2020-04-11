const deleteStateItem = (state,endpoints) => {//['mazes','request']delete obj[path.pop()];
    for(let i=0;i<endpoints.length-1;i++){
        state=state[endpoints[i]]
    }
    delete state[endpoints.pop()]
    // delete endpoints.slice(0,endpoints.length-1).reduce((acc,endpoint)=>(
    //     acc[endpoint]
    // ),state)[endpoints[endpoints.length-1]]
    return state
}

let state = {'user':{'1':1,'2':2}, 'mazes':{'request':{'1':1,'2':2}}}
;
//delete state['mazes']['request']['1']
console.log(deleteStateItem(state,['mazes','request']))
console.log(state)