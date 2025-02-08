import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Navbar1 from '../components/Navbar1'
import Hero from '../components/Hero'
import Navigation from '../components/Navigation'
import Hero2 from '../components/Hero2'
import Discover from '../components/Discover'
import Mask from '../components/Mask'

const Home = () => {
  return (
    <div>
      <div className="sticky top-0 z-40 bg-white shadow-md">
        <Navbar />
        <Navbar1 />
      </div>
      <Navigation />
      <Hero />
      <Discover />
      <Hero2 />
      <Mask />
      <Footer />
    </div>
  )
}

export default Home