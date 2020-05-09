import React from 'react';

const getStyle = props => {
  let style;
  if(props.message.error){
    style = "error";
  }
  else{
    style = "success";
  }
  return style;
}

const Message = props => {
  return(
    <div className={getStyle(props)} role="alert">
      {props.message.msgBody}
    </div>
  )
}

export default Message;