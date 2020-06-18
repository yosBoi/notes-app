import React, {useState} from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';

import '../styles/css/reset.min.css'

const Reset = props => {

  const [user, setUser] = useState({email: "", recoveryCode: "", password: ""});

  const [message, setMessage] = useState(null);

  const onChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
    if(e.target.name === "password"){
      if(e.target.value.length >= 3){
        e.target.className = "valid-input";
      }
      else{
        e.target.className = "invalid-input";
      }
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    setMessage({msgBody: "Loading...", error:false})
    AuthService.reset(user).then(data => {
      setMessage(data.message)
      console.log(data);
    })
  }

  return (
    <div className="reset-form">
      <form onSubmit={onSubmit}>
        <h3>Reset password</h3>
        <label htmlFor='email'>Email:</label>
        <input type="email" name="email" onChange={onChange} placeholder="Email id" value={user.email} required />
        <label htmlFor='recoveryCode'>Recovery Code:</label>
        <input type="text" name="recoveryCode" onChange={onChange} placeholder="Recovery Code" value={user.recoveryCode} required />
        <label htmlFor='password'>New Password:</label>
        <input type="password" name="password" onChange={onChange} placeholder="New Password" value={user.password} required minLength="3"/>
        <button type="submit">Submit</button>
      </form>
      {message ? <Message message = {message}/> : null}
    </div>
  )
}

export default Reset;