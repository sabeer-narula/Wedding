import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Vendors from './Vendors';
import VendorPage from './VendorPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/vendors" exact component={Vendors} />
        <Route path="/vendors/:vendorId" component={VendorPage} />
      </Switch>
    </Router>
  );
}

export default App;