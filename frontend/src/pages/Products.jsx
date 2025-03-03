import React, { useContext, useState} from 'react'
import ProductItem from '../components/ProductItem'
import SidebarFilters from '../components/SidebarFilters';
import SortingOptions from '../components/SortFilterBar';
import SubNavBar from '../components/SubNavBar';
import  { ShopContext } from '../context/ShopContext'


const Products = () => {

  const [sortOption, setSortOption] = useState('best-sellers');
  const { products } = useContext(ShopContext)
  console.log(products);
  

  return (
    <div className='container mx-auto'> 
      {/* Sub Navigation Bar */}
      <SubNavBar/>

      <div className='flex'>
        {/* Sidebar (1/4) */}
        
        <SidebarFilters />     
        
        {/* Main Content (3/4) */}
        <div className='w-3/4'>

          {/* Sorting Options */}
          <SortingOptions onSortChange={setSortOption} />
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {products.map((item, index) => (
              <ProductItem key={index} product={item} />      
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products