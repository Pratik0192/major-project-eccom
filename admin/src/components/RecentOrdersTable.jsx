// src/components/RecentOrdersTable.jsx
import React, { useState } from "react";

const RecentOrdersTable = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((order) =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusBadgeColor = {
    Delivered: "bg-green-100 text-green-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-x-auto mt-10">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-lg">
        <h2 className="text-white text-xl font-bold">Recent Orders</h2>
        <input
          type="text"
          placeholder="Search by customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1 rounded-md text-sm outline-none border border-white placeholder-white bg-transparent text-white"
        />
      </div>

      {/* Table */}
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th className="py-2 px-4">Order ID</th>
            <th className="py-2 px-4">Customer</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50 border-t cursor-pointer transition"
              onClick={() => setSelectedOrder(order)}
            >
              <td className="py-2 px-4 font-medium text-gray-700">{order.id}</td>
              <td className="py-2 px-4">{order.customer}</td>
              <td className="py-2 px-4">{order.date}</td>
              <td className="py-2 px-4">₹{order.amount}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusBadgeColor[order.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-indigo-700">Order Details</h3>
            <div className="space-y-1 text-sm">
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Customer:</strong> {selectedOrder.customer}</p>
              <p><strong>Date:</strong> {selectedOrder.date}</p>
              <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`font-medium ${statusBadgeColor[selectedOrder.status]}`}>
                  {selectedOrder.status}
                </span>
              </p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrdersTable;
