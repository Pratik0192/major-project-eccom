import React, { useContext, useState, useEffect } from 'react';
import Footer from '../components/Footer';
import ProductItem from '../components/ProductItem';
import SidebarFilters from '../components/SidebarFilters';
import { ShopContext } from '../context/ShopContext';
import Loading from '../components/Loading';

const Products = () => {
  const { products } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
      setLoading(false);
    }
  }, [products]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Number of total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <div className='px-10 bg-white'>
        <div className='flex w-full'>
          {/* Sidebar (1/4) md and lg*/}
          <div className='hidden md:block'>
            <SidebarFilters setFilteredProducts={setFilteredProducts} />
          </div>
          {/* Main Content (3/4) */}
          <div className='w-full md:w-3/4'>
            {/* Show Loading while fetching products */}
            {loading ? (
              <Loading />
            ) : (
              <>
                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 lg:p-4 mt-2">
                  {currentProducts.map((item, index) => (
                    <ProductItem key={index} product={item} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center my-4">
                  <div className="join">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        className={`join-item btn bg-gray-300 text-black ${currentPage === index + 1 ? 'btn-active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
