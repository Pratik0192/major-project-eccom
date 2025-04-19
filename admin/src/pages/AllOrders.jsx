import AdminLayout from "../components/AdminLayout";

const AllOrders = () => {
  return (
    <AdminLayout>
    <div className="p-6">
    
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Orders</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Order ID</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Customer</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Date</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">ORD12345</td>
              <td className="px-6 py-4">Arjun Verma</td>
              <td className="px-6 py-4">17 Apr 2025</td>
              <td className="px-6 py-4">
                <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-700">Delivered</span>
              </td>
              <td className="px-6 py-4">₹2,499</td>
            </tr>
            {/* More rows dynamically */}
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AllOrders;
