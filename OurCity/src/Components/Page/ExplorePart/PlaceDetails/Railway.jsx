import React, { useEffect, useState } from 'react';
import ImageSlider from './PlaceImg/Slider/ImageSlider';
import { Atom } from 'react-loading-indicators';
import { motion } from 'framer-motion';

const Railway = () => {
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
          <div className="transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
            <Atom color="#fa0606" size="medium" text="" textColor="#f40c0c" />
          </div>
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
            <h1 className="text-4xl font-bold text-gray-800">🚉 Burhanpur Railway Station</h1>
            <p className="text-lg text-gray-500 mt-2">A Historic Gateway to the City</p>
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
              Burhanpur Railway Station (Station Code: BAU) is a significant landmark and the primary rail hub in Burhanpur city, Madhya Pradesh. Its colonial-inspired structure and strategic location have made it a historic and cultural entry point into the city.
            </p>
            <p>
              Operating under the Central Railway zone, it lies on the Bhusaval–Khandwa route and connects Burhanpur with major cities such as Mumbai, Delhi, Pune, and Bhopal.
            </p>
            <p>
              Apart from its architectural elegance, the station provides crucial services to daily commuters, tourists, and traders alike, contributing to the social and economic growth of the city.
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
              Burhanpur Railway Station (BAU), Station Rd, Lalbagh, Burhanpur, Madhya Pradesh 450331, India
            </p>
          </motion.section>

          {/* Historical Highlights */}
          <motion.section
            className="space-y-3"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <h2 className="text-2xl font-semibold text-gray-800">📜 Historical Highlights</h2>
            <ul className="list-disc pl-5 text-gray-700 text-base">
              <li><strong>1866:</strong> Station established under British India’s railway expansion.</li>
              <li><strong>1951:</strong> Integrated into Central Railway zone after Indian independence.</li>
              <li><strong>2000s:</strong> Renovations brought better sanitation and waiting lounges.</li>
              <li><strong>2020:</strong> Platforms modernized with LED boards and announcement systems.</li>
            </ul>
          </motion.section>

          {/* Facilities */}
          <motion.section
            className="space-y-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2.5}
          >
            <h2 className="text-2xl font-semibold text-gray-800">🛎️ Services and Facilities</h2>
            <ul className="list-disc pl-5 text-gray-700 text-base">
              <li>Waiting rooms and clean washrooms</li>
              <li>24/7 ticket booking counters & online reservation</li>
              <li>Food court and refreshment stalls</li>
              <li>Auto-rickshaw & taxi stand outside the station</li>
              <li>Security surveillance and help desk</li>
            </ul>
          </motion.section>

          {/* Nearby Attractions */}
          <motion.section
            className="space-y-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <h2 className="text-2xl font-semibold text-gray-800">📍 Nearby Attractions</h2>
            <ul className="list-disc pl-5 text-gray-700 text-base">
              <li><strong>Shahi Qila:</strong> Mughal-era fort on the banks of the Tapti River (2.5 km away)</li>
              <li><strong>Dargah-e-Hakimi:</strong> Prominent Bohra pilgrimage site (5 km away)</li>
              <li><strong>Jama Masjid:</strong> Historic mosque built by the Mughals (3 km away)</li>
            </ul>
          </motion.section>

          {/* Location Map */}
          <motion.section
            className="rounded-xl overflow-hidden shadow-md"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3.5}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🗺️ Location Map</h2>
            <iframe
              title="Burhanpur Railway Station Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.067842407672!2d76.22640707471014!3d21.30750958041253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd823ecba17e3f7%3A0x3ebc40f17ac43b5f!2sBurhanpur%20Railway%20Station!5e0!3m2!1sen!2sin!4v1682682888469!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.section>

          {/* Useful Links */}
          <motion.section
            className="space-y-3"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
          >
            <h2 className="text-2xl font-semibold text-gray-800">🔗 Useful Links</h2>
            <ul className="list-disc pl-5 text-blue-600 text-base">
              <li><a href="https://www.google.com/maps/place/Burhanpur+Railway+Station/" target="_blank" rel="noopener noreferrer">View on Google Maps</a></li>
              <li><a href="https://www.irctc.co.in/nget/train-search" target="_blank" rel="noopener noreferrer">Book Tickets on IRCTC</a></li>
              <li><a href="https://en.wikipedia.org/wiki/Burhanpur_railway_station" target="_blank" rel="noopener noreferrer">Wikipedia Page</a></li>
            </ul>
          </motion.section>
        </motion.div>
      )}
    </div>
  );
};

export default Railway;
