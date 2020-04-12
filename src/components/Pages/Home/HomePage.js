import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { GetMazes } from '../../../actions/Mazes/Requests'
import MazeList from '../../MazeList/MazeList'

export default function HomePage() {
    const dispatch = useDispatch();
    const [mazeList,setMazeList] = useState([])
    useEffect(()=>{        
        dispatch(GetMazes())
            .then(response => {
                setMazeList(response.data)
            })
            .catch(e => {
                console.log(e) //TODO CATCH ERROR   
            })
    },[dispatch])
    return (
        <MazeList mazeList={mazeList} />
        
    )
}
