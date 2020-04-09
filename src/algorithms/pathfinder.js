import {evaluate} from './nodeEval/index'
import {adjacent} from './adjacent/index'
import {linePath} from './slidePath'
import Priority_queue from '../dataStructures/PriorityQueue'

import {  Point, nodeEquals } from '../helpers/BoardFunctions'


// export const pathfinder = (arr, src, target, alg) => {
//     //------variables------------//    
//     let gridSize = Math.floor(arr.length); 
//     let dist = Array(arr.length).fill().map( () => Array(arr.length).fill(0));
//     let previous = Array(arr.length).fill().map( () => Array(arr.length).fill(Point(-1,-1)));
//     let evaluateNode = evaluate(alg)
//     let to_visit = new Priority_queue(), visited=[], path=[], current;
//     to_visit.push(cordsToIndex(src))
//     //-----algorithm----------//
//     while(to_visit.length() > 0){
        
//         current = to_visit.shift();
//         visited.push(current);
//         if(current.i === target.i && current.j===target.j ) {
            
//                 while(current.i!==src.i || current.j!==src.j){
//                     if(alg==='slide'){
//                         path = linePath(previous[current.i][current.j],current,gridSize).concat(path)
//                     }
//                     else {
//                         path.unshift(current);
//                     }
//                     current = previous[current];
//                 }            
//             return {visited:visited,path:path}
//         }

//         adjacent(current,gridSize,arr,alg).map( adj => {
//             if(arr[adj].type!=='obstacle' && previous[adj]===0 && adj!==src) {
//                 previous[adj] = current;
//                 dist[adj]=dist[current]+1;
//                 to_visit.push(adj,evaluateNode(adj,dist,target,gridSize));
                
//                 }
//                 return adj
//         })
//     }

//     return {visited:visited,path:path}
// }

export const pathfinder = (start,target,grid,algorithm) => {
    
    let visited = [], path = [], current;
    let distances = new Map(); distances.set(start,0);
    let previous = new Map(); previous.set(start,-1);
    let nodeEvaluation = (node) => evaluate(algorithm)(node,distances,target,grid.length);
    let toVisit = new Priority_queue();
    toVisit.push(start,nodeEvaluation(start))

    while( toVisit.length() > 0 ){
        current  = toVisit.shift();
        console.log('current',current)
        if(nodeEquals(current,target)){

            return { visited: visited, path:path}
        }
        visited.push(current);
        adjacent(current,grid,algorithm).map( adj => {
            console.log('adj',adj);
            console.log('previous.has',previous.has(adj))
            if(!previous.has(adj)){
                previous.set(adj,current); 
                distances.set(adj,distances.get(current)+1)
                toVisit.push(adj,nodeEvaluation(adj))
            }
            return adj
        })
    }

}




