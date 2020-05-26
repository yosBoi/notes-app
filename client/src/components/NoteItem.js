//individual note component that is rendered onto the main notes page

import React, { useState } from 'react';
import NoteService from '../services/NoteService';
import Message from './Message';

import '../styles/css/note-item.min.css';


//props = {
//  key(_id of note),
//  noteItem(individual note object),
//  render(function to fetch and re-render all notes),
//  editNoteState(state which keeps track of whether a note is being edited, and what note is being edited(all fields of that note)),
//  setEditNoteState(handler for it),
//  setAddNoteState(same but for adding note)
//}
const NoteItem = props => {

  // to keep track if error or success msg exists and what the msg is
  const [message, setMessage] = useState(null);

  //to keep track of whether note is being deleted
  const [deleting, setDeleting] = useState(false);

  //function to delete note from DB (through NoteService)
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

  const deleteConfirm = () => {
    setDeleting(!deleting);
  }


  return(

    <div style={{backgroundColor: `${props.noteItem.color}`}} className="note-item">

      {/*button changes deleting state which changes the rendered content, loses onClick if a note is being edited*/}
      <button onClick={props.editNoteState.editing ? null : deleteConfirm} className="note-delete-button"><i className="fas fa-trash-alt"></i></button>

      {/*if note is being deleted, edit button loses onClick and changes cursor*/}
      <button onClick={deleting? null : editNote} className="note-edit-button" style={{cursor: deleting ? "not-allowed" : "pointer"}}><i className="fas fa-edit"></i></button>

      {/*render based on whether note is being deleted or not*/}
      {deleting ? 

        <>
        <h4>Delete this note ?</h4>
        <div className="delete-confirm-buttons">
          <button onClick={deleteNote} className="delete-yes" style={{color: `${props.noteItem.color}`}}>Yes</button>
          <button onClick={() => {setDeleting(false)}} className="delete-no">No</button>
        </div>
        </>

      : 

        <>
        <h4>{props.noteItem.title}</h4>
        <div className="content-container">
          <p>{props.noteItem.content}</p>
        </div>
        </>
      
      }

      {/*display message if it exists*/}
      {message ? <Message message={message} /> : null }
    </div>
  );
}

export default NoteItem;