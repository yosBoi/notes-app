import React from 'react';

const NoteItem = props => {
  return(
    <div>
      <h4>{props.noteItem.title}</h4>
      <p>{props.noteItem.content}</p>
      <p>{props.noteItem.color}</p>
    </div>
  );
}

export default NoteItem;