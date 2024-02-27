import PropTypes from 'prop-types';
import { AuthContext } from "./AuthContext"
import { useReducer } from 'react';
import { authReducer } from './authReducer';


const initialState = {
  logged: false
}

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, initialState);

  return(
    <AuthContext value={{}}>
      { children }
    </AuthContext>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};