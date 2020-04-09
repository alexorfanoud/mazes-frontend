 const Point = (i,j) => (
    {
        i:i,
        j:j
    }
)
class Priority_queue {
    constructor(){
        this.queue = [];
        this.values = new Map();
        
    }

    push = (elem, val) => {
        let low = 0, high = this.queue.length-1, middle;
        if(val < this.values.get(this.queue[low])) {this.queue.unshift(elem);this.values.set(elem,val); return this.queue;}
        if(val >= this.values.get(this.queue[high])) {this.queue.push(elem);this.values.set(elem,val); return this.queue;}
        while( low < high ) {
            middle = Math.floor((low+high)/2);
            if( val >= this.values.get(this.queue[middle])) low = middle + 1 ;
            else high = middle; 
        }
        this.queue.splice(low,0,elem);
        this.values.set(elem,val);
        return this.queue
    }

    shift = () => {
        let top = this.queue.shift();
        this.values.delete(top);
        return top;
    }
    length = () => (this.queue.length)
}
let test = new Priority_queue();
let arr = [Point(0,0),Point(0,1),Point(1,0)]
arr.map((el,index) => test.push(el,index));
console.log(test.queue)
