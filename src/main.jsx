import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginForm from './components/Login/LoginForm.jsx'

//Imports for testing components
//import FileUploader from './components/FileUploader.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginForm/>
  </React.StrictMode>,
)
