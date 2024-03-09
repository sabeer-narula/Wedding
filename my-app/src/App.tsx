import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Vendors from './Vendors';
import VendorPage from './VendorPage';
import Login from './Login';
import SignUp from './Signup';
import TodoList from './Todo';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Dashboard} />
        <Route path="/vendors" exact component={Vendors} />
        <Route path="/vendors/:vendorId" component={VendorPage} />
        <Route path="/todo" component={TodoList} />
      </Switch>
    </Router>
  );
}

export default App;