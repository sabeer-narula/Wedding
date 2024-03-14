import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Vendors from './components/Vendors';
import VendorPage from './components/VendorPage';
import Login from './components/Login';
import SignUp from './components/Signup';
import TodoList from './components/Todo';
import LiveStream from './components/Livestream';
import GuestLiveStream from './components/GuestLivestream';
import Profile from './components/Profile';
import Chatbot from './components/Chatbot';

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
        <Route path="/livestream" component={LiveStream} />
        <Route path="/guest/livestream" component={GuestLiveStream} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Chatbot" component={Chatbot} />
      </Switch>
    </Router>
  );
}

export default App;