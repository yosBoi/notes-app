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
            <div className="color-input" style={{backgroundColor: "#DBF9F4"}}></div>
            <input type='radio' value="#DBF9F4" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#FAE3C6"}}></div>
            <input type='radio' value="#FAE3C6" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#F564A9"}}></div>
            <input type='radio' value="#F564A9" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#C3BEF7"}}></div>
            <input type='radio' value="#C3BEF7" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#E1F0C4"}}></div>
            <input type='radio' value="#E1F0C4" name="color" onChange={onChange}/>
          </label>
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#BCEBCB"}}></div>
            <input type='radio' value="#BCEBCB" name="color" onChange={onChange}/>
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