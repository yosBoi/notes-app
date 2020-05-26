//individual note component that is rendered onto the main notes page

import React, { useState } from 'react';
import NoteService from '../services/NoteService';
import Message from './Message';

import '../styles/css/note-item.min.css';


//props = {
//  key(_id of note),
//  noteItem(individual note object),
//  render(function to fetch and re-render all notes),
//  setEditNoteState(handler for state which keeps track of whether a note is being edited, and what note is being edited(all fields of that note)),
//  setAddNoteState(same but for adding note)
//}
const NoteItem = props => {

  // to keep track if error or success msg exists and what the msg is
  const [message, setMessage] = useState(null);

  const deleteNote = () => {
    NoteService.deleteNote(props.noteItem._id).then(response => {
      if(response.message.error){
        setMessage(response.message);
      }
      props.render();
    })
  }

  //changes editNoteState through its handler, causing editing component to render
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

      {/*display message if it exists*/}
      {message ? <Message message={message} /> : null }
    </div>
  );
}

export default NoteItem;