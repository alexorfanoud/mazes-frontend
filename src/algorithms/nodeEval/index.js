import {heur} from './heuristics'

export const evaluate = (algorithm) => {
    switch (algorithm) {
        case 'BFS':
            return (node,distances) => distances.get(node)              
        case 'BF':
            return (node,distances,target,size) => heur('MANH',node,target,size) 
        case 'ASTAR':
            return (node,distances,target,size) => distances.get(node)+heur('MANH',node,target,size)
        case 'slide':
            return (node,distances,target,size) => distances.get(node)  //BFS APPROACH
        default:
            break;
    }
}