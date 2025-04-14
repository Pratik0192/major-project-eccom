import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import Slider from "@mui/material/Slider";

const SidebarFilters = ({ setFilteredProducts }) => {
  const { category } = useParams();
  const { products } = useContext(ShopContext);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColours, setSelectedColours] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [openSections, setOpenSections] = useState({
    brand: true,
    frameColour: true,
    sizes: true,
    price: true,
  });

  const toggleSection = (section) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] });
  };

  const handleCheckboxChange = (value, list, setList) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  useEffect(() => {
    if (!products.length) return;

    const filteredProducts = products.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesBrand = selectedBrands.length ? selectedBrands.includes(product.brand) : true;
      const matchesColour = selectedColours.length ? selectedColours.includes(product.frameColour) : true;
      const matchesSize = selectedSizes.length ? product.sizes.some((size) => selectedSizes.includes(size)) : true;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesCategory && matchesBrand && matchesColour && matchesSize && matchesPrice;
    });

    setFilteredProducts(filteredProducts);
  }, [selectedBrands, selectedColours, selectedSizes, priceRange, category, products, setFilteredProducts]);

  return (
    <div className="w-64 p-4 border-r border-gray-200">
      {/* Price Filter */}
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("price")}>
          <h3 className="font-semibold text-gray-700 text-lg">PRICE</h3>
          {openSections.price ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.price && (
          <div className="mt-2 text-gray-700">
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue)}
            />
            <div className="flex justify-between text-sm mt-2">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      <hr className="border-gray-300 "  />

      
      <div className="mb-4 mt-4">
        <div className="flex justify-between items-center text-gray-700 cursor-pointer" onClick={() => toggleSection("brand")}>
          <h3 className="font-semibold text-gray-700 text-lg">BRANDS</h3>
          {openSections.brand ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.brand && (
          <div className="mt-2 space-y-2">
            {[...new Set(products.map((p) => p.brand))].map((brand, index) => (
              <label key={index} className="flex items-center space-x-2 text-gray-700">
                <input type="checkbox" className="checkbox checkbox-primary w-4 h-4" checked={selectedBrands.includes(brand)} onChange={() => handleCheckboxChange(brand, selectedBrands, setSelectedBrands)} />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="border-gray-300 "  />
      
      <div className="mb-4 mt-4">
        <div className="flex justify-between items-center text-gray-700 cursor-pointer" onClick={() => toggleSection("frameColour")}>
          <h3 className="font-semibold text-gray-700 text-lg">FRAME COLOURS</h3>
          {openSections.frameColour ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.frameColour && (
          <div className="mt-2 space-y-2">
            {[...new Set(products.map((p) => p.frameColour))].map((colour, index) => (
              <label key={index} className="flex items-center space-x-2 text-gray-700">
                <input type="checkbox" className="checkbox checkbox-info w-4 h-4" checked={selectedColours.includes(colour)} onChange={() => handleCheckboxChange(colour, selectedColours, setSelectedColours)} />
                <span>{colour}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="border-gray-300 "  />

      
      <div className="mb-4 mt-4">
        <div className="flex justify-between text-gray-700 items-center cursor-pointer" onClick={() => toggleSection("sizes")}>
          <h3 className="font-semibold text-lg">FRAME SIZES</h3>
          {openSections.sizes ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.sizes && (
          <div className="mt-2 space-y-2">
            {[...new Set(products.flatMap((p) => p.sizes))].map((size, index) => (
              <label key={index} className="flex items-center space-x-2 text-gray-700">
                <input type="checkbox" className="checkbox checkbox-primary w-4 h-4" checked={selectedSizes.includes(size)} onChange={() => handleCheckboxChange(size, selectedSizes, setSelectedSizes)} />
                <span>{size}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFilters;
