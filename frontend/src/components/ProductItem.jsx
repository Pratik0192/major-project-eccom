import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductItem = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-white border border-gray-200 rounded-lg p-4 shadow-sm transition duration-300 ${
        isHovered ? "scale-105 shadow-md" : "scale-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    > {/* Scaling and hover effects are on THIS div */}
      {/* Wishlist Icon (remains inside) */}
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

      {/* Product Image (remains inside) */}
      <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />

      {/* Product Details (remains inside) */}
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">
        ⭐ {product.rating} ({product.reviews} reviews)
      </p>
      <p className="text-gray-600 text-sm">Size: {product.size || "Medium"}</p>
      <p className="text-gray-600 text-sm">Power: {product.power || "Zero Power"}</p>

      {/* Price & Offered Price (remains inside) */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-red-500 font-semibold">₹{product.offeredPrice}</span>
        <span className="text-gray-500 line-through">₹{product.originalPrice}</span>
      </div>

      {/* Color Options (remains inside) */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm text-gray-700">Colors:</span>
        <div className="flex gap-1">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className="w-5 h-5 rounded-full border border-gray-500"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;