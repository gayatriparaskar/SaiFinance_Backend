import React, { useEffect, useState } from 'react';
import { Atom } from 'react-loading-indicators';
import ImageSlider from './PlaceImg/Slider/ImageSlider';
import { motion } from 'framer-motion';

const ShahiQila = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="min-h-screen">
      {loading ? (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <Atom color="#fa0606" size="medium" text="" textColor="#f40c0c" />
        </div>
      ) : (
        <motion.div
          className="max-w-6xl mx-auto px-4 py-10 space-y-12 font-sans"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          custom={0}
        >
          {/* Title */}
          <motion.div
            className="text-center"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h1 className="text-4xl font-bold text-gray-800">🏰 Shahi Qila, Burhanpur</h1>
            <p className="text-lg text-gray-500 mt-2">A Royal Marvel of Mughal Architecture</p>
          </motion.div>

          {/* Image Slider */}
          <motion.div
            className="rounded-xl overflow-hidden shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.5}
          >
            <ImageSlider />
          </motion.div>

          {/* Overview */}
          <motion.section
            className="space-y-5 text-gray-700 leading-relaxed text-lg"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <h2 className="text-2xl font-semibold text-gray-800">📝 Overview</h2>
            <p>
              Shahi Qila, located on the banks of the Tapti River in Burhanpur, is a majestic fort built during the Mughal era. Known for its grandeur, intricate carvings, and Mughal architecture, it once served as a residence for Shah Jahan.
            </p>
            <p>
              The fort is also known for its stunning Diwan-e-Aam, Diwan-e-Khas, and the beautiful hammams (baths) believed to be used by Mumtaz Mahal.
            </p>
            <p>
              Rich in history and cultural legacy, Shahi Qila is a must-visit for heritage lovers and architecture enthusiasts.
            </p>
          </motion.section>

          {/* Address */}
          <motion.section
            className="bg-gray-50 p-6 rounded-xl shadow-sm"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1.5}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📍 Address</h2>
            <p className="text-gray-700 text-base">
              Shahi Qila, Near Tapti River, Lalbagh, Burhanpur, Madhya Pradesh 450331, India
            </p>
          </motion.section>

          {/* Historical Significance */}
          <motion.section
            className="space-y-3"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <h2 className="text-2xl font-semibold text-gray-800">📜 Historical Significance</h2>
            <ul className="list-disc pl-5 text-gray-700 text-base">
              <li><strong>Built:</strong> During the reign of Emperor Shah Jahan in the 17th century.</li>
              <li><strong>Significance:</strong> Temporary residence of Mumtaz Mahal and Shah Jahan.</li>
              <li><strong>Features:</strong> Hammams with hidden water channels and secret passages.</li>
            </ul>
          </motion.section>

          {/* Attractions Nearby */}
          <motion.section
            className="space-y-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2.5}
          >
            <h2 className="text-2xl font-semibold text-gray-800">🏞️ Nearby Attractions</h2>
            <ul className="list-disc pl-5 text-gray-700 text-base">
              <li><strong>Dargah-e-Hakimi:</strong> Important pilgrimage site for the Dawoodi Bohra community.</li>
              <li><strong>Jama Masjid:</strong> Historic mosque known for its architecture.</li>
              <li><strong>Burhanpur Railway Station:</strong> Colonial-era station nearby, connecting the city with major metro lines.</li>
            </ul>
          </motion.section>

          {/* Map */}
          <motion.section
            className="rounded-xl overflow-hidden shadow-md"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🗺️ Location Map</h2>
            <iframe
              title="Shahi Qila Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.0705405646897!2d76.22596727470584!3d21.307437880412387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd823ecba17e3f7%3A0x20cfb48624ad5217!2sShahi%20Qila%20Burhanpur!5e0!3m2!1sen!2sin!4v1682683119392!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.section>
        </motion.div>
      )}
    </div>
  );
};

export default ShahiQila;
