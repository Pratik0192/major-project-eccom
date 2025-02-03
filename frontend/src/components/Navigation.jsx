import React, { useState } from "react";
import { motion } from "framer-motion";
import eyeglass from "../assets/eyeglass.jpg";
import power from "../assets/powersunglass.jpg";
import progressive from "../assets/progressive.jpg";
import screen from "../assets/screen.jpg";
import sunglass from "../assets/sunglass.jpg";

const ProductDropdown = ({ title, image, products }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative border border-gray-300 rounded-lg shadow-md bg-white w-56 md:w-64 transition-all duration-300 hidden sm:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dropdown Toggle */}
      <div className="flex flex-col items-center p-4 cursor-pointer hover:bg-gray-100 transition">
        <img src={image} alt={title} className="w-22 h-22 object-contain" />
        <p className="text-gray-700 font-medium mt-2">{title}</p>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute left-0 top-full mt-1 w-full bg-white shadow-md rounded-md z-50 p-3"
        >
          {products.map((product, index) => (
            <div key={index} className="py-2 border-b last:border-none">
              <div className="flex justify-between text-sm font-semibold">
                <p>{product.name}</p>
                <p className="text-gray-500">Starting</p>
              </div>
              <p className="text-blue-600 font-bold">₹{product.price}</p>
            </div>
          ))}
          <p className="text-blue-500 font-semibold text-center mt-2 cursor-pointer hover:underline">View All</p>
        </motion.div>
      )}
    </div>
  );
};

// Main Component Rendering Multiple Dropdowns
const Navigation = () => {
  const categories = [
    {
      title: "Eyeglasses",
      image: eyeglass,
      products: [
        { name: "Air Light-Weight", price: 2000 },
        { name: "Premium Eyeglasses", price: 3500 },
        { name: "Kids Glasses", price: 800 },
      ],
    },
    {
      title: "Sunglasses",
      image: sunglass,
      products: [
        { name: "Polarized Glasses", price: 2500 },
        { name: "Lens Cleaner", price: 110 },
      ],
    },
    {
      title: "Progressive Lenses",
      image: progressive,
      products: [
        { name: "Daily Lenses", price: 1500 },
        { name: "Lens Solution", price: 300 },
      ],
    },
    {
      title: "Power Sunglasses",
      image: power,
      products: [
        { name: "Daily Lenses", price: 1500 },
        { name: "Lens Solution", price: 300 },
      ],
    },
    {
      title: "Screen Glasses",
      image: screen,
      products: [
        { name: "Lens Wipes", price: 150 },
        { name: "Glass Case", price: 500 },
      ],
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-2 justify-center items-center p-6 bg-gray-100">
      {categories.map((category, index) => (
        <ProductDropdown key={index} {...category} />
      ))}
    </div>
  );
};

export default Navigation;
