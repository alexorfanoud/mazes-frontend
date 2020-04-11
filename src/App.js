import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'

import LoginPage from './components/Pages/Login/LoginPage'
import GuestRoute from './components/Routes/GuestRoute'
import UserRoute from './components/Routes/UserRoute'

import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <UserRoute path='/' exact component={()=><div>hello</div>}/> {/*homepage */}
        <GuestRoute path='/login' exact component={LoginPage}/>
      </Router>
    </div>
  );
}

export default App;
