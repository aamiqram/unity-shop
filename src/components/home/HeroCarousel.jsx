// components/home/HeroCarousel.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop",
    title: "Premium Audio Gear",
    description:
      "Experience sound like never before with our top-rated headphones.",
    cta: "Shop Now",
    link: "/category/audio",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop",
    title: "Luxury Watches",
    description:
      "Timeless elegance for every occasion. Discover our collection.",
    cta: "Explore",
    link: "/category/watches",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&auto=format&fit=crop",
    title: "Smart Home Devices",
    description: "Upgrade your home with the latest smart technology.",
    cta: "Shop Smart",
    link: "/category/smart-home",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop",
    title: "Sportswear Collection",
    description: "Gear up for your workout with our new arrivals.",
    cta: "Shop Now",
    link: "/category/sportswear",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&auto=format&fit=crop",
    title: "Camera & Photo",
    description: "Capture life's moments in stunning detail.",
    cta: "Shop Cameras",
    link: "/category/cameras",
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const intervalTime = 5000; // 5 seconds

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(goToNext, intervalTime);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, currentIndex]); // Added currentIndex to reset interval after manual navigation

  // Pause auto-play on hover
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
        setIsAutoPlaying(false); // Pause on manual interaction
      } else if (e.key === "ArrowRight") {
        goToNext();
        setIsAutoPlaying(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Slides */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

          {/* Text content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl"
            >
              {slides[currentIndex].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 max-w-2xl"
            >
              {slides[currentIndex].description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                href={slides[currentIndex].link}
                className="inline-block mt-4 px-6 py-2 sm:px-8 sm:py-3 bg-[#FF6600] hover:bg-[#e65c00] text-white font-semibold rounded-md transition-colors"
              >
                {slides[currentIndex].cta}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left arrow */}
      <button
        onClick={() => {
          goToPrevious();
          setIsAutoPlaying(false);
        }}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={24} />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => {
          goToNext();
          setIsAutoPlaying(false);
        }}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
        aria-label="Next slide"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-[#FF6600] w-4 sm:w-6"
                : "bg-white/70 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: slide counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs sm:text-sm px-2 py-1 rounded">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  );
};

export default HeroCarousel;
