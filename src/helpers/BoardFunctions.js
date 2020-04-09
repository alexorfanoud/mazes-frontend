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