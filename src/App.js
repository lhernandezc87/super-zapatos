import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import './App.css';
import ShoeStoreListDashboard from './components/ShoeStoreListDashboard.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={ShoeStoreListDashboard} />	
        </Router>  
      </div>
    );
  }
}

export default App;
