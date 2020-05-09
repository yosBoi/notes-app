import React, {useState,useContext} from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';
import {AuthContext} from '../context/AuthContext';

const Login = props => {
  const [user, setUser] = useState({username: "", password: ""});
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
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
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please enter credentials</h3>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" onChange={onChange} placeholder="Username" />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" onChange={onChange} placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      {message ? <Message message = {message}/> : null}
    </div>
  )

}

export default Login;