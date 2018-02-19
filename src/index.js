import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


import ShoeStoreListDashboard from './components/ShoeStoreListDashboard.js';
import LoginIndex from './components/login/LoginIndex.js'
import store from './store';

import './index.css';
import './App.css';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
  	localStorage.getItem("user") && localStorage.getItem("password") 
  	? <Component {...props} />
  	: <Redirect to='/' />
  )}/>
)


const Appi = () => (
  <Router>
    <Switch>
      <PrivateRoute exact path='/stores' component={ShoeStoreListDashboard}/>
      <Route exact path='/' component={LoginIndex} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
  	<Appi />
  </Provider>, document.getElementById('root')
);
