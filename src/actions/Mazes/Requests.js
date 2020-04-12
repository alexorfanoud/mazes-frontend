import axios from 'axios'

export const AddMaze = (maze) => (
    dispatch => (
        axios.post('/mazes',{maze:maze})
            .then(response=>{
                console.log(response)
            })
            
    )
)