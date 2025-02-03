import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Sample image URLs (Replace these with actual icons)
const frameTypes = [
  { name: "Full Rim", image: "src/assets/full rim.jpg" },
  { name: "Half Rim", image: "src/assets/half rim.jpg" },
];

const frameShapes = [
  { name: "Wayfarer", image: "src/assets/wayfarer shape.jpg" },
  { name: "Round", image: "src/assets/round shape.jpg" },
  { name: "Rectangle", image: "src/assets/rectangle shape.jpg" },
  { name: "Geometric", image: "src/assets/geometric shape.jpg" },
  { name: "Square", image: "src/assets/square shape.jpg" },
  { name: "Aviator", image: "src/assets/aviator shape.jpg" },
  { name: "Cat Eye", image: "src/assets/cateye shape.jpg" },
  { name: "Clubmaster", image: "src/assets/clubmaster shape.jpg" },
];

const SidebarFilters = () => {
  const [openSections, setOpenSections] = useState({
    frameType: true,
    frameShape: true,
    frameSize: false,
    frameColor: false,
    price: false,
    gender: false,
    material: false,
    weightGroup: false,
    prescriptionType: false,
    supportedPowers: false,
    subCollection: false,
    frameWidth: false,
    productType: false,
  });

  const toggleSection = (section) => {
    setOpenSections({ ...openSections, [section]: !openSections[section] });
  };

  return (
    <div className="w-1/4 bg-white p-4 border-r overflow-y-auto h-screen">
      {/* Frame Type */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("frameType")}
        >
          <h3 className="font-bold text-lg">Frame Type</h3>
          {openSections.frameType ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.frameType && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {frameTypes.map((item) => (
              <button
                key={item.name}
                className="border p-2 rounded-lg flex flex-col items-center hover:bg-gray-200"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-contain"
                />
                <span className="text-sm mt-1">{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Frame Shape */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("frameShape")}
        >
          <h3 className="font-bold text-lg">Frame Shape</h3>
          {openSections.frameShape ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openSections.frameShape && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {frameShapes.map((item) => (
              <button
                key={item.name}
                className="border p-2 rounded-lg flex flex-col items-center hover:bg-gray-200"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-contain"
                />
                <span className="text-sm mt-1">{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Remaining Filter Sections */}
      {[
        {
          key: "frameSize",
          title: "Frame Size",
          options: ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide"],
        },
        {
          key: "frameColor",
          title: "Frame Color",
          options: [
            "Black",
            "Blue",
            "Brown",
            "Gold",
            "Green",
            "Grey",
            "Pink",
            "Purple",
            "Red",
            "Silver",
            "Transparent",
            "White",
          ],
        },
        {
          key: "price",
          title: "Price",
          options: ["Under ₹999", "₹1000 - ₹1999", "₹2000 - ₹2999", "₹3000+"],
        },
        {
          key: "gender",
          title: "Gender",
          options: ["Men", "Women", "Unisex", "Kids"],
        },
        {
          key: "material",
          title: "Material",
          options: ["Metal", "Acetate", "Plastic", "TR90", "Titanium", "Wood"],
        },
        {
          key: "weightGroup",
          title: "Weight Group",
          options: ["Ultra Light", "Light", "Standard", "Heavy"],
        },
        {
          key: "prescriptionType",
          title: "Prescription Type",
          options: ["Single Vision", "Progressive", "Bifocal", "Non-Prescription"],
        },
        {
          key: "supportedPowers",
          title: "Supported Powers",
          options: ["0 to -2.00", "-2.00 to -4.00", "-4.00 to -6.00", "Above -6.00"],
        },
        {
          key: "subCollection",
          title: "Sub Collection",
          options: ["Air Flex", "Classic", "Premium", "Blue Cut Lenses", "Sunglasses", "Computer Glasses"],
        },
        {
          key: "frameWidth",
          title: "Frame Width",
          options: ["Narrow", "Medium", "Wide"],
        },
        {
          key: "productType",
          title: "Product Type",
          options: ["Eyeglasses", "Sunglasses", "Contact Lenses", "Reading Glasses"],
        },
      ].map(({ key, title, options }) => (
        <div key={key} className="mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(key)}>
            <h3 className="font-bold text-lg">{title}</h3>
            {openSections[key] ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {openSections[key] && (
            <div className="mt-2 space-y-2">
              {options.map((option) => (
                <label key={option} className="flex items-center space-x-2 text-gray-700">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarFilters;
