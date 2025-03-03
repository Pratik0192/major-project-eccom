import React, { useState, useEffect } from 'react';

const SortingOptions = ({ onSortChange }) => {
  const [sortValue, setSortValue] = useState('best-sellers');
  const [viewOption, setViewOption] = useState('frames');

  const handleViewOptionChange = (option) => {
    setViewOption(option);
    console.log("Selected View:", option);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sortingOptions = document.getElementById('sorting-options');
      const navbarHeight = document.querySelector('.sticky').offsetHeight;
  
      if (window.pageYOffset > navbarHeight) {
        sortingOptions.style.position = 'sticky';
        sortingOptions.style.top = `${navbarHeight}px`;
        sortingOptions.style.zIndex = '50';
        sortingOptions.style.backgroundColor = '#f0f0f0';
        sortingOptions.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      } else {
        sortingOptions.style.position = 'relative';
        sortingOptions.style.top = 'auto';
        sortingOptions.style.zIndex = 'auto';
        sortingOptions.style.backgroundColor = 'transparent';
        sortingOptions.style.boxShadow = 'none';
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  return (
    <div
      id="sorting-options"
      className="flex justify-between items-center p-4 bg-gray-100 transition-all duration-300"
      style={{
        transition: 'all 0.3s ease', // Inline transition
      }}
    >
      {/* ... (rest of your JSX - View Options and Sort By) */}
        {/* View Options */}
        <div className="flex gap-4">
          <label
            className={`flex items-center gap-2 cursor-pointer transition-colors duration-300 ${
              viewOption === 'frames'
                ? 'bg-[#31a5a1] text-white rounded-lg'
                : 'border rounded-lg'
            }`}
          >
            <input
              type="radio"
              name="viewOption"
              className="hidden"
              value="frames"
              checked={viewOption === 'frames'}
              onChange={() => handleViewOptionChange('frames')}
            />
            <span className="px-4 py-2">View Frames</span>
          </label>

          <label
            className={`flex items-center gap-2 cursor-pointer transition-colors duration-300 ${
              viewOption === 'tryon'
                ? 'bg-[#119481] text-white rounded-lg'
                : 'border rounded-lg'
            }`}
          >
            <input
              type="radio"
              name="viewOption"
              className="hidden"
              value="tryon"
              checked={viewOption === 'tryon'}
              onChange={() => handleViewOptionChange('tryon')}
            />
            <span className="px-4 py-2">View 3D Try On</span>
          </label>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center">
          <label className="mr-2 font-semibold text-[#119481] flex items-center">
            <span className="mr-1">↓</span>
            <span className="mr-1">↑</span>
            Sort By:
          </label>
          <select
            className="border p-2 rounded-lg focus:outline-none text-[#1b9e8b] transition-colors duration-300"
            value={sortValue}
            onChange={(e) => {
              setSortValue(e.target.value);
              onSortChange(e.target.value);
            }}
            style={{
              color: '#111111', // Inline color for select
              border: '1px solid #ccc', // Example inline border
              padding: '0.5rem', // Example inline padding
              borderRadius: '0.5rem', // Example inline border radius
              outline: 'none', // Inline outline removal
            }}
          >
            <option value="best-sellers">Best Sellers</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="new">New</option>
            <option value="biggest-savings">Biggest Savings</option>
            <option value="most-viewed">Most Viewed</option>
          </select>
        </div>
    </div>
  );
};

export default SortingOptions;