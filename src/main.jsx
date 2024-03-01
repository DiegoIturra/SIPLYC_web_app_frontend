import React from 'react'
import ReactDOM from 'react-dom/client'
import { SiplycApp } from './SiplycApp'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SiplycApp/>
    </BrowserRouter>
  </React.StrictMode>,
)
