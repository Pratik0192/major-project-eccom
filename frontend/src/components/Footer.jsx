import React from 'react'
import playstore from '../assets/playstore.png'
import appstore from '../assets/appstore.png'

const Footer = () => {
  return (
    <footer className='bg-muted text-muted-foreground bg-blue-950' >
      <div className='max-w-7xl mx-auto px-6 py-12'  >
        <div className='text-white gap-3 mb-4 ' >
          <h1 className='text-4xl mb-4 ' >Buy The Best Eyewear From Lenskart</h1>
          <p className='mb-4'>Lenskart Is The Leading E-Commerce Portal For Eyewear In India. It Has Revolutionised The Eyewear Industry In The Country With Its Omni-Channel Approach. From An Ever-Growing Number Of Offline Stores Across Major Cities In The Country To Innovative Integration Of Technology While Purchasing Online, Lenskart Caters To Every Customer With Several Deals And Offers.</p>
          <p className='mb-4' >A One-Stop Online Solution For Purchasing Eyewear And Its Accessories, Lenskart Delivers Them Right At Your Doorstep With Convenient Methods Of Payment. Sunglasses as well as Eyeglasses Are Available For Men And Women In A Diverse Array Of Styles And Trendy Colours. If You Want To Try Out Contact Lenses, Pick The Ones Of Your Choice From The Extensive Variety Of Coloured Contact Lenses From Our Online Store.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8' >
          <div>
            <h3 className='text-lg font-semibold mb-2 text-white' >Services</h3>
            <ul className='space-y-2 text-white  ' >
                    <li>Store Locator</li>
                    <li>Buying Guide</li>
                    <li>Frame Size</li>
                </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2 text-white' >About Us</h3>
            <ul className='space-y-2 text-white  ' >
                    <li>We Are Hiring</li>
                    <li>Refer and earn</li>
                    <li>Lenskart Coupons</li>
                </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2 text-white' >Help</h3>
            <ul className='space-y-2 text-white  ' >
                    <li>FAQ's</li>
                </ul>
          </div>
          <div className='text-white text-center items-center justify-center' >
            <ul className='space-y-2 text-white flex gap-0 lg:gap-2' >
                    <li> <img src={playstore} alt="" className='w-34 h-14 cursor-pointer' /> </li>
                    <li> <img src={appstore} alt="" className='w-34 h-14 cursor-pointer' /> </li>
            </ul>
            Download Lenskart to buy Eyeglasses, Sunglasses and Contact Lenses 
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-white border-muted-foreground/20 pt-5 text-center text-white" >
        <p>&copy; {new Date().getFullYear()} <span className='font-semibold'>Lenskart</span>. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer