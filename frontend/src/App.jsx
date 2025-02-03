import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import SinglePage from './pages/SinglePage'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={ <Products /> } />
        <Route path='/product/:productId' element={ <SinglePage /> } />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login /> } />
        <Route path='/profile' element={<Profile/> } />
      </Routes>
    </div>
  )
}

export default App