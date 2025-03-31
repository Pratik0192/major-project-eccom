import React, { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import logo from "../assets/lenskart-logo.png";
import { Link } from "react-router-dom";
import { CircleUser, Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { token, setToken, getCartCount, wishlistItems } = useContext(ShopContext);
  const [ wishlistCount, setWishlistCount ] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setWishlistCount(Object.keys(wishlistItems).length);
  }, [wishlistItems]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Nav */}
        <div className="flex md:hidden justify-between items-center px-4 py-4">
          <div className="flex gap-3 items-center">
            <img src={logo} alt="Lenskart Logo" className="w-10" />
            <h1 className="text-blue-950 font-bold text-xl">Lenskart</h1>
          </div>
          <div>
            <button onClick={() => setMobileNavOpen((prev) => !prev)}>
              <Menu className="text-blue-950" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileNavOpen && (
          <ul
            onClick={(e) => {
              e.stopPropagation();
              setMobileNavOpen(false);
            }}
            className="md:hidden p-4 bg-white rounded-lg font-semibold text-lg mt-2 flex flex-row gap-2"
          >
            <li className="relative cursor-pointer text-blue-950">
              <div 
                className="flex items-center text-blue-950"
                onClick={() => setIsOpen(!isOpen)}
              >
                <CircleUser className="w-7 h-7"/>
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-lg z-50">
                  {token ? (
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  ) : (
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <Link to="/login">Log in/Sign up</Link>
                    </li>
                  )}
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="/profile">Profile</a>
                  </li>
                </ul>
              )}
            </li>
            <li className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
              <Heart className="w-7 h-7 text-blue-950" />
            </li>
            <li className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
              <ShoppingBag className="w-7 h-7 text-blue-950" />
            </li>
          </ul>
        )}

        {/* Desktop Nav */}
        <div className="hidden md:flex justify-between items-center px-10 py-4">
          {/* Logo Section */}
          <Link to='/'>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Lenskart Logo" className="w-12" />
              <h1 className="text-blue-950 font-bold text-xl">Lenskart</h1>
            </div>
          </Link>
          

          {/* Search Box */}
          <div className="flex items-center flex-grow mx-8">
            <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border text-blue-950 rounded-full focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-2 mr-4 text-blue-950 hover:text-blue-500"
                >
                  <Search className="w-7 h-7" />
                </button>
              </div>
            </form>
          </div>

          {/* Menu Section */}
          <div className="flex items-center gap-x-6">
            <ul className="hidden lg:flex items-center gap-8 text-blue-950 font-semibold">
              <li ref={dropdownRef} className="relative cursor-pointer">
                <div 
                  className="flex items-center hover:text-blue-500"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <CircleUser className="w-7 h-7"/>
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-lg z-50"
                  >
                    <div className="px-4 py-2 font-bold text-2xl">Welcome</div>

                    {token ? (
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    ) : (
                      <li className="px-4 py-2 hover:bg-gray-100 transition duration-200">
                        <Link to="/login">Log in/Sign up</Link>
                      </li>
                    )}
                    <li className="px-4 py-2 hover:bg-gray-100 transition duration-200">
                      <a href="/profile">Profile</a>
                    </li>
                  </motion.ul>
                )}
              </li>

              <li className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
                <Link to="/wishlist"  className="relative">
                  <Heart className="w-7 h-7"/>
                  <p className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-blue-700 text-white aspect-square rounded-full text-[8px] ">
                    {wishlistCount}
                  </p>
                </Link>
              </li>
              <li className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
                <Link to="/cart" className="relative">
                  <ShoppingBag className="w-7 h-7" />
                  <p className="absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-blue-700 text-white aspect-square rounded-full text-[8px] ">
                    {getCartCount()}
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
