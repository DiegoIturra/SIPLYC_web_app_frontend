import React from 'react'
import ReactDOM from 'react-dom/client'
import { SiplycApp } from './SiplycApp'
import { BrowserRouter } from 'react-router-dom'

//Imports for testing components
//import FileUploader from './components/FileUploader.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SiplycApp/>
    </BrowserRouter>
  </React.StrictMode>,
)
