export const heur = (algorithm,start,target) => {
    
    const distx = start.j-target.j;
    const disty = start.i-target.i;
    switch (algorithm) {
        case 'MANH':
            return Math.abs(distx)+Math.abs(disty)
        case 'EUCL':
            return Math.sqrt( Math.pow(distx,2)+Math.pow(disty,2))
        default:
            return 0;
    }
}
