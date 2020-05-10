import React from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Notes from './components/Notes';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path='/register' component={Register} />
      <PrivateRoute path="/notes" component={Notes} />
    </Router>
  );
}

export default App;
