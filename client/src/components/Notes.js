import React, {useState,useEffect} from 'react';
import NoteItem from './NoteItem';
import NoteService from '../services/NoteService';
import NoteAdder from './NoteAdder';
import NoteEditor from './NoteEditor';
import Message from './Message';
//import { AuthContext } from '../context/AuthContext';

import '../styles/css/notes.min.css'

const Notes = props => {
  const [notes, setNotes] = useState({"notes" : []});
  const [message, setMessage] = useState(null);

  const [addNoteState, setAddNoteState] = useState(false);

  const [editNoteState, setEditNoteState] = useState({note: null, editing:false});

  const addNote = () => {
    setAddNoteState(!addNoteState);
    setEditNoteState({...editNoteState, editing:false});
  }


  const renderNotes = () => {
    NoteService.getNotes().then(data => {

      if(data.message.error){
        setMessage(data.message);
        return;
      }

      setNotes(data);
    });
  }

  useEffect(renderNotes, []);

  return(
    <div className="notes-body-container">
      {message ? <Message message={message}/> : null}
      {addNoteState ? <NoteAdder setAddNoteState={setAddNoteState} render={renderNotes}/> : null}
      {editNoteState.editing ? <NoteEditor editNoteState={editNoteState} setEditNoteState={setEditNoteState} render={renderNotes}/> : null}
      <button onClick={addNote}>Add note</button>
      <button onClick={renderNotes}>Refresh Notes</button>
      <div className="notes-container">
        {
          notes.notes.map(noteItem => {
            return <NoteItem key={noteItem._id} noteItem = {noteItem} render = {renderNotes} setEditNoteState={setEditNoteState} setAddNoteState={setAddNoteState}/>
          })
        }
      </div>
    </div>
  )
}

export default Notes;