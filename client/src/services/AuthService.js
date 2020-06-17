// to-do - change from fetch to axios

export default {
  login : user =>{
      return fetch('/api/login',{
          method : "post",
          body : JSON.stringify(user),
          headers : {
              'Content-Type' : 'application/json'
          }
      }).then(res => {
          //if response is OK
          if(res.status === 200)
              return res.json().then(data => data);
          else
              return res.json().then(data => { return {isAuthenticated: false , message: data.message}});
      }).catch(e => console.log(e));
  },
  register : user =>{
      //console.log(user);
      return fetch('/api/register',{
          method : "post",
          body : JSON.stringify(user),
          headers : {
            'Content-Type' : 'application/json'
          }
      }).then(res => res.json())
        .then(data => data);
  },
  logout : ()=>{
      return fetch('/api/logout')
        .then(res => res.json())
        .then(data => data);
  },
  forgot : user => {
    return fetch('/api/forgot', {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(res => res.json())
    .then(data => data);
  },
  reset: user => {
    return fetch('/api/forgot/reset', {
        method: "post",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(res => res.json())
    .then(data => data);
  },
  //just to check if user has jwt token in cookies or not
  isAuthenticated : ()=>{
      return fetch('/api/auth').then(res=>{
        if(res.status === 200)
            return res.json().then(data => data);
        else
            return { isAuthenticated : false, username: null};
      });
  }

}