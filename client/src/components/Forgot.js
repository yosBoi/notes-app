import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import Message from './Message';

import '../styles/css/forgot.min.css';


const Forgot = props => {

  //to keep track of current user info being entered
  const [user, setUser] = useState({email: ""});

  //to keep track if error msg exists and what error msg is
  const [message, setMessage] = useState(null);

  const onChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const onSubmit = e => {
    e.preventDefault();
    setMessage({msgBody: "Loading...", error:false})
    AuthService.forgot(user).then(data => {
      setMessage(data.message)
      //console.log(data);
    })
  }

  return(
    <div className="forgot-form">
      <form onSubmit={onSubmit}>
        <h3>Enter your registered email:</h3>
        <input type="email" name="email" onChange={onChange} placeholder="Email id" value={user.email} required/>
        <button type="submit">Submit</button>
      </form>
      <p id="reset-link">Once you have recieved the recovery code on your email, please go to the <Link to="/reset">reset page</Link></p>
      {/* this message component only displays if message (in message state) exists */}
      {message ? <Message message = {message}/> : null}
    </div>
  )
}

export default Forgot;