import React, {useState,useEffect} from 'react';
import NoteItem from './NoteItem';
import NoteService from '../services/NoteService';
import NoteAdder from './NoteAdder';
import NoteEditor from './NoteEditor';
import Message from './Message';
//import { AuthContext } from '../context/AuthContext';

import '../styles/css/notes.min.css'

const Notes = props => {

  //keeps track of all notes
  const [notes, setNotes] = useState({"notes" : []});

  // to keep track if error or success msg exists and what the msg is
  const [message, setMessage] = useState(null);

  //keeps track of whether new note is being added or not (default false)
  const [addNoteState, setAddNoteState] = useState(false);

  //keeps track of whether note is being edited or not and which note is it(default false)
  const [editNoteState, setEditNoteState] = useState({note: null, editing:false});

  const addNote = () => {
    setAddNoteState(!addNoteState);
    setEditNoteState({...editNoteState, editing:false});
  }


  //fetches and re-render all notes
  const renderNotes = () => {
    NoteService.getNotes().then(data => {

      if(data.message.error){
        setMessage(data.message);
        return;
      }

      setNotes(data);
    });
  }

  //runs only the first time
  useEffect(renderNotes, []);

  return(
    <div className="notes-body-container">

      {/*display message if it exists*/}
      {message ? <Message message={message}/> : null}

      {/*display NoteAdder component if its state is true*/}
      {addNoteState ? <NoteAdder setAddNoteState={setAddNoteState} render={renderNotes}/> : null}

      {/*display NoteEditor if its state is true*/}
      {editNoteState.editing ? <NoteEditor editNoteState={editNoteState} setEditNoteState={setEditNoteState} render={renderNotes}/> : null}
      <div className="notes-buttons-container">
        <button onClick={addNote}>Add note</button>
        <button onClick={renderNotes}>Refresh Notes</button>
      </div>
      <div className="notes-container">
        {
          notes.notes.map(noteItem => {
            return <NoteItem key={noteItem._id} noteItem = {noteItem} render = {renderNotes} editNoteState={editNoteState} setEditNoteState={setEditNoteState} setAddNoteState={setAddNoteState}/>
          })
        }
      </div>
    </div>
  )
}

export default Notes;