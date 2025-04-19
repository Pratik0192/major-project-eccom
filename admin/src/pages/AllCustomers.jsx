import AdminLayout from "../components/AdminLayout";

const AllCustomers = () => {
    return (
      <AdminLayout>
      <div className="p-6">
      
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Customers</h2>
  
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full md:w-1/3 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Email</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Phone</th>
                <th className="px-6 py-3 text-left font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">Riya Sharma</td>
                <td className="px-6 py-4">riya@example.com</td>
                <td className="px-6 py-4">+91 9876543210</td>
                <td className="px-6 py-4 text-green-600 font-medium">Active</td>
              </tr>
              {/* Add more rows later dynamically */}
            </tbody>
          </table>
        </div>
      </div>
      </AdminLayout>
      
    );
  };
  
  export default AllCustomers;
  