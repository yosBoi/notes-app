import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

import '../styles/css/home.min.css'

const Home = props => {
  const {isAuthenticated, user } = useContext(AuthContext);

  if(isAuthenticated){
    return(
      <div className="menu-redirect">
        <h3>Welcome, {user}</h3>
        <p>To access your notes, go to the <Link to="/notes">Notes section</Link></p>
      </div>
    )
  }
  else{
    return(
      <div className="menu-redirect">
        <h3>To log in, go to the <Link to="/login">Login page</Link></h3>
        <h3>To register, go to the <Link to="/register">Register page</Link></h3>
      </div>
    )
  }
}

export default Home;