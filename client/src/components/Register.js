import React, {useState, useRef} from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';

import '../styles/css/register.min.css'

const Register = props => {

  const [user, setUser] = useState({username: "", password: ""});
  const [message, setMessage] = useState(null);
  let timer = useRef(null);

  const onchange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
    if(e.target.value.length >= 3){
      e.target.className = "valid-input";
    }
    else{
      e.target.className = "invalid-input";
    }
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
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <h3>Enter details</h3>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" onChange={onchange} placeholder="Username" value={user.username} required/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" onChange={onchange} placeholder="Password" value={user.password} required/>
        <button type="submit">Register</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default Register;