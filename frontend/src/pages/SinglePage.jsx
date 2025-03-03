import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navbar1 from "../components/Navbar1";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Footer from "../components/Footer";
import { Heart } from "lucide-react";
import tryon from '../assets/3d.jpg';

const SinglePage = () => {
  const { products } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = () => {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setSelectedImage(foundProduct.image[0]);
        
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

  const handleImageChange = (newImage) => {
    setSelectedImage(newImage);
  };

  if (!productData) {
    return (
      <>
        <div className="sticky top-0 z-40 bg-white shadow-md">
          <Navbar />
          <Navbar1 />
      </div>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading product details...</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Product Details Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Product Images */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <img
                src={selectedImage}
                alt={productData.name}
                className="w-full h-80 object-contain mb-4"
              />
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto justify-center">
                {productData.image.map((img, index) => (
                  <div 
                    key={index}
                    className={`w-16 h-16 border rounded cursor-pointer ${
                      selectedImage === img ? 'border-blue-900 border-2' : 'border-gray-200'
                    }`}
                    onClick={() => handleImageChange(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${productData.name} view ${index + 1}`} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side - Product Description */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center  mb-6" >
                <h1 className="text-2xl font-bold mb-2">{productData.name}</h1>
                <li className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
                  <Heart className="w-7 h-7"/>
                </li>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm bg-yellow-100 px-2 py-1 rounded">
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
              
              <hr className="my-4" />
              
              {/* Product Details */}
              <div className="space-y-3 mb-6">
                <p className="text-gray-700"><span className="font-medium">Size:</span> {productData.size || "Medium"}</p>
                <p className="text-gray-700"><span className="font-medium">Power:</span> {productData.power || "Zero Power"}</p>
                <p className="text-gray-700"><span className="font-medium">Frame Color:</span> {productData.frameColour}</p>
                {productData.description && (
                  <p className="text-gray-700">{productData.description}</p>
                )}
              </div>

              <div className="mb-6">
                <img src={tryon} className="w-16 sm:w-20 mx-auto lg:mx-0 cursor-pointer" alt="Try on" />
              </div>
              
              {/* Add to Cart & Buy Now Buttons */}
              <div className="flex gap-4 mb-6">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded transition cursor-pointer">
                  Add to Cart
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition cursor-pointer">
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
            </div>
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          
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
      <Footer />
    </>
  );
};

export default SinglePage;