import { Point } from '../../helpers/BoardFunctions'


export const adjacent = (node, grid, algorithm) => {
    if(!node) return
    let res = [];
   const { i, j} = node;
    let right = j, left = j, top = i, bottom = i;
    switch (algorithm) {
        case 'slide':
            while(grid[i][right].type!=='obstacle') {
                right++;
            }
            res.push( Point(i,right-1))
            while( grid[i][left].type!=='obstacle' ) {
                left--;
            }
            res.push( Point(i,left+1))
            while( grid[bottom][j].type!=='obstacle') {
                bottom++;
            }
            res.push( Point(bottom-1,j) )
            while( grid[top][j].type!=='obstacle') {
                top--;
            }
            res.push( Point(top+1,j))
            break;
    
        default:
            if(i < grid.length && grid[i+1][j].type!=='obstacle') res.push(Point(i+1,j))
            if(j < grid.length && grid[i][j+1].type!=='obstacle') res.push(Point(i,j+1))
            if(i > 0 && grid[i-1][j].type!=='obstacle') res.push(Point(i-1,j))
            if(j > 0 && grid[i][j-1].type!=='obstacle') res.push(Point(i,j-1))
    }
    
    return res;
}