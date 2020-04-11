import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { Boxify, RowStyle, ColumnStyle, contentStyle } from './Utils'
import { cordsToIndex, edgeNode, Point, mapInputToGrid, generateGrid, gridNode, randomPositionGenerator, nodeEquals,  } from '../../helpers/BoardFunctions'
import { pathfinder } from '../../algorithms/pathfinder'
import { MazeRequestResolve } from '../../actions/Mazes/Requests'

import './Board.css'


export default function Board({maze, mazeId, Content, contentSize}) {
    const requests = useSelector(state => state.Mazes.requests[mazeId]) //listen for solve/save requests //TODO STATE SELECTOR NEEDS FIX? UNDEFINED AT START?
    const dispatch = useDispatch();
    const difficulty = 100;
    const density = 1.2
    const defaultSize = 16;
    const [gridSize,setGridSize] = useState( !!maze ? Math.floor(Math.sqrt(maze.length)) + 2 : defaultSize)
    const [start,setStart] = useState(!!maze ? mapInputToGrid(maze.findIndex(el => el==='S'),gridSize):randomPositionGenerator(gridSize));
    const [grid,setGrid] = useState(
        !!maze ? generateGrid(maze,gridSize):
        generateGrid(null,gridSize, start, density)
    )
    const [target,setTarget] = useState(
        !!maze ? mapInputToGrid(maze.findIndex(el => el==='T'),gridSize):
        () => {
            const visited = pathfinder(start,Point(-1,-1),grid,'slide').visited
            const targetPos = visited[Math.floor((visited.length-1) *(difficulty/100))];
            let gridcpy = grid.slice();
            gridcpy[targetPos.i][targetPos.j] = gridNode('T')
            setGrid(gridcpy);
            return targetPos;
        }
    );


    const Solve = useCallback(async (algorithm,requestId) => {
        let gridcpy_visited = grid.slice();
        let gridcpy_path = grid.slice();
        const { visited, path } = pathfinder(start,target,gridcpy_visited,algorithm)
        visited.map((vis,order) => {
            gridcpy_visited[vis.i][vis.j] = gridNode(
                'V_A',                  //type
                1,                      //duration (in s)
                order/visited.length    //delay (in s)
            );
            return 0;
        });
        setGrid(gridcpy_visited)
        await new Promise(resolve => {
            setTimeout(resolve,2000) // wait for visited animation to finish
        })
        visited.map(vis => {
            gridcpy_path[vis.i][vis.j] = gridNode(
                'V', 0, 0
            )
            return 0;
        })
        path.map((s_path,order) => {
            if(!nodeEquals(s_path,target)) {
                gridcpy_path[s_path.i][s_path.j] = gridNode(
                    'P', 1, order/path.length
                )
            }
            return 0;
        }) 
        setGrid(gridcpy_path);
        await new Promise(resolve => {
            setTimeout(resolve,(2000)) // wait for path animation to finish
        });
        dispatch(MazeRequestResolve({
            path:[mazeId,requestId]
        }))
    },[start,target,dispatch,mazeId,grid])

    useEffect(()=>{
        if(!!requests && Object.keys(requests).length > 0){ //if there are existing requests, handle them
            for (let key in requests){
                if(requests[key].request==='solve'){
                    requests[key].request='handled'
                    Solve(requests[key].algorithm,key)
                }
            }
        }        
    }, [requests,Solve])

    return (
        <div className='grid'>
            {!!Content && Object.keys(contentSize).length===2 &&
                <div className='custom-content' style={contentStyle(contentSize,gridSize)}>
                    {Content()}
                </div>
            }   
            <div className='board' >
                {
                    grid.map((row,i)=> (
                        <div className='board-row' style={RowStyle(gridSize)} key={i}>
                            {
                                row.map((col,j)=>(
                                    <div className='board-column' style={ColumnStyle(gridSize)} key={cordsToIndex(i,j,gridSize)}>
                                        {Boxify(col)}
                                    </div>
                                ))
                            }
                        </div>
                    ))}
                <button onClick={Solve}>solve</button>
            </div>
        </div>
        
    )
}

Board.propTypes= {
    maze:PropTypes.array,
    mazeId:PropTypes.string.isRequired,
}