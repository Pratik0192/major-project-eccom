import React, { useState } from 'react';
import { motion } from 'framer-motion';
import tryon from '../assets/3d.jpg';

const NavItem = ({ text, subItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li 
      className="relative cursor-pointer hover:text-blue-950"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
      after:bg-blue-950 after:origin-left after:transition-transform after:duration-300 
      after:scale-x-0 hover:after:scale-x-100">
        {text}
      </span>

      {/* Dropdown Menu */}
      {isOpen && subItems && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute left-0 mt-2 w-78 bg-white shadow-md rounded-md border z-50"
        >
          {subItems.map((item, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100 transition">
              {item}
            </li>
          ))}
        </motion.ul>
      )}
    </li>
  );
};

const Navbar1 = () => {
  const navItems = [
    { text: "EYEGLASSES", subItems: ["Air Light-Weight Starting ₹2000", "Premium Eyeglasses Starting ₹3500", "Kids Starting ₹1300 "] },
    { text: "SCREEN GLASSES", subItems: ["Blue Light", "Anti-Glare"] },
    { text: "KIDS GLASSES", subItems: ["Boys", "Girls"] },
    { text: "CONTACT LENSES", subItems: ["Daily", "Monthly", "Colored"] },
    { text: "SUN GLASSES", subItems: ["Polarized", "UV Protection"] }
  ];

  return (
    <header className="top-0 bg-gray-50 border-b border-gray-300 shadow-sm px-4 sm:px-10 py-2 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
        {/* Navigation */}
        <ul className="hidden lg:flex items-center gap-8 text-blue-950 font-semibold">
          {navItems.map((item, index) => (
            <NavItem key={index} text={item.text} subItems={item.subItems} />
          ))}
        </ul>

        {/* Logo */}
        <img src={tryon} className="w-16 sm:w-20 mx-auto lg:mx-0 cursor-pointer" alt="Try on" />
      </div>
    </header>
  );
};

export default Navbar1;
