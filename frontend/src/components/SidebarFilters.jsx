import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";

const SidebarFilters = () => {
  const { category } = useParams(); // Get category from URL params
  const { products } = useContext(ShopContext);
  const [openSections, setOpenSections] = useState({
    brand: true,
    frameColour: true,
    sizes: true,
  });

  const toggleSection = (section) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] });
  };

  // Filter products based on the selected category
  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  // Extract unique brands and their count
  const brandCounts = filteredProducts.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {});

  const brands = Object.keys(brandCounts).map((brand) => ({
    name: brand,
    count: brandCounts[brand],
  }));

  // Extract unique frame colours and their count
  const colourCounts = filteredProducts.reduce((acc, product) => {
    acc[product.frameColour] = (acc[product.frameColour] || 0) + 1;
    return acc;
  }, {});

  const frameColours = Object.keys(colourCounts).map((colour) => ({
    name: colour,
    count: colourCounts[colour],
  }));

  // Extract unique frame sizes and their count
  const sizeCounts = filteredProducts.reduce((acc, product) => {
    if (Array.isArray(product.sizes)) { // Ensure sizes is an array
      product.sizes.forEach((size) => {
        acc[size] = (acc[size] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const frameSizes = Object.keys(sizeCounts).map((size) => ({
    name: size,
    count: sizeCounts[size],
  }));

  return (
    <div className="w-64 p-4 border-r border-gray-200">
      {/* Brands Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("brand")}
        >
          <h3 className="font-semibold text-lg">BRANDS</h3>
          {openSections.brand ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.brand && (
          <div className="mt-2 space-y-2">
            {brands.length > 0 ? (
              brands.map((brand, index) => (
                <label key={index} className="flex items-center space-x-2 text-gray-700">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>
                    {brand.name} <span className="text-gray-500">({brand.count})</span>
                  </span>
                </label>
              ))
            ) : (
              <p className="text-gray-500">No brands available</p>
            )}
          </div>
        )}
      </div>

      {/* Frame Colours Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("frameColour")}
        >
          <h3 className="font-semibold text-lg">FRAME COLOURS</h3>
          {openSections.frameColour ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.frameColour && (
          <div className="mt-2 space-y-2">
            {frameColours.length > 0 ? (
              frameColours.map((colour, index) => (
                <label key={index} className="flex items-center space-x-2 text-gray-700">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>
                    {colour.name} <span className="text-gray-500">({colour.count})</span>
                  </span>
                </label>
              ))
            ) : (
              <p className="text-gray-500">No frame colours available</p>
            )}
          </div>
        )}
      </div>

      {/* Frame Size Filter */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("sizes")}
        >
          <h3 className="font-semibold text-lg">FRAME SIZES</h3>
          {openSections.sizes ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.sizes && (
          <div className="mt-2 space-y-2">
            {frameSizes.length > 0 ? (
              frameSizes.map((size, index) => (
                <label key={index} className="flex items-center space-x-2 text-gray-700">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>
                    {size.name} <span className="text-gray-500">({size.count})</span>
                  </span>
                </label>
              ))
            ) : (
              <p className="text-gray-500">No frame sizes available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFilters;
