import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route} from 'react-router'


import App from './App.jsx'
import UpdatePartner from './UpdatePartner.jsx'
import CreatePartner from './CreatePartner.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/update" element={<UpdatePartner/>}></Route>
        <Route path="/create" element={<CreatePartner/>}></Route>
      </Routes>
    </React.StrictMode>
  </HashRouter>
  
)
