import React from 'react';
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
