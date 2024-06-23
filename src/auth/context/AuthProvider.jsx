import { AuthContext } from "./AuthContext"
import { useReducer } from 'react';
import { authReducer } from './authReducer';
import { types } from "../types/types";

const init = () => {
  const user = JSON.parse(localStorage.getItem('user')); 

  return {
    logged: !!user,
    user: user
  }
}

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = async ( email = '' , password = '' ) => {

    const user = {
      email,
      password
    }

    //TODO: replace raw url with an environment variable
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: user})
    })

    if(!response.ok) {
      return false;
    }

    const data = await response.json();

    const action = {
      type: types.login,
      payload: data?.user
    };

    localStorage.setItem('user', JSON.stringify(data?.user));
    dispatch(action)
    return true
  }

  const logout = () => {
    const action = {
      type: types.logout
    }

    localStorage.removeItem('user');

    dispatch(action);
  }

  return(
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}