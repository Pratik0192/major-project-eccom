import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Order = () => {
  const { navigate, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async() => {
    try {
      if(!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: {token}})
      if(response.data.success) {
        let allOrderItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrderItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: new Date(order.date).toLocaleString("en-IN", {
                day: "2-digit", 
                month: "long", 
                year: "numeric", 
                hour: "2-digit", 
                minute: "2-digit", 
                second: "2-digit" 
              })
            });
          });
        });
        setOrderData(allOrderItem.reverse());
        console.log(allOrderItem);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  
  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="grid gap-4">
        {orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
              <div className="flex gap-4">
                <img
                  src={order.image[0]}
                  alt={order.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{order.name}</h3>
                  <p className="text-gray-600">Brand: {order.brand}</p>
                  <p className="text-gray-600">Category: {order.category}</p>
                  <p className="text-gray-600">Size: {order.size}</p>
                  <p className="text-gray-600">Quantity: {order.quantity}</p>
                  <p className="text-gray-600">Price: ₹{order.price}</p>
                  <p className="text-gray-600">Discounted Price: ₹{order.discounted_price}</p>
                  <p className="text-gray-600">Payment: {order.payment ? "Paid" : "Pending"}</p>
                  <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
                  <p className="text-gray-600">Order Status: {order.status}</p>
                  <p className="text-gray-600">Order Date: {order.date}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;