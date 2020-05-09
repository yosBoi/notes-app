export default {
  login : user =>{
      //console.log(user);
      return fetch('/api/login',{
          method : "post",
          body : JSON.stringify(user),
          headers : {
              'Content-Type' : 'application/json'
          }
      }).then(res => {
          if(res.status === 200)
              return res.json().then(data => data);
          else
              return res.json().then(data => { return {isAuthenticated: false , message: data.message}});
      }).catch(e => console.log(e));
  },
  register : user =>{
      console.log(user);
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
  isAuthenticated : ()=>{
      return fetch('/api/auth').then(res=>{
        if(res.status === 200)
            return res.json().then(data => data);
        else
            return { isAuthenticated : false, username: null};
      });
  }

}