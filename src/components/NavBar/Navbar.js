import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router'

import { LogoutRequest } from '../../actions/User/Authentication'

import './Navbar.css'
import { Icon } from 'semantic-ui-react'

export default function Navbar() {
    const history = useHistory();
    const location = useLocation()
    const dispatch = useDispatch();
    const [activeItem,setActiveItem] = useState(location.pathname)

    const urls = {
      'Home':'/',
      'Messages':'/messages',
      'Friends':'/friends',
      'Create':'/create'
    }
    const className = (item)=>{
        return 'nav-item' + (activeItem===urls[item] ? ' active' : '')
    };

    const handleItemClick = (option) => {
        history.push(`${urls[option]}`)
        setActiveItem(`${urls[option]}`)
    }
    const Logout = () => {
      dispatch(LogoutRequest())
        .catch(err => {
          console.log(err) //TODO DISPLAY MESSAGE ? 
        })
    }

    return (
        <div className='nav'>
            <div className={className('Home')} 
            onClick={()=>handleItemClick('Home')}
            name='Home'
            >
            <Icon name='home' size='large' />
                Home
            </div>
            <div className={className('Create')}
            onClick={() => handleItemClick('Create')}
            name='Create'>
            <Icon name='gg' size='large' />
                Create
            </div>
            <div className='nav-item'
            onClick={Logout}
            name='Logout'>
            <Icon name='log out' size='large' />
                Logout
            </div>
      </div>
    )
}
