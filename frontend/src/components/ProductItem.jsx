import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProductItem = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Ensure product.colors is an array
  const productColors = Array.isArray(product.colors) ? product.colors : [];

  return (
    <Link to={`/product/${product._id}`}>
       <div
          className={`relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition duration-300 ${
            isHovered ? "scale-105 shadow-md" : "scale-100"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Wishlist Icon */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-3 right-3 text-2xl transition-transform transform hover:scale-110"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-600 hover:text-red-500" />
            )}
          </button>

          {/* Product Image */}
          <img src={product.image[0]} alt={product.name} className="w-full h-40 object-contain" />

          {/* Product Details */}
          <h3 className="mt-2 font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600">
            ⭐ {product.rating} ({product.reviews} reviews)
          </p>
          <p className="text-gray-600 text-sm">Size: {product.sizes[0] || "Medium"}</p>
          <p className="text-gray-600 text-sm">Power: {product.power || "Zero Power"}</p>

          {/* Price & Offered Price */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-blue-500 font-semibold">₹{product.discounted_price
    }</span>
            <span className="text-blue-900 line-through">₹{product.price}</span>
          </div>

          {/* Color Options */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-700">Colors:</span>
            <div className="flex gap-1">
              {product.frameColour}  
            </div>
          </div>
        </div>
    </Link>
   
  );
};

export default ProductItem;
