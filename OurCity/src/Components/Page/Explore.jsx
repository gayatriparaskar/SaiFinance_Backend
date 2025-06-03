import React, { useState, useEffect } from 'react';
import PlaceCard from './ExplorePart/PlaceCard';
import { Atom } from 'react-loading-indicators';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Explore = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {loading ? (
        <Atom color="#fa0606" size="medium" text="" textColor="#f40c0c" />
      ) : (
        <motion.div
          className="w-full max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Agar PlaceCard me multiple cards hai, toh andar motion.div me wrap karna hoga */}
          {/* Agar PlaceCard ek single component hai, toh is tarah wrap kar sakte ho: */}
          <motion.div variants={itemVariants}>
            <PlaceCard />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Explore;
