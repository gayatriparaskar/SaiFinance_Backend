import React, { useEffect, useState } from 'react';
import { Atom } from 'react-loading-indicators';
import ImageSlider from './PlaceImg/Slider/ImageSlider';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const DargahHakimi = () => {
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

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <Atom color="#fa0606" size="medium" text="" textColor="#f40c0c" />
        </div>
      )}

      {!loading && (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-12 font-sans">
          {/* Title */}
          <motion.div
            className="text-center"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-gray-800">🕌 Dargah-e-Hakimi</h1>
            <p className="text-lg text-gray-500 mt-2">A Sacred Pilgrimage Site in Burhanpur</p>
          </motion.div>

          {/* Image */}
          <motion.div
            className="rounded-xl overflow-hidden shadow-xl"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ImageSlider />
          </motion.div>

          {/* Description */}
          <motion.section
            className="space-y-5 text-gray-700 leading-relaxed text-lg"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800">📝 Overview</h2>
            <p>
              Dargah-e-Hakimi is one of the holiest sites for the Dawoodi Bohra community, located in Burhanpur, Madhya Pradesh. This revered shrine is dedicated to Syedi Abdul Qadir Hakimuddin, a prominent religious leader.
            </p>
            <p>
              The shrine is known for its serene ambiance, marble architecture, and beautiful gardens that attract pilgrims and tourists from across the globe.
            </p>
          </motion.section>

          {/* Address */}
          <motion.section
            className="bg-gray-50 p-6 rounded-xl shadow-sm"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">📍 Address</h2>
            <p className="text-gray-700 text-base">
              Dargah-e-Hakimi, Lodhi Talab, Burhanpur, Madhya Pradesh 450331, India
            </p>
          </motion.section>

          {/* Map */}
          <motion.section
            className="rounded-xl overflow-hidden shadow-md"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🗺️ Location Map</h2>
            <iframe
              title="Dargah-e-Hakimi Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.3224624133463!2d76.23983887508857!3d21.29698448042279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd8238b27f09d0d%3A0xc7b0e3ebfd08b30e!2sDargah-e-Hakimi!5e0!3m2!1sen!2sin!4v1682683471872!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </motion.section>
        </div>
      )}
    </>
  );
};

export default DargahHakimi;
