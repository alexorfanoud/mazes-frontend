export const horizontalPartitionArray = (arr,partitions) =>{
    let res = [],index=0;
    if(typeof(partitions)==='object'){
        partitions.map(partition => {
            res.push(arr.slice(index,index+partition));
            index+=partition;
            return partition
        })
    }
    else {
        for(let i=0;i<arr.length;i+=partitions){
            res.push(arr.slice(i,i+partitions))
        }
    }
    return res;
}
export const verticalPartitionArray = (arr,partitions) => {
    let res = Array(partitions.length).fill([]),partitionsIndex=0;
    if(typeof(partitions)==='object'){
        while(arr.length > 0){
            res[partitionsIndex] = res[partitionsIndex].concat(arr.splice(0,partitions[partitionsIndex]));
            partitionsIndex=(partitionsIndex+1)%partitions.length
        }
        
    }

    return res;
}