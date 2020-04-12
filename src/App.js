import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import LoginPage from './components/Pages/Login/LoginPage'
import HomePage from './components/Pages/Home/HomePage'
import PlayPage from './components/Pages/Play/PlayPage'
import CreatePage from './components/Pages/Create/CreatePage'
import Navbar from './components/NavBar/Navbar'
import GuestRoute from './components/Routes/GuestRoute'
import UserRoute from './components/Routes/UserRoute'

import './App.css';

function App() {
//TODO, GET NEW TOKEN WHEN OLD EXPIRES
  return (
    <div className="App">
      <Router>
        <UserRoute path='/' component={Navbar} />
        <Switch>
          <UserRoute path='/' exact component={HomePage}/>
          <UserRoute path='/create' exact component={CreatePage}/>
          <UserRoute path='/maze/:id' exact component={PlayPage}/>
          <GuestRoute path='/login' exact component={LoginPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
