import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import ShoeStoreListDashboard from './components/ShoeStoreListDashboard.js';
import LoginIndex from './components/login/LoginIndex.js'
import store from './store';

import './index.css';
import './App.css';


const Appi = () => (
  <Router>
    <Switch>
      <Route exact path='/stores' component={ShoeStoreListDashboard}/>
      <Route exact path='/' component={LoginIndex} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
  	<Appi />
  </Provider>, document.getElementById('root')
);
