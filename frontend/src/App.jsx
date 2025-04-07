import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import SinglePage from './pages/SinglePage'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Navbar1 from './components/Navbar1'
import Footer from './components/Footer'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import { Toaster } from "react-hot-toast" //he ye kam karega 
import Order from './pages/Order'
import Verify from './pages/Verify'
import ForgotPassword from './pages/ForgotPassword'
import OTPVerification from './pages/OTPVerification'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <div>
      <Toaster />
      <div className="sticky top-0 z-40 bg-white shadow-md">
        <Navbar />
        <Navbar1 />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={ <Products /> } />
        <Route path='/product/:productId' element={ <SinglePage /> } />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login /> } />
        <Route path='/profile' element={<Profile/> } />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/orders' element={ <Order /> } />
        <Route path='/verify' element={ <Verify /> } />
        <Route path='/forgot-password' element={ <ForgotPassword /> } />
        <Route path='/verification-otp' element={ <OTPVerification /> } />
        <Route path='/reset-password' element={ <ResetPassword /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App