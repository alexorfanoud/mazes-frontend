import {BoxTypes} from '../constants/BoxTypes'

export const indexToCords = (index,gridSize) => ({i:Math.floor(index/gridSize) ,j: index%gridSize});

export const cordsToIndex = (i,j, gridSize) => (i*gridSize + j) 

export const nodeToIndex = (node, gridSize) => cordsToIndex(node.i,node.j,gridSize);

export const nodeEquals = (n1,n2) => (n1.i===n2.i && n1.j===n2.j)

export const Point = (i,j) => (
    {
        i:i,
        j:j
    }
)

export const edgeNode = (node, gridSize) => {
    const {i,j} = node;
    return i === 0 || j===0 || i===gridSize - 1 || j===gridSize -1;
}

export const mapInputToGrid = (index,gridSize) => {
    let previousCords = indexToCords(index,gridSize-2);
    return Point(previousCords.i+1,previousCords.j+1)
}

export const randomPositionGenerator = (gridSize) => {
    let i = Math.floor(Math.random() * (gridSize - 2) + 1);
    let j = Math.floor(Math.random() * (gridSize - 2) + 1);
    return Point(i,j)
    }

export const gridNode = (type, duration, delay) => ({
    type: BoxTypes(type),
    animDuration : !!duration ? duration : 0,
    animDelay : !!delay ? delay : 0
})

export const generateGrid = ( maze, gridSize, start, density) => (
    !!maze ? 
    Array(gridSize).fill().map( (_,i) => (
        Array(gridSize).fill().map( (_,j) => (
            edgeNode(Point(i,j),gridSize) ? gridNode('X') :
            gridNode(maze[cordsToIndex(i-1,j-1,gridSize - 2)])
        ))
    ))
    :
    Array(gridSize).fill().map( (_,i) => (
        Array(gridSize).fill().map( (_,j) => (
            edgeNode(Point(i,j),gridSize) ? gridNode('X') :
            nodeEquals(Point(i,j),start) ? gridNode('S'):
            Math.floor(Math.random() * density)===1 ? gridNode('X') :
            gridNode('.')
        ))
    ))
)