import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

export default function GuestRoute({component:Component,...rest}) {
    const loggedIn = useSelector(state=>!!state.Users.token)
    
    return (
        <Route {...rest} render={props => !loggedIn ? <Component {...props} /> : <Redirect to='/' />} />
    )
}


GuestRoute.propTypes = {
    component:PropTypes.func.isRequired,
}