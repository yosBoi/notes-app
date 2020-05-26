// to-do - change from fetch to axios

export default {
  getNotes: () => {
    return fetch('/api/notes').then(response => {
      
      //if response isn't OK, return the responded error message data
      if(response.status !== 200){
        return response.json().then(data => {return {message: data.message}});
      }

      //else return the data as it is (which will include the message data as well)
      return response.json().then(data => data);

    })
  },

  postNote:  (note) => {
    return fetch('/api/notes', {
      method: 'post',
      body: JSON.stringify(note),
      headers: { 'Content-Type': 'application/json'}
    }).then(response => {
      return response.json().then(data => data);
    })
  },

  deleteNote: (key) => {
    return fetch(`/api/notes/delete/${key}`, {
      method: 'delete'
    }).then(response => {
      return response.json().then(data => data);
    })
  },

  editNote: (note) => {
    return fetch('/api/notes', {
      method: "PATCH",
      body: JSON.stringify(note),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json().then(data => data);
    })
  }
}