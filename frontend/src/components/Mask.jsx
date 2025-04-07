import { useState, useEffect } from "react";
import round from "../assets/round.jpg";
import transparent from "../assets/transparent.jpg";
import cateye from "../assets/cat-eye.jpg";
import clubmaster from "../assets/clubmaster.jpg";
import blend from "../assets/blendedit.jpg";
import airflex from "../assets/airflex.jpg";
import retro from "../assets/retro.jpg";
import sun1 from "../assets/sun1.jpg";
import sun2 from "../assets/sun2.jpg";
import brand1 from "../assets/brand1.jpg";
import brand2 from "../assets/brand2.jpg";
import brand3 from "../assets/brand3.jpg";

const Mask = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [sun1, sun2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-10 bg-white">
      <div className="text-center mb-22">
        <h1 className="text-2xl lg:text-3xl text-blue-950">WEAR THE</h1>
        <h1 className="text-4xl lg:text-5xl font-bold font-serif text-blue-950 ">
          TREND
        </h1>
        <p className="text-sm lg:text-xl italic text-blue-950">
          Our hottest collections
        </p>
        <div
          style={{
            maskImage:
              "linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 10%, hsl(0 0% 0% / 1) 90%, hsl(0 0% 0% / 0))",
            WebkitMaskImage:
              "linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 10%, hsl(0 0% 0% / 1) 90%, hsl(0 0% 0% / 0))",
          }}
          className="lg:max-w-6xl mx-auto mt-10 py-2 flex gap-4 flex-nowrap overflow-hidden"
        >
          <div className="flex gap-4 loop-scroll">
            <div className="shadow-blue-500 text-gray-900 shadow-md p-4 w-80 bg-white cursor-pointer ">
              <img src={round} alt="" /> <p>Round</p>
            </div>
            <div className="shadow-blue-500 text-gray-900 shadow-md p-4 w-80 bg-white cursor-pointer">
              <img src={transparent} alt="" /> <p>Transparent</p>
            </div>
            <div className="shadow-blue-500 text-gray-900 shadow-md p-4 w-80 bg-white cursor-pointer">
              <img src={clubmaster} alt="" /> <p>Clubmaster</p>
            </div>
            <div className="shadow-blue-500 text-gray-900 shadow-md p-4 w-80 bg-white cursor-pointer">
              <img src={cateye} alt="" /> <p>Cat-eye</p>
            </div>
            <div className="shadow-blue-500 text-gray-900 shadow-md p-4 w-80 bg-white cursor-pointer">
              <img src={blend} alt="" /> <p>Blend Edit</p>
            </div>
            <div className="shadow-blue-500 text-gray-900 shadow-md p-4 w-80 bg-white cursor-pointer">
              <img src={airflex} alt="" /> <p>Air Flex</p>
            </div>
            <div className="shadow-blue-500 text-gray-900 shadow-md p-4 w-80 bg-white cursor-pointer">
              <img src={retro} alt="" /> <p>Retro Aviator</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-18">
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-blue-800"></div>
          <span className="mx-2 text-2xl lg:text-3xl font-semibold text-blue-950 ">TRENDING SUNGLASSES</span>
          <div className="flex-1 h-px bg-blue-800"></div>
        </div>
        <div className="w-full h-full rounded-lg md:rounded-xl bg-center bg-cover duration-500 cursor-pointer">
          <img
            src={images[currentImage]}
            alt="Carousel"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>
      </div>
      <div className="text-center ">
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-blue-800"></div>
          <span className="mx-2 text-2xl lg:text-3xl font-semibold text-blue-950 ">OUR BRANDS</span>
          <div className="flex-1 h-px bg-blue-800"></div>
        </div>
        <div className="w-full h-full rounded-lg md:rounded-xl bg-center bg-cover duration-500 cursor-pointer">
          <img src={brand1} alt="" />
          <img src={brand2} alt="" />
          <img src={brand3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Mask;
