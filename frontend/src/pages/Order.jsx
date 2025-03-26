import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../context/ShopContext";
import axios from 'axios';

const Order = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        console.log(allOrdersItem);
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      {orderData.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderData.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md bg-white flex flex-col items-start">
              <div className="flex items-center gap-4">
                <img
                  src={item.images} // Ensure your API provides image URLs
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{currency} {item.price}</p>
                  <p className={`text-sm font-medium ${item.status === "Delivered" ? "text-green-500" : "text-yellow-500"}`}>
                    {item.status}
                  </p>
                  <p className="text-xs text-gray-400">Ordered on: {new Date(item.date).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-600">Payment: {item.paymentMethod} ({item.payment})</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2 w-full">
                <button className="btn btn-error w-full cursor-pointer bg-red-500 text-white">Cancel Order</button>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
