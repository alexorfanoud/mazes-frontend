import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/index'
import { Provider } from 'react-redux'
import axios from 'axios'

import './index.css';

axios.defaults.baseURL = 'http://localhost:8765'
axios.defaults.headers.common['authorisation'] = !!localStorage.user ? JSON.parse(localStorage.user).token : ''

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
   ,document.getElementById('root')
);

