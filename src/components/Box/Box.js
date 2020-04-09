import React, { useState } from 'react'

import './Box.css'

export default function Box({type,animationDuration,animationDelay}) {

    const [className,setClassName] = useState('box'+` ${type}`)

    return (
        <div className={className}>
            
        </div>
    )
}
