import React, {useState, useRef, useEffect} from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';

import '../styles/css/register.min.css'

const Register = props => {

  //keeps track of the new user
  const [user, setUser] = useState({email: "", username: "", password: ""});

  //keeps track of error or success msg
  const [message, setMessage] = useState(null);

  let timer = useRef(null);

  //remove timer when unmounting
  useEffect(() => {
    return() => {
      clearTimeout(timer);
    }
  },[]);

  const onchange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});

    //change outline of text fields (css) based on input length validation (only for username and password)
    if(e.target.name === "username" || e.target.name === "password"){
      if(e.target.value.length >= 3){
        e.target.className = "valid-input";
      }
      else{
        e.target.className = "invalid-input";
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage({msgBody: "Loading...", error:false})
    AuthService.register(user).then(data => {
      
      setMessage(data.message);
      
      //if no error in registering, redirect to login page after 3s so user has time to read success msg
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
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" onChange={onchange} placeholder="Email" value={user.email} required />
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" onChange={onchange} placeholder="Username" value={user.username} required minLength="3" maxLength="24"/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" onChange={onchange} placeholder="Password" value={user.password} required minLength ="3" maxLength="64"/>
        <button type="submit">Register</button>
      </form>
      {/*display msg if it exists*/}
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default Register;