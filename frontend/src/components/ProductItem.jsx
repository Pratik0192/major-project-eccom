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
        {/* Wishlist Icon */}
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevents Link navigation on button click
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 text-2xl transition-transform transform hover:scale-110"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-600 hover:text-blue-500" />
          )}
        </button>

        {/* Product Image */}
        <div className="h-56 overflow-hidden flex items-center justify-center">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-contain transition-opacity duration-300"
          />
        </div>

        <hr className="my-4 mt-0" />

        {/* Product Details */}
        <h3 className="mt-2 font-semibold text-base">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-600">
          ⭐ {product.rating} ({product.reviews} reviews)
        </p>
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Colors:</span>
            <div className="text-sm flex gap-1">{product.frameColour}</div>
          </div>

        {/* Price & Offered Price */}
        <div className="flex justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-semibold">₹{product.discounted_price}</span>
            <span className="text-blue-900 line-through">₹{product.price}</span>
          </div>

          {/* Color Options */}
          
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;