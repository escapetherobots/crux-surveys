// css import from materialize - extension required on non css files
import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'; // from index.js in reducers folder

// axios test code for email / mailer class test
import axios from 'axios';
window.axios = axios;

// CREATE REDUX STORE
// ============================================
// 1st arg = callback that returns array of reducers, 2nd arg = object, 3rd arg = method for middleware like thunk
// const store = createStore( () => [], {}, applyMiddleware());
const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
