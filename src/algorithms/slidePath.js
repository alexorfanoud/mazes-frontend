import { Point } from '../helpers/BoardFunctions'


export const linePath = (source,target) => {

    let [srcRow,srcCol] = [source.i,source.j]
    let [trgtRow,trgtCol] = [target.i,target.j]
    let res = [];

    if(srcRow === trgtRow) {
        let stepCol = srcCol < trgtCol ? 1 : -1;
        while(srcCol !== trgtCol){
            
            srcCol=srcCol+stepCol;
        res.push(Point(srcRow,srcCol))
        }
        return res;
    }

    else if (srcCol === trgtCol){
        let stepRow = srcRow < trgtRow ? 1 : -1;
        while(srcRow !== trgtRow){
            
            srcRow=srcRow+stepRow;
        res.push(Point(srcRow,srcCol))
        }
        return res;
    }

    return res;
}