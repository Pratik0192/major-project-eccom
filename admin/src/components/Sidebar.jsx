import { Home, ShoppingCart, Users, Package, Settings } from "lucide-react";
import { Link } from "react-router-dom"; 

const Sidebar = () => {
  const menu = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <ShoppingCart size={20} />, label: "Orders", path: "/allorders" },
    { icon: <Users size={20} />, label: "Customers", path: "/allcustomers" },
    { icon: <Package size={20} />, label: "Products", path: "/manageproducts" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-full w-64 bg-gradient-to-b from-purple-600 to-blue-500 text-white p-5 py-8 shadow-lg">
      <h1 className="text-2xl font-bold mb-12">Lenskart</h1>
      <ul className="space-y-6">
        {menu.map((item, index) => (
          <li key={index} className="mb-5 last:mb-0">
            <Link
              to={item.path}
              className="flex items-center gap-3 hover:text-yellow-300 transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
