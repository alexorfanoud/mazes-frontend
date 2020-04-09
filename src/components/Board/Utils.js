import React from 'react'

import { BoxTypes } from '../../constants/BoxTypes'
import Box from '../Box/Box'



export const Boxify = (type, animDuration, animDelay) => (
    <Box
        type={BoxTypes(type)}
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