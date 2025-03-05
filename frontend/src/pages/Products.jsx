import React, { useContext, useState} from 'react'
import Footer from '../components/Footer';
import ProductItem from '../components/ProductItem'
import SidebarFilters from '../components/SidebarFilters';
import  { ShopContext } from '../context/ShopContext'


const Products = () => {

  const { products } = useContext(ShopContext)
  console.log(products);
  

  return (
    <>    <div className='container mx-auto'> 
      <div className='flex w-full'>
        {/* Sidebar (1/4) */}
        <SidebarFilters />     
        
        {/* Main Content (3/4) */}
        <div className='w-3/4'>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 mt-2">
            {products.map((item, index) => (
              <ProductItem key={index} product={item} />      
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Products