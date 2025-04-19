import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import AllOrders from './pages/AllOrders'
import AllCustomers from './pages/AllCustomers'
import ManageProducts from './pages/ManageProducts'
import Settings from './pages/Settings';


const App = () => {
  return (
    <div>
     
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path='/dashboard'  element={ <Dashboard /> }/>
          <Route path='/allorders' element={ <AllOrders /> } />
          <Route path='/allcustomers' element={ <AllCustomers/> } />
          <Route path='/manageproducts' element={<ManageProducts/>}/>
          <Route path='/settings' element={<Settings/>}/>
          
        </Routes>
      
    </div>
  )
}

export default App