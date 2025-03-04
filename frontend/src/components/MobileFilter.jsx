import React from "react";
import { FaTimes } from "react-icons/fa";
import SidebarFilters from "./SidebarFilters";

const MobileFilter = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      {/* Sidebar Panel */}
      <div className="w-4/5 bg-white h-full p-4 overflow-y-auto shadow-lg transform translate-x-0 transition-all duration-300">
        {/* Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <button onClick={onClose} className="text-xl">
            <FaTimes />
          </button>
        </div>

        {/* Filters */}
        <SidebarFilters />
      </div>
    </div>
  );
};

export default MobileFilter