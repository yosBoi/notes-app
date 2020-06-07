//floating component over main notes page, used to edit notes

import React, { useState } from 'react';
import Message from './Message';
import NoteService from '../services/NoteService'

import '../styles/css/note-editor.min.css';


// props = {
//  editNoteState(keeps track of whether a note is being edited, and what note is being edited(all fields of that note)),
//  setEditNoteState(state handler),
//  render(function to fetch and re-render all notes)
// }
const NoteEditor = props => {

  //keep track of the note being edited, setting initial value to what is was when editing started
  const [note, setNote] = useState({_id: props.editNoteState.note._id ,title: props.editNoteState.note.title, content: props.editNoteState.note.content, color: props.editNoteState.note.color})

  // to keep track if error or success msg exists and what the msg is
  const [message, setMessage] = useState(null);


  //on change, change the "note" state
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();

    //calling editNote function from NoteService.js
    NoteService.editNote(note).then(data => {
      setMessage(data.message);

      //if note added successfully
      if(!data.message.error){

        //setEditNoteState handles whether a note is being edited or not and renders the noteEditor component according to it
        props.setEditNoteState({...props.editNoteState, editing:false})
        //re-render notes so edited changes are shown
        props.render();
      }
    })
  }

  const closeNoteEditor = () => {
    props.setEditNoteState({...props.editNoteState, editing:false});
  }

  return(
    //change background color of whole div dynamically based on what color is currently selected
    <div className="note-editor-container" style={{backgroundColor: `${note.color}`}}>
      <button onClick={closeNoteEditor}><i className="far fa-window-close"></i></button>
      <br/>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" value={note.title} onChange={onChange} placeholder="Title" maxLength="12" required/>
        
        <label htmlFor="content">Content: </label>
        <textarea rows="10" name="content" value={note.content} onChange={onChange} placeholder="Content"  required></textarea>
        
        {/*For selecting color, radio buttons are used and the radio buttons themselves are not displayed(through css) and circle divs of colors are used as labels to display the color value of the radio button*/}
        <label htmlFor="color">Color: </label>
        <div className="color-input-container">
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#ffffff"}}></div>
            <input type='radio' value="#ffffff" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#ffadad"}}></div>
            <input type='radio' value="#ffadad" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#ffd6a5"}}></div>
            <input type='radio' value="#ffd6a5" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#fdffb6"}}></div>
            <input type='radio' value="#fdffb6" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#caffbf"}}></div>
            <input type='radio' value="#caffbf" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#9bf6ff"}}></div>
            <input type='radio' value="#9bf6ff" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#a0c4ff"}}></div>
            <input type='radio' value="#a0c4ff" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#bdb2ff"}}></div>
            <input type='radio' value="#bdb2ff" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#ffc6ff"}}></div>
            <input type='radio' value="#ffc6ff" name="color" onChange={onChange}/>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {/*display message if it exists*/}
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default NoteEditor;