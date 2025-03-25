import React, { useContext, useState, useEffect } from 'react';
import Footer from '../components/Footer';
import ProductItem from '../components/ProductItem';
import SidebarFilters from '../components/SidebarFilters';
import { ShopContext } from '../context/ShopContext';
import Loading from '../components/Loading'; // Assuming you have a loading component

const Products = () => {
  const { products } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
      setLoading(false);
    }
  }, [products]);

  return (
    <>
      <div className='px-10 bg-white'>
        <div className='flex w-full'>
          {/* Sidebar (1/4) */}
          <div className='hidden md:block'>
            <SidebarFilters setFilteredProducts={setFilteredProducts} />
          </div>
          {/* Main Content (3/4) */}
          <div className='w-full md:w-3/4'>
            {/* Show Loading while fetching products */}
            {loading ? (
              <Loading /> // Display Loading component
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 lg:p-4 mt-2">
                {filteredProducts.map((item, index) => (
                  <ProductItem key={index} product={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
