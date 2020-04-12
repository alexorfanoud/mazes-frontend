 import { MazeRequest } from '../actions/Mazes/Interactions'

 export const handleMazeRequest = (request,mazeId,requestId,dispatch)=>{
        switch(request){
            case 'solve':
                dispatch(MazeRequest({
                    path:[mazeId,requestId],
                    info:{
                        request:'solve',
                        algorithm:'slide'
                    }
                }));
                return;
            case 'save':
                dispatch(MazeRequest({
                    path:[mazeId,requestId],
                    info:{
                        request:'save',
                    }
                }));
                return;
            default : return;
        }
    }