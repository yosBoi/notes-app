import React, { useState } from 'react';
import Message from './Message';
import NoteService from '../services/NoteService'

const NoteEditor = props => {

  const [note, setNote] = useState({_id: props.editNoteState.note._id ,title: props.editNoteState.note.title, content: props.editNoteState.note.content, color: props.editNoteState.note.color})
  const [message, setMessage] = useState(null);


  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    NoteService.editNote(note).then(data => {
      setMessage(data.message);
      if(!data.message.error){
        props.setEditNoteState({...props.editNoteState, editing:false})
        props.render();
      }
    })
  }

  const closeNoteEditor = () => {
    props.setEditNoteState({...props.editNoteState, editing:false});
  }

  return(
    <div>
      <button onClick={closeNoteEditor}>Close</button>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" value={note.title} onChange={onChange} placeholder="Title" />
        <label htmlFor="title">Content: </label>
        <input type="text" name="content" value={note.content} onChange={onChange} placeholder="Content" />
        <label htmlFor="title">Color: </label>
        <input type="text" name="color" value={note.color} onChange={onChange} placeholder="Color" />
        <button type="submit">Submit</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default NoteEditor;