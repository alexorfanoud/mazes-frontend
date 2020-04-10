import React from 'react'

import { BoxTypes } from '../../constants/BoxTypes'
import Box from '../Box/Box'

export const gridNode = (type, duration, delay) => ({
    type: BoxTypes(type),
    animDuration : !!duration ? duration : 0,
    animDelay : !!delay ? delay : 0
})

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

