import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navbar1 from "../components/Navbar1";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { Heart } from "lucide-react";
import tryon from '../assets/3d.jpg';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion components
import Loading from "../components/Loading";

const SinglePage = () => {
  const { products, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [openSections, setOpenSections] = useState({ technicalInfo: false });
  const [size, setSize] = useState('');
  const [countdown, setCountdown] = useState(3600); // Countdown in seconds (1 hour)

  useEffect(() => {
    const fetchProductData = () => {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        
        // Find related products (same category or similar products)
        const related = products
          .filter((item) => 
            item._id !== productId && 
            (item.category === foundProduct.category || 
             item.name.includes(foundProduct.name.split(" ")[0]))
          )
          .slice(0, 4); // Limit to 4 related products
        
        setRelatedProducts(related);
      }
    };
    
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!productData) {
    return (
      <>
        <div className="sticky top-0 z-40 bg-white shadow-md">
          <Navbar />
          <Navbar1 />
        </div>
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      </>
    );
  }

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { minutes, seconds: secs };
  };

  const { minutes, seconds } = formatTime(countdown);

  return (
    <>
      {/* Product Details Section */}
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Product Images */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg p-4 ">
              {/* Grid layout with two images per row */}
              <div className="grid grid-cols-2 gap-4">
                {productData.image.map((img, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded overflow-hidden hover:scale-105 transition-transform duration-300`} // Added hover effect
                  >
                    <img 
                      src={img} 
                      alt={`${productData.name} view ${index + 1}`} 
                      className="border border-gray-200 w-full h-90 object-contain" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side - Product Description */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg p-6 shadow-lg shadow-blue-700">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl text-blue-700 font-bold mb-2">{productData.name}</h1>
                <Link to='/wishlist' className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
                  <Heart className="w-7 h-7"/>
                </Link>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                  ⭐ {productData.rating} ({productData.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-blue-500">
                  ₹{productData.discounted_price}
                </span>
                <span className="text-lg text-blue-900 line-through">
                  ₹{productData.price}
                </span>
                <span className="text-green-600 text-sm font-medium">
                  {Math.round(((productData.price - productData.discounted_price) / productData.price) * 100)}% OFF
                </span>
              </div>

              {/* Countdown for Free Delivery */}
              <div className="mt-4 text-sm lg:text-lg font-semibold text-gray-500">
                Free delivery if ordered within <span className="text-red-500" >{minutes}m {seconds}s</span>
              </div>
          
              <hr className="my-4" />
              
              {/* Product Details */}
              <div className="space-y-3 mb-6">
                <p className="text-gray-700"><span className="font-medium">Power:</span> {productData.power || "Zero Power"}</p>
                <p className="text-gray-700"><span className="font-medium">Frame Color:</span> {productData.frameColour}</p>
                <div className="flex flex-col gap-4">
                  <p className="font -medium text-gray-700">Select Size:</p>
                  <div className="flex gap-2">
                    {productData.sizes.map((item, index) => {
                      const displaySize = item === 'small' ? 'S' : item === 'medium' ? 'M' : item === 'large' ? 'L' : item;

                      return (
                        <button 
                          onClick={() => setSize(item)} 
                          className={`btn btn-circle text-lg h-18 text-blue-500 w-18 ring-1 ring-blue-900 cursor-pointer transition ${
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

                {productData.description && (
                  <p className="text-gray-700">{productData.description}</p>
                )}
              </div>

              <div className="mb-6">
                <img src={tryon} className="w-16 sm:w-20 mx-auto lg:mx-0 cursor-pointer sm:ml-0 " alt="Try on" />
              </div>
              
              {/* Add to Cart & Buy Now Buttons */}
              <div className="flex gap-4 mb-6">
                <div className="bg-white flex items-center justify-center">
                  <button onClick={() => addToCart(productData._id, size)} className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] cursor-pointer ">
                    Add to Cart
                  </button>
                </div>
                <button className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none cursor-pointer">
                  Buy Now
                </button>
              </div>
              
              {/* Additional Product Features */}
              {productData.features && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {productData.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className='pt-5'>
                <div className='bg-white mb-2 rounded cursor-pointer' onClick={() => toggleSection('technicalInfo')}> 
                  <div className='flex justify-between items-center p-2'>
                    <span className="text-gray-700">Technical Information</span>
                    {openSections.technicalInfo ? <FaChevronUp className="text-gray-700"/> : <FaChevronDown className="text-gray-700"/>}
                  </div>  
                </div>
                <hr className="my-4 bg-gray-700" />
                <AnimatePresence>
                  {openSections.technicalInfo && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 rounded"
                    >
                      <p className="text-gray-700"><span className="font-medium">Category:</span> {productData.category || "Kids"}</p>
                      <p className="text-gray-700"><span className="font-medium">Frame Colour:</span> {productData.frameColour || "Medium"}</p>
                      <p className="text-gray-700"><span className="font-medium">Frame Dimensions:</span> {productData.frameDimensions || "Medium"}</p>
                      <p className="text-gray-700"><span className="font-medium">Frame Width:</span> {productData.frameWidth || "Medium"}</p>
                      <p className="text-gray-700"><span className="font-medium">Sub Category:</span> {productData.subCategory || "Medium"}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-xl text-black font-bold mb-6">Related Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
          
          {relatedProducts.length === 0 && (
            <p className="text-gray-500 text-center py-8">No related products found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePage;