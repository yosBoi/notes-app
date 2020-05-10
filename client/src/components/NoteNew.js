import React, {useState} from 'react';
import NoteService from '../services/NoteService';
import Message from './Message';

const NoteNew = props => {

  const [note, setNote] = useState({title: "", content: "", color: ""});
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
      if(!data.message.error)
        clearInputs();
    })
  }

  return (
    <div>
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

export default NoteNew;