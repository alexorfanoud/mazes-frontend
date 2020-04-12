 const getStateElement = (state,path) => {
    for(let i=0;i<path.length;i++){
        if(!state) return null;
        state=state[path[i]]
    }
    return state
}
let state = {
    Mazes:{
        requests:{
            maze1:{
                req1:{status:'solved'}
            }
        },
        interactions:{

        }
    }
}
console.log(getStateElement(state,['Mazes','requests','maze1']))