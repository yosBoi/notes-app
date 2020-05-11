import React, { useState } from 'react';
import Message from './Message';
import NoteService from '../services/NoteService'

import '../styles/css/note-editor.min.css';

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
    <div className="note-editor-container">
      <button onClick={closeNoteEditor}><i className="far fa-window-close"></i></button>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" value={note.title} onChange={onChange} placeholder="Title" />
        <label htmlFor="content">Content: </label>
        {/* <input type="text" name="content" value={note.content} onChange={onChange} placeholder="Content" /> */}
        <textarea rows="10" name="content" value={note.content} onChange={onChange} placeholder="Content"  required></textarea>
        <label htmlFor="color">Color: </label>
        {/* <input type="text" name="color" value={note.color} onChange={onChange} placeholder="Color" /> */}
        <select name="color" value={note.color} onChange={onChange} required>
          <option value="#DBF9F4" style={{backgroundColor: "#DBF9F4"}}></option>
          <option value="#FAE3C6" style={{backgroundColor: "#FAE3C6"}}></option>
          <option value="#F564A9" style={{backgroundColor: "#F564A9"}}></option>
          <option value="#C3BEF7" style={{backgroundColor: "#C3BEF7"}}></option>
          <option value="#E1F0C4" style={{backgroundColor: "#E1F0C4"}}></option>
          <option value="#BCEBCB" style={{backgroundColor: "#BCEBCB"}}></option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default NoteEditor;