export default class HashMap {
    constructor(){
       this.map = {};
    }
    set = (key,value) => {
        this.map[JSON.stringify(key)] = value;
        return this.map
    }
    has = (key) => !!this.map[JSON.stringify(key)]
    entries = () => (
        Object.keys(this.map).map( key => [key,this.map[key]])
    )
    get = (key) => (this.map[JSON.stringify(key)])
    delete = (key) => (delete this.map[JSON.stringify(key)])
}