import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Summary = () => {
  const { products, cartItems, getCartAmount, navigate } = useContext(ShopContext);
  const [purchasedItems, setPurchasedItems] = useState([]);

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
      setPurchasedItems(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-sm shadow-blue-400 p-6 rounded-md">
        <div className="flex justify-between" >
        <h2 className="text-2xl font-semibold mb-4">Purchase Summary </h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5cca21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
        </div>

        {purchasedItems.length > 0 ? (
          <div>
            {purchasedItems.map((item) => (
              <div key={item._id} className="flex gap-4 p-4 border-b">
                <img src={item.image?.[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-500 line-through">₹{item.price}</p>
                  <p className="text-xl font-bold">₹{item.originalPrice}</p>
                  <p className="text-md font-medium">Size: {item.size}</p>
                  <p className="text-md font-medium">Quantity: {item.quantity}</p>
                </div>
                <button className="bg-blue-500 text-white font-semibold p-2 rounded-md mt-4 cursor-pointer hover:bg-blue-600 w-32 h-12" >Track Order</button>
              </div>
            ))}

            <div className="flex justify-between font-semibold text-lg py-4">
              <span>Total Paid:</span>
              <span>₹{getCartAmount()}</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No items found in the cart.</p>
        )}

        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white font-semibold p-3 rounded-md mt-4 cursor-pointer hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Summary;