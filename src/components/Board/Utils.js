import React from 'react'

import Box from '../Box/Box'



export const Boxify = (gridNode) => (
    <Box
        type={ gridNode.type }
        animationDuration={ gridNode.animDuration }
        animationDelay={ gridNode.animDelay }
    />
)

export const RowStyle = (gridSize) => ({
    height:`${100/gridSize}%`
})

export const ColumnStyle = (gridSize) => ({
    width:`${100/gridSize}%`
})

export const contentStyle = (contentSize, gridSize) => ({
    height:`${100*contentSize.ver}%`,
    width: `${100*contentSize.hor}%`,
    top: `${50*(gridSize-gridSize*contentSize.ver)/gridSize}%`,
    left: `${50*(gridSize-gridSize*contentSize.hor)/gridSize}%`,
})