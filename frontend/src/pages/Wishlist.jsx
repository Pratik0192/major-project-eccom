import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { FaHeartBroken, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { BaggageClaim, Check } from 'lucide-react';
import Loading from '../components/Loading';
import heart from '../assets/heartt.json'
import Lottie from 'lottie-react'

const Wishlist = () => {
  const {
    wishlistItems,
    getWishlistedItems,
    removeWishlist,
    token,
    products,
    addToCart
  } = useContext(ShopContext);

  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getWishlistedItems(token)
        .finally(() => setLoading(false));
    }
  }, [token]);

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await removeWishlist(itemId);
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = (product) => {
    if (!size) {
      toast.error('Please select a size first');
      return;
    }
    addToCart(product._id, size);
    toast.success('Added to cart');
    setSelectedProduct(null); // Close the size selector
  };

  // Filter products to only include wishlisted items
  const wishlistedProducts = products.filter(product => 
    wishlistItems[product._id]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-6xl bg-white mx-auto px-4 py-8 min-h-screen"> 
      <h1 className="text-md md:text-3xl gap-1 text-black font-bold mb-8 text-center">
        <span className='inline-block'>
          <Lottie animationData={heart} className='w-[50px] md:w-[80px]' type='text' />
        </span>
        Your Wishlist ({wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} in wishlist)
        <span className='inline-block'>
          <Lottie animationData={heart} className='w-[50px] md:w-[80px]' type='text' />
        </span>
      </h1>     
      <hr className='text-gray-400'  /> 
      {token ? (
        <div>
          {wishlistedProducts.length > 0 ? (
            <div >

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedProducts.map(product => (
                  <div key={product._id} className="relative group">
                    <ProductItem product={product} />
                    
                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveFromWishlist(product._id);
                        }}
                        className="bg-white p-2 flex text-black gap-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                        title="Remove from wishlist"
                      >
                        <FaHeartBroken className="text-red-500 text-lg" />Remove
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProduct(selectedProduct?._id === product._id ? null : product);
                          setSize('');
                        }}
                        className="bg-white p-2 flex text-black gap-2 rounded-full shadow-md hover:bg-blue-50 transition-colors"
                        title="Add to cart"
                      >
                        <FaShoppingCart className="text-blue-500 text-lg" />Move to cart
                      </button>
                    </div>
                    
                    {/* Size Selector Popup */}
                    {selectedProduct?._id === product._id && (
                      <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg rounded-b-lg border-t border-gray-200">
                        <div className="mb-3">
                          <h3 className="font-medium text-gray-700 mb-2">Select Size:</h3>
                          <div className="flex gap-2 flex-wrap">
                            {product.sizes?.map((item, index) => {
                              const displaySize = item === 'small' ? 'S' : 
                                                item === 'medium' ? 'M' : 
                                                item === 'large' ? 'L' : item;
                              return (
                                <button
                                  onClick={() => setSize(item)}
                                  className={`btn btn-soft text-lg text-black h-10 w-10 ring-1 ring-blue-900 cursor-pointer transition ${
                                    item === size ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                  }`}
                                  key={index}
                                >
                                  {displaySize}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
                            disabled={!size}
                          >
                            <FaShoppingCart />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                <FaHeartBroken className="text-gray-400 text-4xl" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Save items you love by clicking the heart icon
              </p>
              <Link
                to="/"
                className="btn btn-primary px-6 py-2 rounded-full"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full mb-4">
            <FaHeartBroken className="text-gray-400 text-4xl" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Please login to view your wishlist</h2>
          <p className="text-gray-600 mb-6">
            Sign in to see items you've saved
          </p>
          <Link
            to="/login"
            className="btn btn-primary px-6 py-2 rounded-full"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;