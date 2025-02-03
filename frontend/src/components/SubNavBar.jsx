import React from 'react';

const SubNavBar = () => {
  return (
    <div className="bg-gray-100 py-2 px-4 text-sm flex justify-between">
      {/* Breadcrumbs */}
      <p className="text-gray-600">
        <span className="text-blue-500">Eyewear</span> / 
        <span className="text-blue-500"> Eyeglasses</span> /
        <span className="text-blue-500"> Collections</span> /
        <span className="font-semibold"> Screen Glasses</span>
      </p>
      {/* Order Assistance */}
      <p className="text-gray-700">Problem in placing order? Give a missed call <span className="font-bold text-blue-500">9999899998</span></p>
    </div>
  );
};

export default SubNavBar;
