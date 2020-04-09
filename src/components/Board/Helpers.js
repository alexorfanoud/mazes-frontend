import React from 'react'

import { BoxTypes } from '../../constants/BoxTypes'
import Box from '../Box/Box'

export const indexToCords = (index,gridSize) => ({i:Math.floor(index/gridSize) ,j: index%gridSize});

export const cordsToIndex = (i,j, gridSize) => (i*gridSize + j) 

export const Point = (i,j) => (
    {
        i:i,
        j:j
    }
)

export const edgeNode = (node, gridSize) => {
    const {i,j} = node;
    return i === 0 || j===0 || i===gridSize - 1 || j===gridSize -1;
}

export const Boxify = (type, animDuration, animDelay) => (
    <Box
        type={BoxTypes[type]}
        animationDuration={!!animDuration ? animDuration : 0}
        animationDelay={!!animDelay ? animDelay : 0}
    />
)

export const RowStyle = (gridSize) => ({
    height:`${100/gridSize}%`
})

export const ColumnStyle = (gridSize) => ({
    width:`${100/gridSize}%`
})