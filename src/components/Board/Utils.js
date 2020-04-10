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

