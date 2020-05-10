import React, { useState } from 'react';
import NoteService from '../services/NoteService';
import Message from './Message';

const NoteItem = props => {

  const [message, setMessage] = useState(null);

  const deleteNote = () => {
    NoteService.deleteNote(props.noteItem._id).then(response => {
      if(response.message.error){
        setMessage(response.message);
      }
      props.render();
    })
  }

  const editNote = () => {
    props.setEditNoteState({note: props.noteItem, editing:true});
    props.setAddNoteState(false);
  }

  return(
    <div>
      <button onClick={deleteNote}>Delete</button>
      <button onClick={editNote}>Edit</button>
      <h4>{props.noteItem.title}</h4>
      <p>{props.noteItem.content}</p>
      <p>{props.noteItem.color}</p>
      {message ? <Message message={message} /> : null }
    </div>
  );
}

export default NoteItem;