import { Check, X, Minus, Plus, MessageCircleQuestion } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Cartjson from '../assets/cartt.json';
import Coupon from '../assets/coupon.json';
import Lottie from 'lottie-react';

const Cart = () => {
  const { products, cartItems, navigate, getCartAmount, updateQuantity ,removeFromCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

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

  return (
    <div className="bg-white min-h-screen text-gray-700">
      {/* Main Cart Section */}
      <div className="max-w-6xl mx-auto p-4 lg:flex lg:gap-6">
        {/* Cart Items Section */}
        <div className="lg:w-2/3 bg-white shadow-md p-4 rounded-md">
          <h2 className="text-2xl md:text-3xl text-gray-900 font-bold text-center mb-7">
            <span className="inline-block" >
              <Lottie animationData={Cartjson} className='w-[50px]' />
            </span>
            Shopping Cart ({cartData.length} items)
            <span className="inline-block" >
              <Lottie animationData={Cartjson} className='w-[50px]' />
            </span>
          </h2>
          {cartData.map((item) => (
            <div key={item._id + item.size} className="flex gap-4 p-4 border-b border-t border-gray-200">
              <img src={item.image?.[0]} alt={item.name} className="w-24 h-24 md:w-36 md:h-36 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-lg text-gray-900 font-medium">{item.name}</h3>
                <p className="text-xl font-bold">₹{item.originalPrice}</p>
                <p className="text-md font-medium">Size: {item.size}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-300"
                    onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="mx-4 text-blue-950 text-md sm:text-sm">{item.quantity}</span>
                  <button
                    className="bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-gray-300"
                    onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                  <div className="tooltip" data-tip="Minimum item quantity is 1">
                    <MessageCircleQuestion className="text-black w-5 h-5 cursor-pointer" /> 
                  </div>
                </div>

                

              </div>

              {/* Remove Item */}
              <div>
                <button className="text-red-700 hover:underline cursor-pointer tooltip" data-tip="Remove item"
                  onClick={() => removeFromCart(item._id, item.size)}
                >
                  <X />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Summary Section */}
        <div className="lg:w-1/3 bg-white shadow-md p-4 rounded-md mt-6 lg:mt-0">
          <h2 className="text-2xl font-semibold mb-4">Bill Details</h2>
          <div className="flex justify-between py-2">
            <span>Total item price</span>
            <span className="font-medium">₹{getCartAmount()}</span>
          </div>
          <div className="flex justify-between py-2 font-semibold text-lg">
            <span>Total payable</span>
            <span>₹{getCartAmount()}</span>
          </div>

          {/* Apply Coupon */}
          <button className="w-full border btn border-gray-300 p-2 rounded-md mt-4 text-gray-700" disabled>
            <h1 className="ml-11" >Apply Coupon</h1>            
            <Lottie animationData={Coupon} className='w-[40px]' />
          </button>

          {/* Apply Insurance */}
          <button className="w-full btn border border-gray-300 p-2 rounded-md mt-2 text-gray-700" disabled>
            Apply Insurance
          </button>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-blue-700 text-white font-semibold p-3 rounded-md mt-4 cursor-pointer hover:bg-blue-600"
          >
            Proceed To Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
