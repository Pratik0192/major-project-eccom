import React from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import ListProduct from './pages/ListProduct'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/dashboard'  element={ <Dashboard /> }/>
        <Route path='/listproduct' element={ <ListProduct /> } />
      </Routes>
    </div>
  )
}

export default App