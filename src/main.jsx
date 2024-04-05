import React from 'react'
import ReactDOM from 'react-dom/client'
import { SiplycApp } from './SiplycApp'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiplycApp/>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
