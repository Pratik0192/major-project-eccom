import React from "react";
import StatCard from "../components/Statcard";
import RecentOrdersTable from "../components/RecentOrdersTable";
import { ShoppingCart, Users, UserPlus, Star, Folder, MessageSquare, PackageCheck } from "lucide-react";
import AdminLayout from "../components/AdminLayout";


const Dashboard = () => {
  const stats = [
    {
      icon: <ShoppingCart size={32} />,
      label: "Total Orders",
      value: 1200,
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: <Users size={32} />,
      label: "Total Customers",
      value: 875,
      color: "from-red-400 to-red-600",
    },
    {
      icon: <UserPlus size={32} />,
      label: "New Registrations",
      value: 50,
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Star size={32} />,
      label: "Popular Products",
      value: 6,
      color: "from-green-400 to-green-600",
    },
    {
      icon: <Folder size={32}/>,
      label: "Product Categories",
      value: 20,
      color: "from-gray-400 to-gray-600",
    },
    {
      icon: <MessageSquare size={32} />,
      label: "Customer Reviews",
      value: 320,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: <PackageCheck size={32} />,
      label: "New Orders",
      value: 110,
      color: "from-indigo-400 to-indigo-600",
    },
  ];

  const recentOrders = [
    { id: "#ORD123", customer: "Amit Singh", date: "2025-04-16", amount: "₹1299", status: "Delivered" },
    { id: "#ORD124", customer: "Sneha Das", date: "2025-04-16", amount: "₹899", status: "Processing" },
    { id: "#ORD125", customer: "Rahul Mehta", date: "2025-04-15", amount: "₹1599", status: "Shipped" },
    { id: "#ORD126", customer: "Priya Roy", date: "2025-04-15", amount: "₹699", status: "Cancelled" },
  ];

  return (
    <AdminLayout> 
    <div className="flex">
      
      <div className="flex-1 pd-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
           {/* Orders Table */}
           <RecentOrdersTable orders={recentOrders} />
      </div>
    </div>
    </AdminLayout>
  );
};

export default Dashboard;
