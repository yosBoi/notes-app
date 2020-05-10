import React, {useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import NoteItem from './NoteItem';
import NoteService from '../services/NoteService';
import Message from './Message';
//import { AuthContext } from '../context/AuthContext';

const Notes = props => {
  const [notes, setNotes] = useState({"notes" : []});
  const [message, setMessage] = useState(null);

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
      <Link to="/notenew">
        <button>Add note</button>
      </Link>
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