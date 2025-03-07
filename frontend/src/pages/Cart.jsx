import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";


const Cart = () => {

  const { products, cartItems, navigate, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  console.log("Products:", products);
  console.log("Cart Items:", cartItems);


  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const product = products.find((p) => p._id === productId);
            if (product) {
              tempData.push({
                _id: productId,
                name: product.name,
                image: product.image,
                price: product.price,
                originalPrice: product.discounted_price,
                size,
                quantity: cartItems[productId][size],
              });
            }
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);
  

  console.log(cartData);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Main Cart Section */}
      <div className="max-w-6xl mx-auto p-4 lg:flex lg:gap-6">
        {/* Cart Items Section */}
        <div className="lg:w-2/3 bg-white shadow-md p-4 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Cart ({cartData.length} items)</h2>
          {cartData.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border-b">
              <img src={item.image?.[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-500 line-through">₹{item.price}</p>
                <p className="text-xl font-bold">₹{item.originalPrice}</p>
                <p className="text-md font-medium">{item.size}</p>
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
            <span className="font-medium">{getCartAmount()}</span>
          </div>
          <div className="flex justify-between py-2 font-semibold text-lg">
            <span>Total payable</span>
            <span>₹{getCartAmount()}</span>
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
          <button onClick={()=>navigate('/checkout')} className="w-full bg-green-500 text-white font-semibold p-3 rounded-md mt-4 hover:bg-green-600">
            Proceed To Checkout →
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default Cart;
