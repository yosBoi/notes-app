import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import {AuthContext} from '../context/AuthContext';

import '../styles/css/navbar.min.css';

const Navbar = props => {

  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(AuthContext);

  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      if(!data.message.error){
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/';
      }
    });
    //console.log('logout clicked');
    //setIsAuthenticated(false);

  }

  const unauthenticatedNavbar = () =>{
    return(
      <ul className="navbar-elements">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link>
        {/* <button onClick={function(){
          AuthService.login({username:"yash", password:"qwerty"})
          .then(data => {
            console.log(data);
            if(data.isAuthenticated === true){
              setIsAuthenticated(true);
            }
          })}}>
          set
        </button> */}
      </ul>
    )
  }

  const authenticatedNavbar = () => {
    return(
      <ul className="navbar-elements">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/notes">
          <li>Notes</li>
        </Link>
        <button onClick={onClickLogoutHandler}>
          Logout
        </button>
      </ul>
    )
  }


  return (
    <nav className="navbar">
      <Link to="/">
        <div className="navbar-logo">YOS</div>
      </Link>
      <div className="navbar-elements-container">
        {isAuthenticated ? authenticatedNavbar() : unauthenticatedNavbar()}
      </div>
    </nav>
  )
}

export default Navbar;