import React from 'react';
import { motion } from 'framer-motion';

import Asirgarh from '../Page/LandigPage/img/asirgarh.jpg'
import ShahiQila from '../Page/LandigPage/img/Shahiqila.jpg'
import Dargahaehakimi from '../Page/LandigPage/img/Dargah.jpg'
import Aahukhana from '../Page/LandigPage/img/Aahukhana.jpeg'
import Tapti from '../Page/LandigPage/img/Tapti.jpeg'

const places = [
  {
    name: "Shahi Qila (Royal Palace)",
    image: ShahiQila,
    description:
      "Located on the banks of the Tapti River, Shahi Qila was initially constructed by the Faruqi dynasty and later renovated by Shah Jahan. The palace features intricate carvings and the famous Mughal Hammam with beautiful frescoes. It is said that the design of the Taj Mahal’s bath was inspired by this hammam.",
    delay: 0.2,
  },
  {
    name: "Asirgarh Fort",
    image: Asirgarh,
    description:
      "Asirgarh Fort, standing tall on the Satpura hills, has been a strategic military stronghold since medieval times. Dubbed as the 'Gateway to the South', it played a key role during the Mughal and British rule. The fort complex includes temples, a mosque, and natural springs.",
    delay: 0.4,
  },
  {
    name: "Ahukhana (Deer Park)",
    image: Aahukhana,
    description:
      "Ahukhana, originally a royal garden and deer park, later became the temporary burial place of Mumtaz Mahal before her body was moved to Agra. It is surrounded by lush greenery and offers a peaceful ambiance, showcasing Mughal garden architecture and heritage.",
    delay: 0.6,
  },
  {
    name: "Dargah-E-Hakimi",
    image: Dargahaehakimi,
    description:
      "A revered pilgrimage site for the Dawoodi Bohra community, the Dargah-E-Hakimi complex houses the mausoleums of revered saints and features pristine architecture, beautiful gardens, and facilities for visitors. It is known for its serene and spiritual atmosphere.",
    delay: 0.8,
  },
  {
    name: "Tapti River Front",
    image: Tapti,
    description:
      "The Tapti River adds charm to the city of Burhanpur. Its banks have historically supported settlement, trade, and culture. Visitors can enjoy tranquil river views, picnics, and scenic walks along its green banks.",
    delay: 1.0,
  }
];

const ExploreBurhanpur = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-16">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-700 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Explore Burhanpur
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {places.map((place, index) => (
          <motion.div
            key={place.name}
            className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-blue-500 hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: place.delay }}
            viewport={{ once: true }}
          >
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-blue-600 mb-3">
                {place.name}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {place.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ExploreBurhanpur;