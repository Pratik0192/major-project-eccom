import { CircleArrowOutUpLeft, ScanSearch, Search, Star } from "lucide-react";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image[0]); // Default image

  // Ensure product.colors is an array
  const productColors = Array.isArray(product.colors) ? product.colors : [];

  return (
    <Link to={`/product/${product._id}`}>
      <div
        className={`relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition duration-300 ${
          isHovered ? "scale-101 shadow-md" : "scale-100"
        }`}
        onMouseEnter={() => {
          setIsHovered(true);
          if (product.image.length > 1) {
            setCurrentImage(product.image[1]); // Show second image on hover
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImage(product.image[0]); // Reset to first image
        }}
      >   

      <div className="badge badge-primary items-center">{Math.round(((product.price - product.discounted_price) / product.price) * 100)}% OFF</div>

        {/* Wishlist Icon */}
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevents Link navigation on button click
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 text-2xl transition-transform transform hover:scale-110 cursor-pointer"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500"  />
          ) : (
            <FaRegHeart className="text-gray-600 hover:text-blue-500" />
          )}
        </button>

        {/* Product Image */}
        <div className="h-40 lg:h-56 overflow-hidden flex items-center justify-center">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-contain transition-opacity duration-300"
          />
        </div>


        <div className="divider divider-primary">
        <div className="mt-2 text-sm lg:text-sm truncate w-full text-gray-700 font-medium overflow-hidden whitespace-nowrap">
          {product.name}
        </div>
      </div>

        <div className="bg-gradient-to-r from-cyan-50 to-sky-50" >
        <p className="mt-2 text-sm text-gray-600 flex gap-1 ">
          <Star className="w-4" /> {product.rating} ({product.reviews} reviews)
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs lg:text-sm text-gray-700">Colors:</span>
          <p className="text-xs lg:text-sm flex gap-1 truncate w-full overflow-hidden whitespace-nowrap">
            {product.frameColour}
          </p>
        </div>
        
        {/* Price & Offered Price */}
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-semibold">₹{product.discounted_price}</span>
            <span className="text-blue-900 line-through">₹{product.price}</span>
          </div>          
        </div>
        
        <div className="flex justify-between" >
          <p className="text-sm text-gray-700" >Price dropped by <span className="text-lg font-bold text-pink-500"  >₹{product.price - product.discounted_price}</span></p>
            <div className="dropdown dropdown-top dropdown-end dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1 rounded-2xl border-2 border-dashed border-black bg-white px-3 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"> <Search className="w-5 h-5" /> </div>
              <ul tabIndex={0} className="dropdown-content font-semibold menu bg-gray-100 rounded-box z-1 w-52 p-2 shadow-sm border-2 border-dashed">
                <li><a>Name: {product.name} </a></li>
                <li><a>Category: {product.category }</a></li>
                <li><a>Frame Width: {product.frameWidth} </a></li>
                <li><a>Frame Dimensions: {product.frameDimensions} </a></li>
                <li><a>Brand: {product.brand} </a></li>
              </ul>
            </div>
        </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;