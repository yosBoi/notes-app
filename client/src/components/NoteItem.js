import React, { useState } from 'react';
import NoteService from '../services/NoteService';
import Message from './Message';

import '../styles/css/note-item.min.css';

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
    <div style={{backgroundColor: `${props.noteItem.color}`}} className="note-item">
      <button onClick={deleteNote} className="note-delete-button"><i className="fas fa-trash-alt"></i></button>
      <button onClick={editNote} className="note-edit-button"><i className="fas fa-edit"></i></button>
      <h4>{props.noteItem.title}</h4>
      <div className="content-container">
        <p>{props.noteItem.content}</p>
      </div>
      {message ? <Message message={message} /> : null }
    </div>
  );
}

export default NoteItem;