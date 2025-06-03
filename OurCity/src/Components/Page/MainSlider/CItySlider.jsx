import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Image imports
import gurudwara from "./mainslideImg/gurudwara.jpg";
import rajakichatri from "./mainslideImg/rajakichatri.jpg";
import shanwara from "./mainslideImg/shanwaraMain.jpg";
import shahiqila from "./mainslideImg/shahiqila.jpg";
import railway from "./mainslideImg/detailrailway1.png";

const slides = [
  {
    image: gurudwara,
    title: "Gurudwara Bari Sangat",
    subtitle: "Ek pavitra sthal Burhanpur ke dil mein",
  },
  {
    image: rajakichatri,
    title: "Raja Ki Chhatri",
    subtitle: "Itihas aur virasat ka ek jeevant pratik",
  },
  {
    image: shanwara,
    title: "Shanwara Chowk",
    subtitle: "Burhanpur ka sabse vyaast bazaar",
  },
  {
    image: shahiqila,
    title: "Shahi Qila",
    subtitle: "Mughal kalin virasat aur shaan",
  },
  {
    image: railway,
    title: "Railway Station",
    subtitle: "Burhanpur ka gateway to India",
  },
];

const CitySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full h-[450px] relative overflow-hidden perspective-[1500px]">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={currentSlide.image}
          alt={`Slide ${currentIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 1 }}
          style={{ backfaceVisibility: "hidden" }}
        />
      </AnimatePresence>
    </div>
  );
};

export default CitySlider;
