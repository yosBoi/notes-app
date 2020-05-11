import React, {useState} from 'react';
import Message from './Message';
import NoteService from '../services/NoteService';

import '../styles/css/note-adder.min.css';

const NoteAdder = props => {

  const [note, setNote] = useState({title: "", content: "", color: "#ffffff"});
  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value});
  }

  const clearInputs = () => {
    setNote({title: "", content: "", color: ""});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    NoteService.postNote(note).then(data => {
      setMessage(data.message);
      if(!data.message.error){
        clearInputs();
        props.setAddNoteState(false);
        props.render();
      }
    })
  }

  const closeNoteAdder = () => {
    props.setAddNoteState(false);
  }

  return(
    <div className="note-adder-container" style={{backgroundColor: `${note.color}`}}>
      <button onClick={closeNoteAdder}><i className="far fa-window-close"></i></button>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" value={note.title} onChange={onChange} placeholder="Title" maxLength="10"/>
        <label htmlFor="content">Content: </label>
        {/* <input type="text" name="content" value={note.content} onChange={onChange} placeholder="Content" /> */}
        <textarea rows="10" name="content" value={note.content} onChange={onChange} placeholder="Content"  required></textarea>
        <label htmlFor="color">Color: </label>
        {/* <input type="text" name="color" value={note.color} onChange={onChange} placeholder="Color" /> */}
        
        <div className="color-input-container">
          <label className='color-input-label'>
            <div className="color-input" style={{backgroundColor: "#ffffff"}}></div>
            <input type='radio' value="#ffffff" name="color" onChange={onChange} checked="checked"/>
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
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default NoteAdder;