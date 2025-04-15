import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Order = () => {
  const { navigate, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
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
                second: "2-digit",
              }),
            });
          });
        });
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-sm shadow-blue-400 p-6 rounded-md">
        <div className="flex justify-between" >
          <div className="flex gap-3" >
          <h2 className="text-2xl text-black font-semibold mb-4">Purchase Summary </h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5cca21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
          </div>
            <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
            >
            Continue Shopping
          </button>
        </div>
        
        {orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div key={index} className="card bg-white ring ring-2 ring-gray-200 shadow-xl">
              <div className="card-body flex flex-col md:flex-row items-start gap-6">
                <img
                  src={order.image[0]}
                  alt={order.name}
                  className="w-36 h-36 object-cover rounded"
                />
                <div className="collapse collapse-arrow join-item border-base-300 border border-gray-300 flex-1 text-gray-800 space-y-1">
                <input type="radio" name="my-accordion-4" defaultChecked />
                <div className="collapse-title font-semibold text-xl">{order.name}<p className="text-sm" >Total Price: ₹{order.discounted_price}</p><p className="text-sm" >Quantity: {order.quantity}</p><p className="text-sm" >Payment: {order.payment ? "Paid" : "Pending"}</p></div>
                <div className="collapse-content text-sm" >
                  <hr className="text-gray-300" />
                  <p className="mt-2" >Brand: {order.brand}</p>
                  <p>Category: {order.category}</p>
                  <p>Size: {order.size}</p>
                  <p>Price: ₹{order.price}</p>
                  <p>Discounted Price: ₹{order.discounted_price}</p>
                  <p>Payment Method: {order.paymentMethod}</p>
                  <p>Status: <span className="badge badge-success">{order.status}</span></p>
                  <p>Order Date: {order.date}</p>
                  </div>
                </div>
                <div className="self-center flex flex-col items-center ">
                    <button 
                      className="bg-blue-500 text-white font-semibold p-2 rounded-md mt-4 cursor-pointer border border-blue-500 hover:bg-white hover:text-blue-500 w-32 h-12" 
                      onClick={() => document.getElementById('my_modal_2').showModal()}
                    >
                      Track Order
                    </button>
                    {/* track order model */}
                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box bg-white text-gray-800">
                        <ul className="steps steps-vertical">
                          <li className="step step-primary">Ordered</li>
                          <li className="step step-primary">Processing</li>
                          <li className="step">InTransit</li>
                          <li className="step">Delivered</li>
                        </ul>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog> 
                    {/* button cancel order */}                 
                  <button className="bg-red-500 text-white font-semibold p-2 rounded-md mt-4 cursor-pointer border broder-red-500 hover:bg-white hover:text-red-500 w-32 h-12" >Cancel Order</button>
                </div>
              </div>
              <hr className="text-gray-400" />
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