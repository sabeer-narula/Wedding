import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { VendorProvider } from './VendorContext';
import Dashboard from './Dashboard';
import Vendors from './Vendors';
import store from './store';

function App() {
  return (
    <VendorProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/vendors" component={Vendors} />
        </Switch>
      </Router>
    </VendorProvider>
  );
}

export default App;
