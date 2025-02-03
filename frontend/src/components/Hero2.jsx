import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from "framer-motion";
import banner1 from '../assets/o1.jpg'
import banner2 from '../assets/o2.jpg'
import banner3 from '../assets/o3.jpg'

const Hero2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const slides = [
    {
      url: banner1,
      title: "First Slide"
    },
    {
      url: banner2,
      title: "Second Slide"
    },
    {
      url: banner3,
      title: "Third Slide"
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide(current => 
          current === slides.length - 1 ? 0 : current + 1
        );
      }
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(slideInterval);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div 
      className="relative w-full h-[400px] sm:h-[300px] lg:h-[400px] xl:h[600px] group mx-auto max-w-screen-2xl px-6 sm:px-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Animated Slide */}
      <motion.div
        key={currentSlide}
        initial={{ scale: 1.1, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut",type: "spring" }}
        className="w-full h-full rounded-lg md:rounded-xl bg-center bg-cover"
        style={{
          backgroundImage: `url(${slides[currentSlide].url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 sm:left-5 cursor-pointer">
        <button 
          onClick={prevSlide}
          className="p-1 sm:p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
      </div>
      
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 sm:right-5 cursor-pointer">
        <button 
          onClick={nextSlide}
          className="p-1 sm:p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
      </div>
      
      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              currentSlide === slideIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero2;