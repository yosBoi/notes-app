import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Notes from './components/Notes';
import Forgot from './components/Forgot';
import Reset from './components/Reset';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './styles/css/global.min.css'


function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path='/register' component={Register} />
      <UnPrivateRoute path='/forgot' component={Forgot} />
      <UnPrivateRoute path='/reset' component={Reset} />
      <PrivateRoute path="/notes" component={Notes} />
    </Router>
  );
}

export default App;
