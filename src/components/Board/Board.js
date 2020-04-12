import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { Boxify, RowStyle, ColumnStyle, contentStyle } from './Utils'
import { cordsToIndex, Point, mapInputToGrid, generateGrid, gridNode, randomPositionGenerator, nodeEquals, edgeNode,  } from '../../helpers/BoardFunctions'
import { pathfinder } from '../../algorithms/pathfinder'
import { MazeRequestResolve } from '../../actions/Mazes/Interactions'

import './Board.css'
import { adjacent } from '../../algorithms/adjacent'
import { useHistory } from 'react-router'


export default function Board({maze, mazeId, Content, contentSize}) {
    const mazeRequests = useSelector(state => state.Mazes.requests[mazeId]) //listen for solve/save requests 
    const mazeInteraction = useSelector(state => state.Mazes.interaction[mazeId])
    const dispatch = useDispatch();
    const history = useHistory();
    const difficulty = 100;
    const density = 1.2
    const defaultSize = 16;
    const [gridSize] = useState( !!maze ? Math.floor(Math.sqrt(maze.length)) + 2 : defaultSize)
    const [start,setStart] = useState(!!maze ? mapInputToGrid(maze.findIndex(el => el==='S'),gridSize):randomPositionGenerator(gridSize));

    const [grid,setGrid] = useState(
        !!maze ? generateGrid(maze,gridSize):
        generateGrid(null,gridSize, start, density)
    )
    //set valid moves for play mode
    const [validMoves,setValidMoves] = useState(()=>(
        adjacent(start,grid,'slide')
    ))
    
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
    const getGridArray = useCallback(() => {
        return grid.reduce((acc,newRow,i) => (
            acc.concat(newRow.reduce((colAcc,col,j) => {
                if(edgeNode(Point(i,j),gridSize)) return colAcc
                switch(col.type){
                    case 'start' : return colAcc.concat('S');
                    case 'target' : return colAcc.concat('T');
                    case 'obstacle': return colAcc.concat('X');
                    default : return colAcc.concat('.')
                }
            },'')
            )
        ),'')
    },[grid,gridSize])

    const onClickBox = (box) => {        
        let gridcpy = grid.slice()
        if(!mazeInteraction || edgeNode(box)) return
        switch(mazeInteraction.mode){
            case 'Edit':
                switch(mazeInteraction.box){
                    case 'Start':
                        gridcpy[start.i][start.j] = gridNode('.')
                        gridcpy[box.i][box.j] = gridNode('S');
                        if(nodeEquals(target,box)) setTarget(Point(-1,-1))
                        setStart(box);
                        break;
                    case 'Target':
                        gridcpy[target.i][target.j] = gridNode('.')
                        gridcpy[box.i][box.j] = gridNode('T')
                        setTarget(box);
                        break;
                    case 'Obstacle':
                        
                        gridcpy[box.i][box.j] = 
                            gridcpy[box.i][box.j].type==='empty' ||
                            gridcpy[box.i][box.j].type==='visited'||
                            gridcpy[box.i][box.j].type==='path' ? gridNode('X')
                            :gridcpy[box.i][box.j].type==='obstacle' ? gridNode('.')
                            :gridcpy[box.i][box.j]
                        break;
                    default : break;
                }
                break;
            case 'Play':
                if(validMoves.findIndex(el => nodeEquals(el,box)) >= 0){
                    if(nodeEquals(box,target)) history.push('/') //TODO HANDLE WIN
                    gridcpy[box.i][box.j]=gridNode('S');
                    gridcpy[start.i][start.j]=gridNode('.');
                    setStart(box)
                    setValidMoves(adjacent(box,grid,'slide'))
                };
                break;
            default: break;
        }
        return setGrid(gridcpy);
    }
 
    const Solve = useCallback(async (algorithm) => {
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
        
    },[start,target,grid])

    useEffect(()=>{                                 //if there are existing requests, handle them
        async function handleRequests () {            
                for (let key in mazeRequests){
                    if(mazeRequests[key].request==='solve'){
                        mazeRequests[key].request='handled'
                        await Solve(mazeRequests[key].algorithm) 
                        dispatch(MazeRequestResolve({
                            path:[mazeId,key]
                        }))
                    }
                    else if(mazeRequests[key].request==='save'){
                        mazeRequests[key].request='handled'
                        console.log(getGridArray())
                        dispatch(MazeRequestResolve({
                            path:[mazeId,key],
                            info:{
                                maze:getGridArray()
                            }
                        }))
                    }
                    
                    
                }            
        }
        if(!!mazeRequests && Object.keys(mazeRequests).length > 0) handleRequests()  
    }, [mazeRequests,Solve,getGridArray,dispatch,mazeId])

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
                                    <div className='board-column' style={ColumnStyle(gridSize)} key={cordsToIndex(i,j,gridSize)} onClick={()=>onClickBox(Point(i,j))}>
                                        {Boxify(col)}
                                    </div>
                                ))
                            }
                        </div>
                    ))}
            </div>
        </div>
        
    )
}

Board.propTypes= {
    maze:PropTypes.array,
    mazeId:PropTypes.string.isRequired,
}