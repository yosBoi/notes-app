//message component to display on pages if there is an error or success msg returned from backend

import React from 'react';

import '../styles/css/message.min.css';

// set red-themed css class for error msg and green-themed for success msg
const getStyle = props => {
  let style;
  if(props.message.error){
    style = "error-message";
  }
  else{
    style = "success-message";
  }
  return style;
}


//props = {
//  message: {msgBody: "", error: bool}    
//}
const Message = props => {
  return(
    <div className={getStyle(props)} role="alert">
      {props.message.msgBody}
    </div>
  )
}

export default Message;