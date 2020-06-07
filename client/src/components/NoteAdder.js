//floating componenet over main notes page, used to add new note

import React, {useState} from 'react';
import Message from './Message';
import NoteService from '../services/NoteService';

import '../styles/css/note-adder.min.css';

// props = {
// setAddNoteState (used to keep track of whether a new note is being added or not, and displaying this component based on it), 
// render(function to fetch and re-render all notes)
// }
const NoteAdder = props => {

  // to keep track of note currently being made
  const [note, setNote] = useState({title: "", content: "", color: "#ffffff"});

  // to keep track if error or success msg exists and what the msg is
  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }

  const clearInputs = () => {
    setNote({title: "", content: "", color: ""});
  }

  const onSubmit = (e) => {
    e.preventDefault();

    //calling postNote function from NoteService.js
    NoteService.postNote(note).then(data => {
      setMessage(data.message);

      //if note added successfully
      if(!data.message.error){
        clearInputs();
        //setAddNoteState handles whether a new note is being added or not and renders the noteAdder component according to it
        props.setAddNoteState(false);
        //re-render notes so new note is also shown
        props.render();
      }
    })
  }

  const closeNoteAdder = () => {
    props.setAddNoteState(false);
  }

  return(
    //change background color of whole div dynamically based on what color is currently selected
    <div className="note-adder-container" style={{backgroundColor: `${note.color}`}}>
      <button onClick={closeNoteAdder}><i className="far fa-window-close"></i></button>
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
            <input type='radio' value="#ffffff" name="color" onChange={onChange} checked="checked"/>
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

export default NoteAdder;