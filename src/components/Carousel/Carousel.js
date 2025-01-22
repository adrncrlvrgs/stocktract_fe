import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="w-full h-48 object-cover rounded-lg"
        >
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <motion.button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 transform  bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          whileHover={{ scale: 1.1 }}
        >
          &lt;
        </motion.button>
      )}

      {images.length > 1 && (
        <motion.button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform  bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          whileHover={{ scale: 1.1 }}
        >
          &gt;
        </motion.button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
