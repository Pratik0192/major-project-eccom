import React from "react";
import { motion } from "framer-motion";
import eyeglass from "../assets/eyeglass.jpg";
import power from "../assets/powersunglass.jpg";
import progressive from "../assets/progressive.jpg";
import screen from "../assets/screen.jpg";
import sunglass from "../assets/sunglass.jpg";
import { Link } from "react-router-dom";
import stripe from "../assets/stripe_logo.png";
import razorpay from "../assets/razorpay_logo.png";
import wallet from "../assets/wallet.json";
import order from "../assets/ordern.json";
import Lottie from "lottie-react";

const Navigation = () => {
  return (
    <Link to="/products" className="relative"  >
    <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-white text-blue-950">
      {/* Product Categories */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
        <div className="w-28 sm:w-36 text-center dropdown dropdown-hover">
          <img src={sunglass} alt="Sunglass" tabIndex={0} role="button" className="w-full bg-white h-auto rounded-lg border border-white btn m-1" />
          <p className="mt-2 text-sm sm:text-base">Sun Glasses</p>
          <ul tabIndex={0} className="dropdown-content menu z-1 w-52 p-2 ring ring-blue-950 rounded bg-white">
            <li><a>Lens Wipes ₹150 </a></li>
            <li><a>Glass Case ₹500</a></li>
          </ul>
        </div>
        <div className="w-28 sm:w-36 text-center dropdown dropdown-hover">
          <img src={eyeglass} alt="Eyeglass" tabIndex={0} role="button" className="w-full bg-white h-auto rounded-lg border border-white btn m-1" />
          <p className="mt-2 text-sm sm:text-base">Eye Glasses</p>
          <ul tabIndex={0} className="dropdown-content menu z-1 w-52 p-2 ring ring-blue-950 rounded bg-white">
            <li><a>Kids Glasses ₹800</a></li>
            <li><a>Premium Eyeglasses ₹3500</a></li>
          </ul>
        </div>
        <div className="hidden md:block w-28 sm:w-36 text-center dropdown dropdown-hover ">
          <img src={power} alt="Power Glass" tabIndex={0} role="button" className="w-full bg-white h-auto rounded-lg border border-white btn m-1" />
          <p className="mt-2 text-sm sm:text-base">Screen Glasses</p>
          <ul tabIndex={0} className="dropdown-content menu z-1 w-52 p-2 ring ring-blue-950 rounded bg-white">
            <li><a>Polarized Glasses ₹2500</a></li>
            <li><a>Lens Cleaner ₹110 </a></li>
          </ul>
        </div>
      </div>

      {/* Order Animation */}
      <div className="hidden lg:block w-full flex justify-center sm:w-auto">
        <Lottie animationData={order} className="w-32 sm:w-40" />
      </div>

      {/* Payment Methods */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <p className="text-sm sm:text-base">Pay via</p>
        <div className="flex items-center gap-2">
          <img src={stripe} alt="Stripe" className="h-6 sm:h-8" />
          <span className="text-gray-400 hidden sm:inline">|</span>
          <img src={razorpay} alt="Razorpay" className="h-6 sm:h-8" />
        </div>
      </div>

      {/* Wallet Animation */}
      <div className="hidden lg:block w-full flex justify-center sm:w-auto">
        <Lottie animationData={wallet} className="w-32" />
      </div>
    </div>
    </Link>
  );
};

export default Navigation;
