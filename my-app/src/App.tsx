import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Vendors from './Vendors';
// import store from './store';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/vendors" component={Vendors} />
      </Switch>
    </Router>
  );
}

export default App;
