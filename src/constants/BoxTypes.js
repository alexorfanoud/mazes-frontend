export const BoxTypes = (type) => {
    switch(type){
        case '.' : return 'empty';
        case 'X' : return 'obstacle';
        case 'S' : return 'start';
        case 'T' : return 'target';
        case 'V' : return 'visited';
        case 'V_A' : return 'visited-animated';
        case 'P' : return 'path'
        default : return 'empty'
    }
}
   