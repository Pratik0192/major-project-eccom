import React, { useContext, useState} from 'react'
import Footer from '../components/Footer';
import ProductItem from '../components/ProductItem'
import SidebarFilters from '../components/SidebarFilters';
import  { ShopContext } from '../context/ShopContext'


const Products = () => {

  const { products } = useContext(ShopContext)
  const [filteredProducts, setFilteredProducts] = useState(products);
  console.log(products);
  
  return (
    <>
      <div className='mx-auto w-[95%]'> 
        <div className='flex w-full'>
          {/* Sidebar (1/4) */}
          <div className='hidden md:block'>
            <SidebarFilters setFilteredProducts={setFilteredProducts} /> 
          </div>
          {/* Main Content (3/4) */}
          <div className='w-full md:w-3/4'>
            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 lg:p-4 mt-2">
              {filteredProducts.map((item, index) => (
                <ProductItem key={index} product={item} />      
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products