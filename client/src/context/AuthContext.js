import React, {createContext, useState, useEffect} from 'react'

import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then(data => {
      console.log(data);
      setUser(data.username);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    })
  }, []);

  return (
    <div>
      {!isLoaded ? <h1>Loading</h1> : 
      <AuthContext.Provider value = {{user, setUser, isAuthenticated, setIsAuthenticated}}>
        {props.children}
      </AuthContext.Provider>
      }
    </div>
  )
}