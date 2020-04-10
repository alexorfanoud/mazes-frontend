import React from 'react'
import PropTypes from 'prop-types'

import './InlineMessage.css'

export default function InlineMessage({text}) {
    return (
        <span className='inline-message'>{text}</span>
    )
}

InlineMessage.propTypes = {
    text:PropTypes.string.isRequired,
}