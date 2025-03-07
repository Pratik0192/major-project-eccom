import React from "react";


const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Blue Block Screen Glasses: Transparent Full Rim Square Lenskart Blu LB E13526-C2",
      image: "/path-to-image1.jpg", // Update with correct path
      originalPrice: 1500,
      price: 600,
    },
    {
      id: 2,
      name: "Blue Block Screen Glasses: Blue Full Rim Round Lenskart Blu LB E13528-C4",
      image: "/path-to-image2.jpg", // Update with correct path
      originalPrice: 1500,
      price: 600,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Main Cart Section */}
      <div className="max-w-6xl mx-auto p-4 lg:flex lg:gap-6">
        {/* Cart Items Section */}
        <div className="lg:w-2/3 bg-white shadow-md p-4 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Cart ({cartItems.length} items)</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border-b">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-500 line-through">₹{item.originalPrice}</p>
                <p className="text-xl font-bold">₹{item.price}</p>
              </div>
              <div className="flex flex-col justify-center space-y-2">
                <button className="text-blue-500 hover:underline">Remove</button>
                <button className="text-blue-500 hover:underline">Repeat</button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Summary Section */}
        <div className="lg:w-1/3 bg-white shadow-md p-4 rounded-md mt-6 lg:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Bill Details</h2>
          <div className="flex justify-between py-2">
            <span>Total item price</span>
            <span className="font-medium">₹1200</span>
          </div>
          <div className="flex justify-between py-2 font-semibold text-lg">
            <span>Total payable</span>
            <span>₹1200</span>
          </div>

          {/* Apply Coupon */}
          <button className="w-full border border-gray-300 p-2 rounded-md mt-4 hover:bg-gray-200">
            Apply Coupon
          </button>

          {/* Apply Insurance */}
          <button className="w-full border border-gray-300 p-2 rounded-md mt-2 hover:bg-gray-200">
            Apply Insurance
          </button>

          {/* Checkout Button */}
          <button className="w-full bg-green-500 text-white font-semibold p-3 rounded-md mt-4 hover:bg-green-600">
            Proceed To Checkout →
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default Cart;
