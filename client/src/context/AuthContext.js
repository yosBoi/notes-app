//this context handles whether user is logged in, and who that user is

import React, {createContext, useState, useEffect} from 'react'

import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  //to display "loading" until fetching is done
  const [isLoaded, setIsLoaded] = useState(false);

  //only runs first time because of empty array, checks if user has jwt token in cookies(is authenticated) and sets states accordingly
  useEffect(() => {
    AuthService.isAuthenticated().then(data => {
      //console.log(data);
      setUser(data.username);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    })
  }, []);

  return (
    //return loading animation until loading is done at beginning
    <div>
      {!isLoaded ? 
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div> 
      
      :

      <AuthContext.Provider value = {{user, setUser, isAuthenticated, setIsAuthenticated}}>
        {props.children}
      </AuthContext.Provider>
      }
    </div>
  )
}