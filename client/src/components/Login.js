import React, {useState,useContext} from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';
import {AuthContext} from '../context/AuthContext';

import '../styles/css/login.min.css';

const Login = props => {
  const [user, setUser] = useState({username: "", password: ""});
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
    //e.target.className = e.target.value.length >= 3 ? "valid-input" : "invalid-input";
    if(e.target.value.length >= 3){
      e.target.className = "valid-input";
    }
    else{
      e.target.className = "invalid-input";
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then(data => {
      //console.log(data);
      if(data.isAuthenticated){
        authContext.setIsAuthenticated(data.isAuthenticated);
        authContext.setUser(data.username);
        console.log("authenticated");
        //setMessage(data.message); 
        //redirect
        //window.location.href = "/";
        props.history.push('/');

      }
      else{
        //console.log("failed login");
        setMessage(data.message);
      }
    })
  }

  return(
    <div  className="login-form">
      <form onSubmit={onSubmit}>
        <h3>Please enter credentials</h3>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" onChange={onChange} placeholder="Username" required minLength="3" maxLength="24"/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" onChange={onChange} placeholder="Password" required maxLength="64"/>
        <button type="submit">Log In</button>
      </form>
      {message ? <Message message = {message}/> : null}
    </div>
  )

}

export default Login;