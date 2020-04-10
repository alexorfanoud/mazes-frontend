import {evaluate} from './nodeEval/index'
import {adjacent} from './adjacent/index'
import {linePath} from './slidePath'
import Priority_queue from '../dataStructures/PriorityQueue'
import HashMap from '../dataStructures/HashMap'

import { nodeEquals } from '../helpers/BoardFunctions'


export const pathfinder = (start,target,grid,algorithm) => {
    
    let visited = [], path = [], current;
    let distances = new HashMap(); distances.set(start,0);
    let previous = new HashMap(); previous.set(start,-1);
    let nodeEvaluation = (node) => evaluate(algorithm)(node,distances,target,grid.length);
    let toVisit = new Priority_queue();
    toVisit.push(start,nodeEvaluation(start))

    while( toVisit.length() > 0 ){
        current  = toVisit.shift();
        if(nodeEquals(current,target)){
            while( !nodeEquals(current,start)){
                algorithm==='slide' ? path = linePath(previous.get(current),current).concat(path):
                path.unshift(current);
                current = previous.get(current);
                
            };
            visited.shift(); path.pop();
            return { visited: visited, path:path}
        }
        visited.push(current);
        adjacent(current,grid,algorithm).map( adj => {
            
            if(!previous.has(adj)){
                previous.set(adj,current); 
                distances.set(adj,distances.get(current)+1)
                toVisit.push(adj,nodeEvaluation(adj))
            }
            return adj
        })
    }
    return { visited: visited, path:path}

}




