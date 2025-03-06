import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SidebarFilters = ({ products = [], setFilteredProducts }) => {
  if (!products || products.length === 0) return <p>Loading filters...</p>;
  const [openSections, setOpenSections] = useState({
    brand: true,
    frameColour: true,
    sizes: true,
  });

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColours, setSelectedColours] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleSection = (section) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] });
  };
  

  // Extract unique brands and their count
  const brandCounts = products.reduce((acc, product) => {
    acc[product.brand] = (acc[product.brand] || 0) + 1;
    return acc;
  }, {});

  const brands = Object.keys(brandCounts).map((brand) => ({
    name: brand,
    count: brandCounts[brand],
  }));

  // Extract unique frame colours and their count
  const colourCounts = products.reduce((acc, product) => {
    acc[product.frameColour] = (acc[product.frameColour] || 0) + 1;
    return acc;
  }, {});

  const frameColours = Object.keys(colourCounts).map((colour) => ({
    name: colour,
    count: colourCounts[colour],
  }));

  // Extract unique frame sizes and their count
  const sizeCounts = products.reduce((acc, product) => {
    if (Array.isArray(product.sizes)) {
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

  // Function to apply all filters
  const applyFilters = (brands, colours, sizes) => {
    let filtered = products;
  
    if (brands.length > 0) {
      filtered = filtered.filter((product) => brands.includes(product.brand));
    }
  
    if (colours.length > 0) {
      filtered = filtered.filter((product) => colours.includes(product.frameColour));
    }
  
    if (sizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes?.some((size) => sizes.includes(size))
      );
    }
  
    setFilteredProducts(filtered);
  };
  
  

  // Toggle selection in filters
  const toggleFilter = (type, value) => {
    let updatedList;
  
    if (type === "brand") {
      updatedList = selectedBrands.includes(value)
        ? selectedBrands.filter((b) => b !== value)
        : [...selectedBrands, value];
      setSelectedBrands(updatedList);
    } else if (type === "colour") {
      updatedList = selectedColours.includes(value)
        ? selectedColours.filter((c) => c !== value)
        : [...selectedColours, value];
      setSelectedColours(updatedList);
    } else if (type === "size") {
      updatedList = selectedSizes.includes(value)
        ? selectedSizes.filter((s) => s !== value)
        : [...selectedSizes, value];
      setSelectedSizes(updatedList);
    }
  
    // Apply filters with updated selections
    applyFilters(
      type === "brand" ? updatedList : selectedBrands,
      type === "colour" ? updatedList : selectedColours,
      type === "size" ? updatedList : selectedSizes
    );
  };
  

  return (
    <div className="w-64 p-4 border-r border-gray-200">
      {/* Brands Filter */}
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("brand")}>
          <h3 className="font-semibold text-lg">BRANDS</h3>
          {openSections.brand ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.brand && (
          <div className="mt-2 space-y-2">
            {brands.map((brand, index) => (
              <label key={index} className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={() => toggleFilter("brand", brand.name)}
                />
                <span>
                  {brand.name} <span className="text-gray-500">({brand.count})</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Frame Colours Filter */}
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("frameColour")}>
          <h3 className="font-semibold text-lg">FRAME COLOURS</h3>
          {openSections.frameColour ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.frameColour && (
          <div className="mt-2 space-y-2">
            {frameColours.map((colour, index) => (
              <label key={index} className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedColours.includes(colour.name)}
                  onChange={() => toggleFilter("colour", colour.name)}
                />
                <span>
                  {colour.name} <span className="text-gray-500">({colour.count})</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Frame Size Filter */}
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("sizes")}>
          <h3 className="font-semibold text-lg">FRAME SIZES</h3>
          {openSections.sizes ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.sizes && (
          <div className="mt-2 space-y-2">
            {frameSizes.map((size, index) => (
              <label key={index} className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedSizes.includes(size.name)}
                  onChange={() => toggleFilter("size", size.name)}
                />
                <span>
                  {size.name} <span className="text-gray-500">({size.count})</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFilters;
