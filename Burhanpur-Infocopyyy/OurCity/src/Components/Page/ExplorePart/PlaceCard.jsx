import React from 'react';
import railway from '../ExplorePart/PlaceImages/railway.jpg';
import Sahikila from '../ExplorePart/PlaceImages/any.jpg';
import dargah from '../ExplorePart/PlaceImages/Dargah.jpg';
import Buttons from '../../Buttons';
import CityMap from './CityMap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variant for cards with stagger effect
const cardVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const PlaceCard = () => {
  const places = [
    {
      id: 1,
      title: 'Burhanpur Railway Station',
      subtitle: 'A Historic Gateway',
      description:
        "Connecting Burhanpur to major cities, the station reflects colonial-era architecture and plays a vital role in the city's cultural and historical significance.",
      image: railway,
      button: (
        <Link to="/railway-station" key="btn1">
          <Buttons />
        </Link>
      ),
    },
    {
      id: 2,
      title: 'Shahi Qila',
      subtitle: 'Royal Fort of Burhanpur',
      description:
        'Built on the banks of the Tapti River, Shahi Qila showcases stunning Mughal architecture and once served as a royal residence.',
      image: Sahikila,
      button: (
        <Link to="/ShahiQila" key="btn2">
          <Buttons />
        </Link>
      ),
    },
    {
      id: 3,
      title: 'Dargah-e-Hakimi',
      subtitle: 'Spiritual Center',
      description:
        'A revered pilgrimage site for the Dawoodi Bohra community, known for its peaceful surroundings and elegant white marble structures.',
      image: dargah,
      button: (
        <Link to="/DargahHakimi" key="btn3">
          <Buttons />
        </Link>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 space-y-14">
      {/* City Map */}
      <motion.div
        className="rounded-2xl overflow-hidden shadow-lg border"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <CityMap />
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {places.map((place, i) => (
          <motion.div
            key={place.id}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.15)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-2xl shadow-md transition duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={place.image}
              alt={place.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{place.title}</h2>
                <h3 className="text-sm text-gray-500 mb-2">{place.subtitle}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{place.description}</p>
              </div>
              <div>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  {place.button}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlaceCard;
