import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { BaggageClaim, Check, Heart, Truck } from "lucide-react";
import tryon from '../assets/3d.jpg';
import Loading from "../components/Loading";
import Cartjson from '../assets/cartt.json';
import Lottie from 'lottie-react'

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
    <div className="bg-white">
      {/* Product Details Section */}
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="flex flex-col md:flex-row gap-8 mt-2 ring-blue-950">
         {/* Left Side - Product Images */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-2">
          <div className="relative w-full">
            {/* Carousel */}
            <div className="carousel rounded-box">
              {productData.image.map((img, index) => (
                <div className="carousel-item relative w-full vignette-effect" key={index}>
                  <img 
                    src={img} 
                    alt={`${productData.name} view ${index + 1}`} 
                    className="w-full max-h-[300px] sm:max-h-[400px] md:max-h-[400px] lg:max-h-[450px] object-contain" 
                  />
                  {/* Navigation Buttons */}
                  <div className="hidden md:flex absolute top-1/2 transform -translate-y-1/2 w-full px-2 sm:px-4 justify-between">
                    <button className="btn btn-circle bg-white text-gray-800 hover:bg-gray-200 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">❮</button>
                    <button className="btn btn-circle bg-white text-gray-800 hover:bg-gray-200 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">❯</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Product Name Below Image */}
            <div className="text-white bg-blue-950 text-center font-bold text-2xl sm:text-3xl md:text-4xl w-full py-2">
              {productData.name}
            </div>
          </div>

          
            {/* Right Side - Product Description */}
            <div className="w-full md:w-1/2 px-4 shadow-sm">
              <div className="bg-white rounded-lg p-6">
              
              {/* Pricing Section */}
              <div className="flex flex-wrap items-center justify-between text-gray-700">
                <span className="text-3xl sm:text-4xl text-gray-700 line-through">
                  ₹{productData.price}.00
                </span>
                <span className="hidden md:block ml-2 bg-yellow-200 text-yellow-900 font-medium">
                  {Math.round(((productData.price - productData.discounted_price) / productData.price) * 100)}% OFF
                </span>
                <div className="ml-auto text-green flex items-center">
                  <span className="inline-block" >
                    <Lottie animationData={Cartjson} className='w-[50px]'/>
                  </span>
                  <p className="text-green-700 ml-2 text-sm md:text-lg">In Stock</p>
                </div>
              </div>

              {/* Discounted Price */}
              <div className="flex flex-wrap items-center justify-between text-gray-700 ">
                <span className="text-4xl md:text-6xl font-bold text-gray-900"> ₹{productData.discounted_price} </span>
                <div className="ml-auto text-green flex">
                  <Truck className="w-5 md:w-7" />
                  <p className="ml-2 text-sm md:text-lg">Shipping</p>
                </div>
              </div>

              {/* Rating Section */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs sm:text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                  ⭐ {productData.rating} ({productData.reviews} reviews)
                </span>
              {/* Try-On Image */}
                <div className="mb-6">
                  <img src={tryon} className="w-12 sm:w-16 md:w-20 mx-auto lg:mx-0 cursor-pointer" alt="Try on" />
                </div>
              </div>

                {/* Details */}
                <div className="text-gray-800 mb-4" >
                  <h3 className="text-2xl font-bold" >Benefits</h3>
                  <span className="text-gray-800 flex mt-2" ><Check className="text-green-600"/> <p className="ml-2">UV protection</p></span>
                  <span className="text-gray-800 flex mt-2" ><Check className="text-green-600"/> <p className="ml-2">Polarization</p></span>
                  <span className="text-gray-800 flex mt-2" ><Check className="text-green-600"/> <p className="ml-2">Anti-reflective Lenses</p></span>
                </div>

                
              {/* Countdown for Free Delivery */}
              <div className="mt-4 text-sm md:text-lg font-semibold text-gray-900 mb-2">
                Free delivery if ordered within <span className="text-red-500">{minutes}m {seconds}s</span>
              </div>

                {/* Product Details */}
                <div className="space-y-3 mb-4">
                <p className="text-gray-700"><span className="font-medium">Power:</span> {productData.power || "Zero Power"}</p>
                <p className="text-gray-700"><span className="font-medium">Frame Color:</span> {productData.frameColour}</p>

                {/* Select Size */}
                <div className="flex flex-col gap-4">
                  <p className="font-medium text-gray-700">Select Size:</p>
                  <div className="flex gap-2 flex-wrap">
                    {productData.sizes.map((item, index) => {
                      const displaySize = item === 'small' ? 'S' : item === 'medium' ? 'M' : item === 'large' ? 'L' : item;
                      return (
                        <button
                          onClick={() => setSize(item)}
                          className={`btn btn-soft text-lg text-black h-12 w-12 ring-1 ring-blue-900 cursor-pointer transition ${
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

              
              {/* Buttons Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={() => addToCart(productData._id, size)}
                  className="px-6 py-2 w-full md:w-70  font-medium bg-blue-800 rounded text-white text-2xl transition-all shadow-md hover:shadow-none cursor-pointer"
                >
                  Add to Cart
                </button>
                <button
                  className="px-6 py-2 w-full md:w-70 font-medium bg-gray-100 ring rounded text-blue-800 text-2xl transition-all shadow-md hover:shadow-none cursor-pointer"
                >
                  Buy Now
                </button>
                <Link to="/wishlist" className="hidden md:block cursor-pointer text-black hover:text-blue-500 flex items-center gap-2">
                  <Heart className="w-6 h-6 sm:w-11 sm:h-11 text-blue-800"/>
                </Link>
              </div>



              <div className="collapse collapse-plus bg-base-100 bg-white">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title font-semibold text-gray-700">Technical Information</div>
                <div className="collapse-content text-sm">
                       <p className="text-gray-700"><span className="font-medium">Category:</span> {productData.category || "Kids"}</p>
                      <p className="text-gray-700"><span className="font-medium">Frame Colour:</span> {productData.frameColour || "Medium"}</p>
                      <p className="text-gray-700"><span className="font-medium">Frame Dimensions:</span> {productData.frameDimensions || "Medium"}</p>
                      <p className="text-gray-700"><span className="font-medium">Frame Width:</span> {productData.frameWidth || "Medium"}</p>
                      <p className="text-gray-700"><span className="font-medium">Sub Category:</span> {productData.subCategory || "Medium"}</p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100 bg-white">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title font-semibold text-gray-700">Warranty</div>
                <div className="collapse-content text-sm text-gray-700">The product comes with a comprehensive warranty that covers manufacturing defects and malfunctions. It provides peace of mind and assurance of product quality. Customers can enjoy reliable support and prompt assistance for any issues related to the product during the warranty period.</div>
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
    </div>
  );
};

export default SinglePage;