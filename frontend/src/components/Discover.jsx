import React from 'react'
import { Link } from 'react-router-dom'

const Discover = () => {
  return (
    <div className='py-6 px-5 lg:px-0 lg:py-10 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] '>
        <div className='text-center space-y-6 max-w-7x1 gap-1 mx-auto'>
            <p className='text-2xl lg:text-3xl font-serif text-blue-950' > Our Purpose </p>
            <h1 className='lg:text-6xl text-5xl font-serif text-blue-950' >Do More, Be More.</h1>
            <Link to="/products" >
            <button className="bg-white px-4 py-2 rounded-full border focus:ring-1 text-blue-950 border-blue-950 hover:bg-blue-100 hover:scale-110 transition-all">
                Discover
             </button>
             </Link>
        </div>
    </div>
  )
}

export default Discover