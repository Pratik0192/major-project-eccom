import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Right content section */}
      <div className="flex flex-col flex-1 overflow-hidden ml-64"> 
        {/* Navbar at the top (not fixed, part of the flow) */}
        <Navbar />

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
