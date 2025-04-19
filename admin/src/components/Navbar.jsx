// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full bg-white px-4 py-3 shadow flex justify-between items-center">
      <div className="text-xl font-bold">Lenskart Admin</div>
      <div className="flex items-center gap-4">
        <button title="Notifications">🔔</button>
        <button title="Messages">✉️</button>
        <button title="Cart">🛒</button>
        <img
          src="https://i.pravatar.cc/30" 
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
