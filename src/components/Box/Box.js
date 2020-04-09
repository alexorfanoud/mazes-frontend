import React, { useState, useEffect } from 'react'

import './Box.css'

export default function Box({type,animationDuration,animationDelay}) {

    const [className,setClassName] = useState(`box ${type}`)
    useEffect(()=>{
        setClassName(`box ${type}`)
    },[type])
    return (
        <div className={className}>
            {type}
        </div>
    )
}
