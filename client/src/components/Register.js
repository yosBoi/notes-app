import React, {useState,useContext, useRef} from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';
import {AuthContext} from '../context/AuthContext';

const Register = props => {

  const [user, setUser] = useState({username: "", password: ""});
  const [message, setMessage] = useState(null);
  let timer = useRef(null);

  const onchange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then(data => {
      
      setMessage(data.message);
      
      if(!data.message.error){
        timer = setTimeout(() => {
          window.location.href = './login'
        }, 3000);
      }
    })
  }


  return(
    <div>
      <form onSubmit={onSubmit}>
        <h3>Enter details</h3>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" onChange={onchange} placeholder="Username" value={user.username}/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" onChange={onchange} placeholder="Password" value={user.password}/>
        <button type="submit">Register</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default Register;