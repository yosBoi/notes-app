import React, {useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import NoteItem from './NoteItem';
import NoteService from '../services/NoteService';
import NoteAdder from './NoteAdder';
import Message from './Message';
//import { AuthContext } from '../context/AuthContext';

const Notes = props => {
  const [notes, setNotes] = useState({"notes" : []});
  const [message, setMessage] = useState(null);

  const [addNoteState, setAddNoteState] = useState(false);

  const addNote = () => {
    setAddNoteState(true);
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
    <div>
      {message ? <Message message={message}/> : null}
      {addNoteState ? <NoteAdder setAddNoteState={setAddNoteState}/> : null}
      <button onClick={addNote}>Add note</button>
      <button onClick={renderNotes}>Refresh Notes</button>
      {
        notes.notes.map(noteItem => {
          return <NoteItem key={noteItem._id} noteItem = {noteItem} render = {renderNotes}/>
        })
      }
    </div>
  )
}

export default Notes;